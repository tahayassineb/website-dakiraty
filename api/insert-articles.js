const CONVEX_SITE = "https://cautious-mongoose-558.eu-west-1.convex.site";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const r = await fetch(`${CONVEX_SITE}/agent/insertArticles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
  const data = await r.json();
  res.status(r.status).json(data);
}
