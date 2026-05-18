/**
 * One-time migration: import all .md articles into Convex.
 *
 * Usage:
 *   1. Ensure Convex is set up: `npx convex dev` running once to deploy schema/functions
 *   2. Login via the admin panel at least once to get a session token
 *   3. Set env vars and run this script:
 *        ADMIN_TOKEN=<token-from-localStorage>           \
 *        VITE_CONVEX_URL=https://your-deployment.convex.cloud \
 *        node scripts/migrate-to-convex.mjs
 *
 * Reads:
 *   - content/blog/*.md (Arabic articles)
 *   - content/blog-fr/*.md (French articles)
 *
 * Writes: each article into Convex via api.articles.bulkImport
 *
 * Safe to re-run: bulkImport skips slugs that already exist.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ConvexHttpClient } from "convex/browser";
import matter from "gray-matter";
import { api } from "../convex/_generated/api.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

const CONVEX_URL = process.env.VITE_CONVEX_URL;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

if (!CONVEX_URL) {
  console.error("ERROR: VITE_CONVEX_URL env var is required.");
  console.error("Find it in .env.local after running `npx convex dev`.");
  process.exit(1);
}
if (!ADMIN_TOKEN) {
  console.error("ERROR: ADMIN_TOKEN env var is required.");
  console.error("Log in via the admin panel, then copy the token from localStorage 'admin_token'.");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

async function readArticlesFromDir(dirPath, defaultLang) {
  const files = await readdir(dirPath);
  const articles = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const fullPath = join(dirPath, file);
    const raw = await readFile(fullPath, "utf-8");
    const { data, content } = matter(raw);

    const slug = data.slug || file.replace(/\.md$/, "");
    const lang = data.lang || defaultLang;

    articles.push({
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || "",
      body: content,
      date: data.date || "1970-01-01",
      updated: data.updated || undefined,
      category: data.category || (lang === "ar" ? "عام" : "Général"),
      tags: data.tags || [],
      keywords: data.keywords || "",
      readTime: data.readTime || (lang === "ar" ? "5 دقائق" : "5 min"),
      image: data.image || "",
      imageAlt: data.imageAlt || data.title || slug,
      author: data.author || (lang === "ar" ? "كوتش أحمد" : "Coach Ahmed"),
      authorBio: data.authorBio || "",
      related: data.related || [],
      cta: data.cta || "none",
      lang,
      hreflangAr: data.hreflangAr || undefined,
      hreflangFr: data.hreflangFr || undefined,
    });
  }

  return articles;
}

async function main() {
  console.log("📚 Reading Arabic articles from content/blog/...");
  const arArticles = await readArticlesFromDir(
    join(REPO_ROOT, "content", "blog"),
    "ar"
  );
  console.log(`   Found ${arArticles.length} Arabic articles`);

  console.log("📚 Reading French articles from content/blog-fr/...");
  let frArticles = [];
  try {
    frArticles = await readArticlesFromDir(
      join(REPO_ROOT, "content", "blog-fr"),
      "fr"
    );
    console.log(`   Found ${frArticles.length} French articles`);
  } catch (e) {
    console.log("   (no French articles directory yet)");
  }

  const all = [...arArticles, ...frArticles];
  console.log(`\n🚀 Importing ${all.length} articles into Convex...`);

  // Convex mutations have a 16MB arg size limit. Batch by 10 to be safe.
  const BATCH_SIZE = 10;
  let totalInserted = 0;
  let totalSkipped = 0;

  for (let i = 0; i < all.length; i += BATCH_SIZE) {
    const batch = all.slice(i, i + BATCH_SIZE);
    const result = await client.mutation(api.articles.bulkImport, {
      token: ADMIN_TOKEN,
      articles: batch,
    });
    totalInserted += result.inserted;
    totalSkipped += result.skipped;
    console.log(
      `   Batch ${Math.floor(i / BATCH_SIZE) + 1}: +${result.inserted} new, ${result.skipped} skipped (already existed)`
    );
  }

  console.log(`\n✅ Migration complete.`);
  console.log(`   Inserted: ${totalInserted}`);
  console.log(`   Skipped (already in DB): ${totalSkipped}`);
}

main().catch((err) => {
  console.error("\n❌ Migration failed:");
  console.error(err);
  process.exit(1);
});
