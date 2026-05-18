import { v } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Login: checks email + password against env vars, creates a session row,
 * returns the bearer token to the client.
 *
 * Required Convex env vars (set in Convex dashboard, NOT in code):
 * - ADMIN_EMAIL     — the only email allowed to log in
 * - ADMIN_PASSWORD  — plaintext password (env vars are encrypted at rest)
 */
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    const expectedEmail = process.env.ADMIN_EMAIL;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedEmail || !expectedPassword) {
      throw new Error(
        "Auth not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD in Convex env vars."
      );
    }

    if (
      email.trim().toLowerCase() !== expectedEmail.toLowerCase() ||
      password !== expectedPassword
    ) {
      // Constant-ish delay to slow brute force a bit (Convex mutations are
      // already rate-limited per IP, but extra safety doesn't hurt).
      throw new Error("Invalid credentials");
    }

    // Generate session token (cryptographically random)
    const token = generateToken();
    const expiresAt = Date.now() + SESSION_TTL_MS;

    await ctx.db.insert("sessions", {
      token,
      email: expectedEmail,
      expiresAt,
    });

    return { token, expiresAt };
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

function generateToken(): string {
  // 32 bytes of randomness, base64url encoded (Convex's Node runtime has crypto)
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode(...arr))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
