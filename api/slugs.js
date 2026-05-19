const CONVEX_SITE = "https://cautious-mongoose-558.eu-west-1.convex.site";

export default async function handler(req, res) {
  const r = await fetch(`${CONVEX_SITE}/agent/slugs`);
  const data = await r.json();
  res.status(r.status).json(data);
}
