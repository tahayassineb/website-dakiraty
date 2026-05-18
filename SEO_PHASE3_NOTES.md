# SEO Phase 3 — Content Engine + First 5 Articles

## What changed

Phase 3 turns the empty 4-fake-articles blog into a real content engine, and ships the first 5 high-quality Arabic articles designed for both human readers and AI-search visibility.

### Infrastructure

| File | Purpose |
| --- | --- |
| `package.json` | Added `react-markdown`, `remark-gfm`, `rehype-slug`, `@tailwindcss/typography` |
| `lib/articles.ts` | Glob-loads all `content/blog/*.md` files at build time, parses YAML-ish frontmatter (no `gray-matter` dep), exports typed `Article[]` |
| `pages/BlogPost.tsx` | Single-article view — hero, body via ReactMarkdown, tags, author bio, CTA back to the matching program, related articles, breadcrumb, BlogPosting + BreadcrumbList JSON-LD |
| `pages/Blog.tsx` | Replaced 4 hardcoded fake articles with real list + working search + category filter |
| `routes.tsx` | Added `/blog/:slug` route with `getStaticPaths` so vite-react-ssg prerenders each article to its own HTML |
| `index.css` | Article-body typography rules (RTL-safe, Cairo-friendly) |
| `public/sitemap.xml` | Added all 5 article URLs |

### Articles shipped

| Slug | Category | Linked program | Words |
| --- | --- | --- | --- |
| `kayfa-tuqawwi-dhakirataka-fi-30-yawm` | الذاكرة والتركيز | dakiraty | ~1900 |
| `tiqniyat-m5-abtal-aldhakira` | الذاكرة والتركيز | dakiraty | ~1500 |
| `kayfa-tahfaz-alquran-bisuraa-wa-thubut` | حفظ القرآن | quran | ~1900 |
| `khams-akhta-tunsi-alquran` | حفظ القرآن | quran | ~1400 |
| `kayfa-tusaeid-tiflaka-ala-hifz-durusihi` | تطوير الذات | kids-memory | ~1700 |
| `afdal-12-taama-litaqwiyat-aldhakira` | الصحة والغذاء | dakiraty | ~1700 |

Total: ~10,100 words of original Arabic content.

Each article includes:
- Personal voice (Coach Ahmed perspective, specific anecdotes)
- Specific citations of real studies (Bjork, Maguire, Roediger & Karpicke, etc.)
- Internal links between articles (cluster signal)
- An FAQ section near the end (eligible for Google FAQ rich results via the structured FAQPage JSON-LD baked into BlogPost.tsx)
- A CTA to the matching program (`cta: dakiraty | quran | kids-memory`)

---

## How to add a new article

1. Create `content/blog/<slug>.md`
2. Use this frontmatter template (note: flat keys, arrays in `[a, b, c]` syntax):

```yaml
---
slug: my-new-article
title: "العنوان الكامل بصياغة جذابة للقارئ ومُحسَّنة لكلمات البحث"
excerpt: "ملخّص 2-3 جمل يظهر في قائمة المدونة وفي محركات البحث ووسائل التواصل."
date: "2026-05-17"
category: "الذاكرة والتركيز"
tags: ["وسم1", "وسم2", "وسم3"]
keywords: "كلمات البحث المستهدفة, مفصولة, بفواصل"
readTime: "8 دقائق"
image: "https://example.com/image.jpg"
imageAlt: "وصف الصورة"
author: "كوتش أحمد"
authorBio: "السيرة المختصرة (تظهر في صفحة المقال)."
related: ["slug-article-1", "slug-article-2"]
cta: dakiraty
---

# نص المقال يبدأ هنا

اكتب باللغة العربية، استعمل عناوين ##, ###, قوائم, جداول | تماماً مثل أي ملف Markdown.
```

3. Fill the markdown body using normal Markdown syntax. GFM tables, blockquotes, and code blocks all work.
4. Add an entry in `public/sitemap.xml` with the article URL + `<lastmod>`.
5. Run `npm run build` to verify prerender.

That's it — no other file needs editing. The article will:
- Appear in the blog index (newest-first)
- Be prerendered to `dist/blog/<slug>/index.html`
- Get its own BlogPosting JSON-LD
- Show up in the sidebar category counts
- Link to its related articles
- Show the CTA you specified

---

