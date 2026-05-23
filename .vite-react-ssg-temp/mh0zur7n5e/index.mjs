import { ViteReactSSG } from 'vite-react-ssg';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const prefetchRoute$1 = (path) => {
  if (path === "/") import('./assets/Home-8NExGGvL.js');
  if (path === "/dakiraty") import('./assets/DakiratyLanding-L0gwtWBt.js');
  if (path === "/quran") import('./assets/ProgramDetails-B9MA60qD.js');
  if (path === "/kids-memory") import('./assets/KidsMemoryLanding-CqbVj6Y5.js');
  if (path === "/blog") import('./assets/Blog-DOgmoOxh.js');
};
const Navbar = () => {
  const location = useLocation();
  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "من نحن", path: "/about" },
    { name: "برنامج ذاكرتي", path: "/dakiraty" },
    { name: "برنامج القرآن", path: "/quran" },
    { name: "ذاكرة الأطفال", path: "/kids-memory" },
    { name: "المدونة", path: "/blog" }
  ];
  const isActive = (path) => location.pathname === path;
  return /* @__PURE__ */ jsx("nav", { className: "fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 transition-all duration-300", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:h-20", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center h-16 md:h-full", children: /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex items-center gap-2", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group", onMouseEnter: () => prefetchRoute$1("/"), children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary-blue rounded-xl rotate-3 group-hover:rotate-0 transition-all duration-300 flex items-center justify-center text-white shadow-lg", children: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }) }),
      /* @__PURE__ */ jsxs("span", { className: "font-bold text-2xl text-dark-blue tracking-tight flex items-center gap-1", children: [
        /* @__PURE__ */ jsx("span", { className: "text-accent-yellow", children: "Coach" }),
        /* @__PURE__ */ jsx("span", { children: "أحمد" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden w-full pb-3 overflow-x-auto no-scrollbar", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 min-w-max px-1", children: navLinks.map((link) => /* @__PURE__ */ jsx(
      Link,
      {
        to: link.path,
        onMouseEnter: () => prefetchRoute$1(link.path),
        className: `whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${isActive(link.path) ? "bg-primary-blue text-white border-primary-blue shadow-md" : "bg-gray-50 text-gray-600 border-gray-100"}`,
        children: link.name
      },
      link.name
    )) }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center space-x-8 space-x-reverse", children: navLinks.map((link) => /* @__PURE__ */ jsx(
      Link,
      {
        to: link.path,
        onMouseEnter: () => prefetchRoute$1(link.path),
        className: `text-base font-medium transition-colors duration-200 hover:text-primary-blue ${isActive(link.path) ? "text-primary-blue font-bold" : "text-gray-600"}`,
        children: link.name
      },
      link.name
    )) })
  ] }) }) });
};

const prefetchRoute = (path) => {
  if (path === "/") import('./assets/Home-8NExGGvL.js');
  if (path === "/dakiraty") import('./assets/DakiratyLanding-L0gwtWBt.js');
  if (path === "/quran") import('./assets/ProgramDetails-B9MA60qD.js');
  if (path === "/blog") import('./assets/Blog-DOgmoOxh.js');
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "bg-dark-blue text-white pt-20 pb-10 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-1 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary-blue rounded-xl flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }) }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-2xl", children: "أحمد" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: "نساعدك على اكتشاف قدراتك العقلية وتطوير مهارات الحفظ والتركيز من خلال برامج تدريبية احترافية مبنية على أسس علمية." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 space-x-reverse pt-2", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all", children: /* @__PURE__ */ jsx(Facebook, { size: 18 }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all", children: /* @__PURE__ */ jsx(Twitter, { size: 18 }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all", children: /* @__PURE__ */ jsx(Instagram, { size: 18 }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all", children: /* @__PURE__ */ jsx(Youtube, { size: 18 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-6 text-white", children: "روابط هامة" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-gray-400 hover:text-accent-yellow transition-colors block", children: "من نحن" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/dakiraty", onMouseEnter: () => prefetchRoute("/dakiraty"), className: "text-gray-400 hover:text-accent-yellow transition-colors block", children: "برنامج ذاكرتي" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/quran", onMouseEnter: () => prefetchRoute("/quran"), className: "text-gray-400 hover:text-accent-yellow transition-colors block", children: "برنامج القرآن" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-accent-yellow transition-colors block", children: "سياسة الخصوصية" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-6 text-white", children: "اتصل بنا" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-400", children: [
            /* @__PURE__ */ jsx(Phone, { size: 18, className: "text-primary-blue" }),
            /* @__PURE__ */ jsx("span", { dir: "ltr", children: "+212 633 698 758" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-400", children: [
            /* @__PURE__ */ jsx(Mail, { size: 18, className: "text-primary-blue" }),
            /* @__PURE__ */ jsx("span", { children: "info@coachahmed.com" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 18, className: "text-primary-blue mt-1" }),
            /* @__PURE__ */ jsx("span", { children: "المغرب" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-6 text-white", children: "النشرة البريدية" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "اشترك للحصول على نصائح أسبوعية لتقوية الذاكرة." }),
        /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-3", onSubmit: (e) => e.preventDefault(), children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              placeholder: "بريدك الإلكتروني",
              className: "bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-blue transition-colors text-sm"
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "bg-primary-blue hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors text-sm", children: "اشترك الآن" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-white/5 mt-16 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " كوتش أحمد. جميع الحقوق محفوظة."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-gray-600 text-xs flex gap-4", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-gray-400", children: "الشروط والأحكام" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-gray-400", children: "سياسة الاسترجاع" })
      ] })
    ] })
  ] }) });
};

