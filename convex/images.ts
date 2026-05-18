import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Convex File Storage — built-in object storage with CDN-backed public URLs.
 * Workflow:
 *   1. Admin client calls `generateUploadUrl` (auth'd)
 *   2. Admin client POSTs the file directly to that URL (browser uploads)
 *   3. Admin client receives `storageId` back from the upload response
 *   4. Admin client calls `setArticleImage` to attach it to an article and
 *      get back the public URL
 */

async function requireAuth(ctx: any, token: string) {
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q: any) => q.eq("token", token))
    .first();
  if (!session || session.expiresAt < Date.now()) {
    throw new Error("Unauthorized");
  }
}

/**
 * Returns a short-lived signed URL the client can POST a file to.
 */
export const generateUploadUrl = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    await requireAuth(ctx, token);
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Convert a Convex storageId into a public CDN URL.
 * Anyone can call this (used by the public blog pages to display images).
 */
export const getUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId as any);
  },
});

/**
 * Helper for the admin: after upload, attach the resulting storageId
 * to an article and return the public URL.
 */
export const setArticleImage = mutation({
  args: {
    token: v.string(),
    articleId: v.id("articles"),
    storageId: v.string(),
    imageAlt: v.optional(v.string()),
  },
  handler: async (ctx, { token, articleId, storageId, imageAlt }) => {
    await requireAuth(ctx, token);

    // Get the public URL for the stored file
    const url = await ctx.storage.getUrl(storageId as any);
    if (!url) {
      throw new Error("Failed to resolve uploaded image URL");
    }

    await ctx.db.patch(articleId, {
      image: url,
      ...(imageAlt ? { imageAlt } : {}),
      lastEditedAt: Date.now(),
    });

    return { url };
  },
});