## What an article should look like (style guide)

### 1. Voice
Write as Coach Ahmed talking to a specific person, not as a generic SEO blog. Use "أنت", "دعني أخبرك", "في تجربتي مع آلاف المتدربين". Open with a personal observation, a story, or a sharp question — never with a definition.

### 2. Specificity beats generality
- ❌ "النوم مهم للذاكرة"
- ✅ "إذا نمت أقل من 6 ساعات، تخسر مرحلة Slow-Wave Sleep التي ينقل فيها الدماغ ما تعلمته خلال النهار من الذاكرة قصيرة إلى طويلة المدى. (دراسة Wilhelm et al, 2011)"

### 3. Always cite when claiming a number
LLMs hallucinate stats. When you write "23% improvement", it must be from a real source. If you don't have one, say "in my experience" or "in our workshops". Specific honesty > fake authority.

### 4. Structure for AI citation
AI search engines (ChatGPT, Perplexity, Google AI Overviews) prefer to cite content that:
- Has clear `## H2` headings on the questions/topics
- Provides direct, structured answers immediately after the heading
- Uses lists, tables, and short paragraphs
- Includes an FAQ section near the end with the actual questions users type

Each of the 5 articles follows this pattern. Maintain it.

### 5. Internal linking
Every article should link to:
- 1-2 related articles
- The program it points to (dakiraty / quran / kids-memory)

This builds topical authority — Google rewards a tight cluster around each topic.

### 6. Length
- Short article: 1200-1500 words (specific technique)
- Standard: 1500-2000 words (comprehensive how-to)
- Pillar: 2500-3500 words (definitive guide for a high-search topic)

Never write under 1000 words for a serious article. Google + AI engines prefer depth.

---

## Content roadmap (suggested next 25 articles)

Once Phase 3 is merged, here's the topical cluster expansion I'd recommend:

### Memory cluster (extend "Dakiraty")
1. ما هو منحنى النسيان وكيف تتغلب عليه — pillar
2. تقنية بومودورو وعلاقتها بالذاكرة
3. الذاكرة قبل الامتحان: خطة 7 أيام
4. كيف تحفظ الأسماء والوجوه (مهم للمهنيين)
5. النوم والذاكرة: العلاقة الكاملة
6. الذاكرة وفقدان التركيز بعد الـ 40
7. تمارين ذهنية يومية لمدة 10 دقائق
8. الذاكرة العضلية: ما هي وكيف تُدرَّب
9. ما هي تقنية الكلمة المفتاحية (Keyword) — مهمة لتعلم اللغات

### Quran cluster
10. أفضل أوقات حفظ القرآن وفق علم الأعصاب
11. كيف تحفظ سورة البقرة في 90 يوم
12. الحفظ من المصحف الورقي مقابل التطبيق
13. خطة مراجعة القرآن للحافظ المنشغل
14. كيف تحفظ القرآن وأنت موظف بدوام كامل
15. الحفظ مع الفهم: لماذا التفسير ضروري
16. الفرق بين الحفظ المتقن والحفظ السطحي
17. كيف تتجاوز "حاجز الجزء الخامس"

### Kids cluster
18. علامات صعوبات التعلم عند الأطفال (متى تقلق؟)
19. ألعاب علمية لتقوية تركيز طفلك (من 5 إلى 10 سنوات)
20. كيف تقرأ مع طفلك بطريقة تطوّر ذاكرته
21. ADHD والحفظ: استراتيجيات للأطفال مفرطي الحركة
22. ذاكرة الأطفال والشاشات: ما يقوله البحث

### Lifestyle / health cluster (broad SEO)
23. الرياضة والذاكرة: أي رياضة تقوّي الدماغ
24. القهوة والذاكرة: متى تنفع ومتى تضر
25. الجفاف والتركيز: العلاقة الخفيّة

---

## Quality > quantity (a reminder)

Tempting as it is to bulk-generate articles with AI, **don't**. Google's HCU updates of 2024-25 specifically targeted scaled AI content. Sites that pumped out 10K thin articles lost 80-95% of traffic. Sites with 50-200 deep, expert articles thrived.

Aim for: **5-10 deep articles per month**, hand-edited even when AI-drafted, each adding a real perspective from your experience.

The 5 articles in this PR are templates. Match their depth, voice, and specificity in future articles, and the cluster will rank.