const ConvexClientProvider = ({ children }) => {
  {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
};

const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return /* @__PURE__ */ jsx(ConvexClientProvider, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow pt-32 md:pt-20", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(Analytics, {}),
    /* @__PURE__ */ jsx(SpeedInsights, {})
  ] }) });
};

const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        lazy: () => import('./assets/Home-8NExGGvL.js').then((m) => ({ Component: m.default })),
        entry: "pages/Home.tsx"
      },
      {
        path: "dakiraty",
        lazy: () => import('./assets/DakiratyLanding-L0gwtWBt.js').then((m) => ({ Component: m.default })),
        entry: "pages/DakiratyLanding.tsx"
      },
      {
        path: "quran",
        lazy: async () => {
          const ProgramDetails = (await import('./assets/ProgramDetails-B9MA60qD.js')).default;
          return { Component: () => /* @__PURE__ */ jsx(ProgramDetails, { type: "quran" }) };
        },
        entry: "pages/ProgramDetails.tsx"
      },
      {
        path: "kids-memory",
        lazy: () => import('./assets/KidsMemoryLanding-CqbVj6Y5.js').then((m) => ({ Component: m.default })),
        entry: "pages/KidsMemoryLanding.tsx"
      },
      {
        path: "about",
        lazy: () => import('./assets/About-5T2J8fWh.js').then((m) => ({ Component: m.default })),
        entry: "pages/About.tsx"
      },
      {
        path: "blog",
        lazy: () => import('./assets/Blog-DOgmoOxh.js').then((m) => ({ Component: m.default })),
        entry: "pages/Blog.tsx"
      },
      {
        path: "blog/:slug",
        lazy: () => import('./assets/BlogPost-B-40a7v_.js').then((m) => ({ Component: m.default })),
        entry: "pages/BlogPost.tsx"
      },
      {
        path: "fr/blog",
        lazy: async () => {
          const BlogFr = (await import('./assets/BlogFr-W374MVIr.js')).default;
          return { Component: BlogFr };
        },
        entry: "pages/BlogFr.tsx"
      },
      {
        path: "fr/blog/:slug",
        lazy: async () => {
          const BlogPostFr = (await import('./assets/BlogPostFr-B7YQjAAr.js')).default;
          return { Component: BlogPostFr };
        },
        entry: "pages/BlogPostFr.tsx"
      }
    ]
  },
  // ============================================================
  // Admin tree — hidden from sitemap, blocked by robots.txt,
  // noindex'd via Seo component. NOT prerendered (no SSG) since
  // the content is dynamic (Convex-backed) and auth-gated.
  // ============================================================
  {
    path: "/admin",
    lazy: () => import('./assets/AdminLayout-CUSM_Yfc.js').then((m) => ({ Component: m.default })),
    entry: "components/AdminLayout.tsx",
    children: [
      {
        index: true,
        lazy: () => import('./assets/Admin-Bxt9ByCw.js').then((m) => ({ Component: m.default }))
      },
      {
        path: "articles",
        lazy: () => import('./assets/Admin-Bxt9ByCw.js').then((m) => ({ Component: m.AdminDashboard }))
      },
      {
        path: "edit/:id",
        lazy: () => import('./assets/AdminEditor-B3-vDOhz.js').then((m) => ({ Component: m.default }))
      }
    ]
  }
];

const createRoot = ViteReactSSG({ routes });

export { ConvexClientProvider as C, createRoot };
