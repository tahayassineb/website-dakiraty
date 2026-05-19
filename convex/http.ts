/**
 * Custom HTTP endpoints for the daily content-writer agent.
 *
 * These are served from `*.convex.site` (Convex's HTTP-action gateway) rather
 * than `*.convex.cloud/api/...` (the standard API gateway). The CCR sandbox
 * that runs the scheduled agent gets blocked by Cloudflare bot detection on
 * the `.convex.cloud/api/...` path; the `.convex.site` path uses a different
 * infrastructure that does not block it.
 *
 * Auth: `AGENT_SECRET` env var, sent in the POST body. Same secret used by
 * the `articles.agentBulkCreate` mutation — single source of truth.
 *
 * Endpoints:
 *   GET  /agent/slugs           → list of all article {slug, lang}
 *   POST /agent/insertArticles  → bulk insert articles (gated by secret)
 */

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

http.route({
  path: "/agent/slugs",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const slugs = await ctx.runQuery(api.articles.listSlugs, {});
    return new Response(JSON.stringify({ slugs }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }),
});

http.route({
  path: "/agent/insertArticles",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
      );
    }

    if (!body || typeof body !== "object" || !body.secret || !Array.isArray(body.articles)) {
      return new Response(
        JSON.stringify({ error: "Body must be { secret, articles: [...] }" }),
        { status: 400, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
      );
    }

    try {
      const result = await ctx.runMutation(api.articles.agentBulkCreate, {
        secret: body.secret,
        articles: body.articles,
      });
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    } catch (e: any) {
      const message = e?.message || String(e);
      const status = message.toLowerCase().includes("unauthorized") ? 401 : 400;
      return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }
  }),
});

// CORS preflight
http.route({
  path: "/agent/insertArticles",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }),
});

export default http;
