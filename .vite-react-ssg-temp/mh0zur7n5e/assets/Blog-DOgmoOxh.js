import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { Calendar, Clock, Search, Download } from 'lucide-react';
import { a as SITE_URL, S as Seo } from './Seo-RAKbgilb.js';
import { a as api } from './api-jI3mfyCn.js';
import 'vite-react-ssg';
import 'convex/server';

const Blog = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const articles = useQuery(api.articles.list, { lang: "ar" }) ?? [];
  const categories = useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const a of articles) {
      counts.set(a.category, (counts.get(a.category) || 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [articles]);
  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = !activeCategory || a.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [articles, query, activeCategory]);
  const featured = articles[0];
  const rest = filtered.filter((a) => !featured || a.slug !== featured.slug);
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "مدونة كوتش أحمد - مقالات الذاكرة والحفظ",
    description: "مقالات وأدلة عملية حول تقوية الذاكرة، حفظ القرآن الكريم، التركيز والإنتاجية.",
    inLanguage: "ar",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "EducationalOrganization",
      name: "كوتش أحمد",
      url: SITE_URL
    },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      dateModified: a.updated || a.date,
      image: a.image,
      url: `${SITE_URL}/blog/${a.slug}`,
      author: { "@type": "Person", name: a.author },
      articleSection: a.category,
      keywords: a.keywords
    }))
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 min-h-screen pb-20", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "مدونة كوتش أحمد | مقالات تقوية الذاكرة وحفظ القرآن الكريم",
        description: "مقالات عميقة ومبنية على العلم لتقوية الذاكرة، تقنيات حفظ القرآن، تحسين التركيز، والتغلب على النسيان. مكتوبة من خبرة بطل وطني سابق في الذاكرة.",
        keywords: "مقالات الذاكرة, نصائح حفظ القرآن, التركيز الذهني, علاج النسيان, تقوية الذاكرة, الذاكرة قبل الامتحانات, التغذية والذاكرة",
        path: "/blog",
        jsonLd: blogJsonLd
      }
    ),
    featured && /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-r from-primary-blue to-dark-blue text-white py-16", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 space-y-6 text-center md:text-right", children: [
        /* @__PURE__ */ jsx("span", { className: "bg-accent-yellow text-dark-blue px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider", children: "مقال مميز" }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-bold leading-tight", children: featured.title }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-200 text-lg leading-relaxed", children: featured.excerpt }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: `/blog/${featured.slug}`,
            className: "inline-block bg-transparent border-2 border-white hover:bg-white hover:text-primary-blue text-white font-bold py-3 px-8 rounded-lg transition-colors",
            children: "اقرأ المقال كاملاً"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:w-1/2", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: featured.image,
          alt: featured.imageAlt,
          className: "rounded-2xl shadow-2xl border-4 border-white/10",
          loading: "eager",
          width: "800",
          height: "500",
          fetchPriority: "high"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-[70%]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 border-b border-gray-200 pb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-dark-blue", children: activeCategory ? `مقالات ${activeCategory}` : "أحدث المقالات" }),
          activeCategory && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveCategory(null),
              className: "text-sm text-primary-blue font-bold hover:underline",
              children: "عرض الكل"
            }
          )
        ] }),
        rest.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 py-20", children: "لا توجد مقالات مطابقة لبحثك." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: rest.map((article) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/blog/${article.slug}`,
            className: "bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative h-48 overflow-hidden", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: article.image,
                    alt: article.imageAlt,
                    className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                    loading: "lazy",
                    width: "400",
                    height: "200"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 bg-accent-yellow text-dark-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm", children: article.category })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-dark-blue mb-3 group-hover:text-primary-blue transition-colors leading-snug", children: article.title }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed", children: article.excerpt }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Calendar, { size: 14 }),
                    /* @__PURE__ */ jsx("span", { children: article.date })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Clock, { size: 14 }),
                    /* @__PURE__ */ jsx("span", { children: article.readTime })
                  ] })
                ] })
              ] })
            ]
          },
          article.slug
        )) })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "lg:w-[30%] space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-dark-blue mb-4", children: "بحث" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: query,
                onChange: (e) => setQuery(e.target.value),
                placeholder: "ابحث في المقالات...",
                className: "w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pr-10 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all"
              }
            ),
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-3.5 text-gray-400", size: 18 })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-dark-blue mb-4", children: "التصنيفات" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: categories.map((cat) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setActiveCategory(cat.name === activeCategory ? null : cat.name),
              className: `w-full flex items-center justify-between py-2 px-3 rounded-lg transition-colors group ${activeCategory === cat.name ? "bg-primary-blue text-white" : "hover:bg-blue-50 text-gray-600 hover:text-primary-blue"}`,
              children: [
                /* @__PURE__ */ jsx("span", { children: cat.name }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded-full ${activeCategory === cat.name ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-700"}`,
                    children: cat.count
                  }
                )
              ]
            }
          ) }, cat.name)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-6 rounded-2xl border-2 border-accent-yellow shadow-md text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-primary-blue shadow-sm", children: /* @__PURE__ */ jsx(Download, { size: 32 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-dark-blue mb-2", children: "هدية مجانية" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4", children: "حمّل قائمة المراجعة الذهبية لزيادة تركيزك 10 أضعاف خلال المذاكرة." }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              placeholder: "بريدك الإلكتروني",
              className: "w-full bg-white border border-blue-200 rounded-lg py-2 px-4 mb-3 focus:outline-none text-sm"
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "w-full bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-2 rounded-lg transition-colors shadow-sm text-sm", children: "تحميل مجاني" })
        ] })
      ] })
    ] }) })
  ] });
};

export { Blog as default };
