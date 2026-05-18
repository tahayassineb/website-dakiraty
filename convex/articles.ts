import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const ctaValidator = v.union(
  v.literal("dakiraty"),
  v.literal("quran"),
  v.literal("kids-memory"),
  v.literal("none")
);

const langValidator = v.union(v.literal("ar"), v.literal("fr"));

const articleFields = {
  slug: v.string(),
  title: v.string(),
  excerpt: v.string(),
  body: v.string(),
  date: v.string(),
  updated: v.optional(v.string()),
  category: v.string(),
  tags: v.array(v.string()),
  keywords: v.string(),
  readTime: v.string(),
  image: v.string(),
  imageAlt: v.string(),
  author: v.string(),
  authorBio: v.string(),
  related: v.array(v.string()),
  cta: ctaValidator,
  lang: langValidator,
  hreflangAr: v.optional(v.string()),
  hreflangFr: v.optional(v.string()),
};

// ============================================================
// Public queries — used by blog pages (no auth required)
// ============================================================

export const list = query({
  args: { lang: langValidator },
  handler: async (ctx, { lang }) => {
    const all = await ctx.db
      .query("articles")
      .withIndex("by_lang_date", (q) => q.eq("lang", lang))
      .order("desc")
      .collect();
    return all;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("articles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const listSlugs = query({
  args: { lang: v.optional(langValidator) },
  handler: async (ctx, { lang }) => {
    let q = ctx.db.query("articles");
    if (lang) q = q.withIndex("by_lang_date", (idx) => idx.eq("lang", lang));
    const docs = await q.collect();
    return docs.map((d) => ({ slug: d.slug, lang: d.lang }));
  },
});

/**
 * Fetch multiple articles by slug in one round-trip.
 * Used by BlogPost pages to load related articles.
 */
export const getBySlugs = query({
  args: { slugs: v.array(v.string()) },
  handler: async (ctx, { slugs }) => {
    if (slugs.length === 0) return [];
    const results = await Promise.all(
      slugs.map((s) =>
        ctx.db
          .query("articles")
          .withIndex("by_slug", (q) => q.eq("slug", s))
          .first()
      )
    );
    return results.filter((a) => a !== null);
  },
});

// ============================================================
// Admin queries/mutations — require valid session token
// ============================================================

async function requireAuth(ctx: any, token: string) {
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q: any) => q.eq("token", token))
    .first();
  if (!session || session.expiresAt < Date.now()) {
    throw new Error("Unauthorized");
  }
  return session;
}

export const listAdmin = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    await requireAuth(ctx, token);
    const all = await ctx.db.query("articles").collect();
    return all.sort((a, b) => b.date.localeCompare(a.date));
  },
});

export const getById = query({
  args: { token: v.string(), id: v.id("articles") },
  handler: async (ctx, { token, id }) => {
    await requireAuth(ctx, token);
    return await ctx.db.get(id);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("articles"),
    patch: v.object({
      title: v.optional(v.string()),
      excerpt: v.optional(v.string()),
      body: v.optional(v.string()),
      date: v.optional(v.string()),
      category: v.optional(v.string()),
      tags: v.optional(v.array(v.string())),
      keywords: v.optional(v.string()),
      readTime: v.optional(v.string()),
      image: v.optional(v.string()),
      imageAlt: v.optional(v.string()),
      author: v.optional(v.string()),
      authorBio: v.optional(v.string()),
      related: v.optional(v.array(v.string())),
      cta: v.optional(ctaValidator),
      hreflangAr: v.optional(v.string()),
      hreflangFr: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { token, id, patch }) => {
    await requireAuth(ctx, token);
    await ctx.db.patch(id, {
      ...patch,
      updated: new Date().toISOString().slice(0, 10),
      lastEditedAt: Date.now(),
    });
    return { ok: true };
  },
});

export const create = mutation({
  args: {
    token: v.string(),
    article: v.object(articleFields),
  },
  handler: async (ctx, { token, article }) => {
    await requireAuth(ctx, token);
    // Reject duplicate slugs
    const existing = await ctx.db
      .query("articles")
      .withIndex("by_slug", (q) => q.eq("slug", article.slug))
      .first();
    if (existing) {
      throw new Error(`Article with slug "${article.slug}" already exists`);
    }
    const id = await ctx.db.insert("articles", {
      ...article,
      isPublished: true,
      lastEditedAt: Date.now(),
    });
    return id;
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("articles") },
  handler: async (ctx, { token, id }) => {
    await requireAuth(ctx, token);
    await ctx.db.delete(id);
    return { ok: true };
  },
});

// ============================================================
// Bulk import — used once during migration from .md files
// ============================================================

export const bulkImport = mutation({
  args: {
    token: v.string(),
    articles: v.array(v.object(articleFields)),
  },
  handler: async (ctx, { token, articles }) => {
    await requireAuth(ctx, token);
    let inserted = 0;
    let skipped = 0;
    for (const a of articles) {
      const existing = await ctx.db
        .query("articles")
        .withIndex("by_slug", (q) => q.eq("slug", a.slug))
        .first();
      if (existing) {
        skipped++;
        continue;
      }
      await ctx.db.insert("articles", {
        ...a,
        isPublished: true,
        lastEditedAt: Date.now(),
      });
      inserted++;
    }
    return { inserted, skipped };
  },
});
