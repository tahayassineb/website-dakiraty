import { v } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const PBKDF2_ITERATIONS = 120_000;
const HASH_LENGTH = 32;
const HASH_ALGORITHM = "SHA-256";
const HASH_PREFIX = "pbkdf2";

function bytesToBase64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

function base64ToBytes(value: string) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

async function derivePasswordBits(password: string, salt: Uint8Array) {
  const saltBuffer = salt.buffer.slice(
    salt.byteOffset,
    salt.byteOffset + salt.byteLength
  ) as ArrayBuffer;

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: HASH_ALGORITHM,
    },
    keyMaterial,
    HASH_LENGTH * 8
  );

  return new Uint8Array(derivedBits);
}

async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePasswordBits(password, salt);
  return `${HASH_PREFIX}$${PBKDF2_ITERATIONS}$${bytesToBase64(salt)}$${bytesToBase64(hash)}`;
}

async function verifyPassword(password: string, passwordHash?: string) {
  if (!passwordHash) return false;

  const [prefix, iterationsRaw, saltRaw, expectedRaw] = passwordHash.split("$");
  if (prefix !== HASH_PREFIX || !iterationsRaw || !saltRaw || !expectedRaw) {
    return false;
  }

  const iterations = Number(iterationsRaw);
  if (!Number.isFinite(iterations) || iterations <= 0) return false;

  const salt = base64ToBytes(saltRaw);
  const expected = base64ToBytes(expectedRaw);

  const actual = await derivePasswordBits(password, salt);
  if (actual.byteLength !== expected.byteLength) return false;

  let mismatch = 0;
  for (let i = 0; i < actual.byteLength; i++) {
    mismatch |= actual[i] ^ expected[i];
  }
  return mismatch === 0;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function generateToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode(...arr))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Login: verifies email + password against the users table.
 * Bootstrap: if no users exist at all, the first login creates the admin
 * user with the provided credentials. No env vars needed.
 */
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    const normalizedEmail = normalizeEmail(email);

    // Check if any user exists
    const anyUser = await ctx.db.query("users").first();

    if (!anyUser) {
      // Bootstrap: first login ever creates the admin
      const passwordHash = await hashPassword(password);
      const userId = await ctx.db.insert("users", {
        email: normalizedEmail,
        passwordHash,
        role: "admin",
        createdAt: Date.now(),
      });

      const token = generateToken();
      const expiresAt = Date.now() + SESSION_TTL_MS;
      await ctx.db.insert("sessions", {
        token,
        email: normalizedEmail,
        expiresAt,
      });

      return { token, expiresAt, bootstrap: true as const };
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken();
    const expiresAt = Date.now() + SESSION_TTL_MS;

    await ctx.db.insert("sessions", {
      token,
      email: normalizedEmail,
      expiresAt,
    });

    return { token, expiresAt, bootstrap: false as const };
  },
});

/**
 * Change password for the authenticated user.
 */
export const changePassword = mutation({
  args: {
    token: v.string(),
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, { token, currentPassword, newPassword }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (!session || session.expiresAt < Date.now()) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", session.email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const valid = await verifyPassword(currentPassword, user.passwordHash);
    if (!valid) {
      throw new Error("Current password is incorrect");
    }

    const newHash = await hashPassword(newPassword);
    await ctx.db.patch(user._id, { passwordHash: newHash });
    return { ok: true };
  },
});

/**
 * Logout: deletes the session row server-side. Client should also clear localStorage.
 */
export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();
    if (session) {
      await ctx.db.delete(session._id);
    }
    return { ok: true };
  },
});

/**
 * Verify a session token. Used by every protected query/mutation.
 * Returns the session row if valid, throws otherwise.
 */
export const verify = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (!session) return { valid: false as const };
    if (session.expiresAt < Date.now()) return { valid: false as const };

    return { valid: true as const, email: session.email };
  },
});

/**
 * Internal helper used by mutations/actions to throw if the caller isn't authed.
 * Pattern: `await requireAuth(ctx, args.token)`
 */
export const requireAuth = internalQuery({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (!session || session.expiresAt < Date.now()) {
      throw new Error("Unauthorized");
    }
    return { email: session.email };
  },
});
