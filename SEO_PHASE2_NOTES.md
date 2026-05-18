# SEO Phase 2 — Static Site Generation (SSG)

## What changed and why

**Problem Phase 1 left unsolved:** AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do NOT execute JavaScript. After Phase 1, when GPTBot fetched `/dakiraty`, it saw `<div id="root"></div>` and nothing else — no content, no meta tags, no JSON-LD. AI search engines couldn't cite us.

**Phase 2 fix:** introduce `vite-react-ssg` to prerender every route to static HTML at build time. Now when any crawler fetches `/dakiraty`, the response already contains the full content, all meta tags, and the Course/FAQ JSON-LD — without any JS needing to run.

---

## Files changed

### `package.json`
- Added `vite-react-ssg` (the SSG framework).
- Added `react-helmet-async` (used under the hood by `<Head>`).
- Bumped `react-router-dom` to `^6.28.0` (vite-react-ssg needs the data-router API).
- `build` script: `vite build` → `vite-react-ssg build`.
- Kept `build:spa` as an escape hatch (`vite build`) in case you ever need the plain SPA build.

### `routes.tsx` (new)
- Routes are now a plain array, not JSX — required by vite-react-ssg.
- Each route uses `lazy: () => import(...)` for code splitting + `entry:` for FOUC-prevention.
- The `/quran` route wraps `ProgramDetails` with `type="quran"` since it takes a prop.

### `index.tsx`
- Rewrote from `ReactDOM.createRoot(...).render(<App />)` to `export const createRoot = ViteReactSSG({ routes })`.
- vite-react-ssg invokes `createRoot` on both server (build time) and client (runtime).

### `App.tsx` — DELETED
- Routing moved to `routes.tsx`. ScrollToTop moved into Layout.

### `components/Layout.tsx`
- Now uses `<Outlet />` instead of a `children` prop (standard React Router data-router layout pattern).
- Absorbed the `ScrollToTop` hook (resets scroll on each route change).

### `components/Seo.tsx` — major refactor
- Replaced `useEffect` + DOM manipulation with declarative `<Head>` from vite-react-ssg.
- **This is the key change:** `<Head>` renders during SSG (Node renderToString), so the prerendered HTML for each route includes the correct title, meta, OG, Twitter, canonical, and JSON-LD. No JS needed on the crawler side.
- After hydration, react-helmet-async (under the hood) syncs the head on client-side navigation.

### `pages/Blog.tsx`
- Fixed a hydration mismatch: category counts were `Math.floor(Math.random() * 20) + 1` in render, which produces different numbers on server vs client. Replaced with stable hardcoded counts.

### `vercel.json`
- Removed the SPA catch-all rewrite (`/(.*) → /index.html`) — it would have overridden our prerendered routes.
- Added `"cleanUrls": true` and `"trailingSlash": false` so Vercel serves `/dakiraty/index.html` at the URL `/dakiraty`.

### `public/_redirects`
- Kept the catch-all (`/* → /index.html 200`) as a safety net for unknown routes only — Netlify checks for static files first, so prerendered routes still serve correctly.

---

## Build output structure (after `npm run build`)

```
dist/
├── index.html          ← prerendered home (full content + meta)
├── dakiraty/
│   └── index.html      ← prerendered Dakiraty page (Course JSON-LD inline)
├── quran/
│   └── index.html      ← prerendered Quran page (Course JSON-LD inline)
├── kids-memory/
│   └── index.html      ← prerendered Kids page
├── blog/
│   └── index.html      ← prerendered Blog page (BlogPosting JSON-LD)
├── robots.txt
├── sitemap.xml
└── assets/
    └── (hashed JS/CSS bundles)
```

Each `index.html` is fully self-contained for crawlers. JS still runs on user load for interactivity (Meta Pixel, forms, modals, scroll animations).

---

## What you need to do

### 1. Install + build locally
```powershell
cd "D:\saas\coach ahmed\dakiraty-repo"   # or pull this branch into your working dir
npm install
npm run build
npm run preview
```

The first `vite-react-ssg build` may take longer than before (it builds, then prerenders each route in Node). Expect ~30–90 seconds total.

### 2. Verify the prerendering worked
After the build, open `dist/dakiraty/index.html` in a text editor. You should see:
- The hero text "اكتشف كيف تضاعف قدرتك على الحفظ..." directly in the HTML
- A `<title>` tag with "برنامج ذاكرتي | دورة تقوية الذاكرة في 28 يوم..."
- The Course JSON-LD with price 600 MAD
- The FAQPage JSON-LD with the 3 questions

If you see only `<div id="root"></div>` with no content, SSG didn't run — check the build log.

### 3. Test the AI-crawler view
Once deployed:
```powershell
curl https://website-dakiraty.vercel.app/dakiraty
```
You should see the full HTML content. This is exactly what GPTBot / ClaudeBot / PerplexityBot will see.

### 4. Deploy
- Push merged to `main` → Vercel auto-deploys.
- Verify the live site renders correctly on each route.
- Verify direct URLs work: visit `/dakiraty` and refresh — should not 404.

### 5. Re-request indexing
After deploy, in Google Search Console:
- URL Inspection → enter each route → "Request Indexing"
- Google will recrawl and see the full prerendered content.

---

## Things that might go wrong

### Build fails with "window is not defined" or similar
SSR-unsafe code somewhere. Check:
- Any top-level `window.X` or `document.X` (must be inside `useEffect` or `typeof window !== 'undefined'` guard).
- Any `localStorage` access outside `useEffect`.

The pages we have should all be safe (everything DOM-touching is in `useEffect`), but if a future change adds something at module/render scope, the build will catch it.

### Hydration mismatch warnings in browser console
Render output differs between server and client. Common causes:
- `Math.random()` / `Date.now()` in render (we fixed Blog.tsx; watch for new instances).
- Time-dependent text like "اليوم" vs absolute dates.
- `useState(window.innerWidth > 768)` — would be different on server (no window) vs client.

### FOUC (flash of unstyled content)
The `entry:` field on each route tells vite-react-ssg which CSS to inline. If you see FOUC, double-check those entries match the page file paths.

---

## What's still missing (Phase 3)

Phase 2 fixed the **technical** AI/SEO blockers. Phase 3 = **content**. Topics to come:
- Real markdown-driven blog (replace the 4 fake hardcoded articles).
- 30–50 deep articles in the topical cluster (memory techniques, Quran memorization, study methods, children's memory).
- Each article hand-written, in Arabic, optimized for both Google and AI search engines.
- Author bio page with credentials (boosts E-E-A-T).

Phase 3 is starting now.
