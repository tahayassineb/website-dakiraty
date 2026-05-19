import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  /**
   * Blog articles. Source of truth for /blog and /fr/blog content.
   * The build script reads from this table and regenerates content/blog/*.md
   * so vite-react-ssg can prerender each page for SEO.
   */
  articles: defineTable({
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
    cta: v.union(
      v.literal("dakiraty"),
      v.literal("quran"),
      v.literal("kids-memory"),
      v.literal("none")
    ),
    lang: v.union(v.literal("ar"), v.literal("fr")),
    hreflangAr: v.optional(v.string()),
    hreflangFr: v.optional(v.string()),
    /** Tracks if changes have been published (built to website) or are still draft */
    isPublished: v.boolean(),
    /** Timestamp of last edit through admin panel */
    lastEditedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_lang_date", ["lang", "date"]),

  /**
   * Admin users. Passwords are hashed with PBKDF2 (120k iterations, SHA-256).
   * First user is created automatically on first login (bootstrap).
   */
  users: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    role: v.union(v.literal("admin")),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  /**
   * Admin auth sessions. Created on login, validated on every protected request.
   * Simple bearer-token model — token stored client-side in localStorage.
   */
  sessions: defineTable({
    token: v.string(),
    email: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),

  /**
   * Tracks publish state: when "Publish" is clicked, this row's `pendingChanges`
   * resets to 0 and the Vercel deploy hook is called. UI can show how many
   * unpublished edits exist.
   */
  publishState: defineTable({
    pendingChanges: v.number(),
    lastPublishAt: v.optional(v.number()),
    lastPublishStatus: v.optional(v.string()),
  }),
});
