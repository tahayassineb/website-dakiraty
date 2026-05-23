import { jsx, jsxs } from 'react/jsx-runtime';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ChevronLeft, User, Calendar, Clock, Globe, Tag, ArrowLeft } from 'lucide-react';
import { a as SITE_URL, D as DEFAULT_OG_IMAGE, S as Seo } from './Seo-RAKbgilb.js';
import { a as api } from './api-jI3mfyCn.js';
import 'vite-react-ssg';
import 'convex/server';

const ctaConfig = {
  dakiraty: {
    title: "Prêt à bâtir une mémoire d'acier ?",
    subtitle: "Rejoignez le programme Dakiraty et doublez votre capacité de mémorisation en 28 jours avec la méthodologie des champions du monde.",
    buttonText: "Découvrir Dakiraty",
    href: "/dakiraty",
    color: "from-primary-blue to-dark-blue"
  },
  quran: {
    title: "Votre rêve de mémoriser le Coran est plus proche que vous ne pensez",
    subtitle: "Formation de 3 jours avec la technique M5 mondiale. Les recettes du cours soutiennent les orphelins de l'association Ibtassim.",
    buttonText: "Rejoindre le programme Coran",
    href: "/quran",
    color: "from-green-700 to-green-900"
  },
  "kids-memory": {
    title: "Votre enfant mérite une mémoire forte",
    subtitle: "Programme scientifique amusant que votre enfant applique en 15 minutes par jour pour mémoriser ses leçons rapidement.",
    buttonText: "Inscrire mon enfant",
    href: "/kids-memory",
    color: "from-orange-500 to-orange-700"
  }
};
const BlogPostFr = () => {
  const { slug } = useParams();
  const article = useQuery(api.articles.getBySlug, slug ? { slug } : "skip");
  const related = useQuery(
    api.articles.getBySlugs,
    article ? { slugs: article.related.slice(0, 3) } : "skip"
  ) ?? [];
  if (article === void 0) {
    return /* @__PURE__ */ jsx("div", { className: "bg-gray-50 min-h-screen flex items-center justify-center", dir: "ltr", children: /* @__PURE__ */ jsx("div", { className: "text-gray-500 animate-pulse", children: "Loading..." }) });
  }
  if (article === null) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/fr/blog", replace: true });
  }
  const fullUrl = `${SITE_URL}/fr/blog/${article.slug}`;
  const cta = article.cta !== "none" ? ctaConfig[article.cta] : null;
  const arUrl = article.hreflangAr ? `${SITE_URL}/blog/${article.hreflangAr}` : null;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      image: article.image || DEFAULT_OG_IMAGE,
      datePublished: article.date,
      dateModified: article.updated || article.date,
      author: {
        "@type": "Person",
        name: article.author,
        description: article.authorBio,
        url: `${SITE_URL}/about`
      },
      publisher: {
        "@type": "EducationalOrganization",
        name: "Coach Ahmed",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`
        }
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
      inLanguage: "fr-MA",
      articleSection: article.category,
      keywords: article.keywords
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/fr/blog` },
        { "@type": "ListItem", position: 3, name: article.title, item: fullUrl }
      ]
    }
  ];
  return /* @__PURE__ */ jsxs("article", { className: "bg-gray-50 min-h-screen pb-20", dir: "ltr", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: `${article.title} | Coach Ahmed`,
        description: article.excerpt,
        keywords: article.keywords,
        path: `/fr/blog/${article.slug}`,
        ogType: "article",
        ogImage: article.image || DEFAULT_OG_IMAGE,
        jsonLd
      }
    ),
    /* @__PURE__ */ jsx("header", { className: "bg-gradient-to-br from-primary-blue to-dark-blue text-white pt-16 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2 text-sm text-blue-200 mb-8", "aria-label": "Breadcrumb", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: "Accueil" }),
        /* @__PURE__ */ jsx(ChevronLeft, { size: 14 }),
        /* @__PURE__ */ jsx(Link, { to: "/fr/blog", className: "hover:text-white transition-colors", children: "Blog" }),
        /* @__PURE__ */ jsx(ChevronLeft, { size: 14 }),
        /* @__PURE__ */ jsx("span", { className: "text-white/80 truncate max-w-[50vw]", children: article.title })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "inline-block bg-accent-yellow text-dark-blue px-3 py-1 rounded-full text-xs font-bold mb-6", children: article.category }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-extrabold leading-tight mb-6", children: article.title }),
      /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-blue-100 leading-relaxed mb-8 font-light", children: article.excerpt }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-6 text-sm text-blue-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(User, { size: 16 }),
          /* @__PURE__ */ jsx("span", { children: article.author })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar, { size: 16 }),
          /* @__PURE__ */ jsx("time", { dateTime: article.date, children: article.date })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Clock, { size: 16 }),
          /* @__PURE__ */ jsx("span", { children: article.readTime })
        ] }),
        arUrl && /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/blog/${article.hreflangAr}`,
            className: "flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors",
            children: [
              /* @__PURE__ */ jsx(Globe, { size: 14 }),
              /* @__PURE__ */ jsx("span", { children: "العربية" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-12", children: [
        article.image && /* @__PURE__ */ jsx(
          "img",
          {
            src: article.image,
            alt: article.imageAlt,
            className: "w-full rounded-2xl mb-10 shadow-md",
            width: "800",
            height: "450",
            loading: "eager"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "article-body max-w-none text-gray-800 leading-loose text-lg", dir: "ltr", children: /* @__PURE__ */ jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug], children: article.body }) }),
        article.tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-gray-100", children: [
          /* @__PURE__ */ jsx(Tag, { size: 16, className: "text-gray-400" }),
          article.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "bg-blue-50 text-primary-blue text-sm px-3 py-1 rounded-full", children: tag }, tag))
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 pt-8 border-t border-gray-100 bg-gray-50 rounded-2xl p-6 -mx-2 md:-mx-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-primary-blue flex items-center justify-center text-white font-bold text-xl shrink-0", children: "C" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-dark-blue mb-1", children: article.author }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: article.authorBio })
          ] })
        ] }) })
      ] }),
      cta && /* @__PURE__ */ jsxs("section", { className: `bg-gradient-to-br ${cta.color} text-white rounded-3xl p-8 md:p-12 mt-12 shadow-2xl`, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold mb-4", children: cta.title }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-lg mb-6 leading-relaxed", children: cta.subtitle }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: cta.href,
            className: "inline-flex items-center gap-2 bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:scale-105",
            children: [
              /* @__PURE__ */ jsx("span", { children: cta.buttonText }),
              /* @__PURE__ */ jsx(ArrowLeft, { size: 20, className: "rotate-180" })
            ]
          }
        )
      ] }),
      related.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mt-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-dark-blue mb-8 text-center", children: "Articles connexes" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: related.map((r) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/fr/blog/${r.slug}`,
            className: "bg-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group overflow-hidden border border-gray-100",
            children: [
              r.image && /* @__PURE__ */ jsx("img", { src: r.image, alt: r.imageAlt, className: "w-full h-40 object-cover", loading: "lazy", width: "400", height: "200" }),
              /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-accent-yellow uppercase tracking-wider", children: r.category }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-dark-blue mt-2 mb-3 leading-tight group-hover:text-primary-blue transition-colors", children: r.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 line-clamp-2", children: r.excerpt })
              ] })
            ]
          },
          r.slug
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxs(Link, { to: "/fr/blog", className: "inline-flex items-center gap-2 text-primary-blue font-bold hover:underline", children: [
        /* @__PURE__ */ jsx(ChevronLeft, { size: 18 }),
        /* @__PURE__ */ jsx("span", { children: "Retour au blog" })
      ] }) })
    ] })
  ] });
};

export { BlogPostFr as default };
