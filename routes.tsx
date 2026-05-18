import type { RouteRecord } from 'vite-react-ssg';
import Layout from './components/Layout';

/**
 * Routes config for vite-react-ssg.
 *
 * Static landing pages (/, /dakiraty, /quran, /about, etc.) are still
 * prerendered to HTML at build time for SEO.
 *
 * Blog pages (/blog, /blog/:slug, /fr/blog, /fr/blog/:slug) are dynamic —
 * they fetch article content from Convex at runtime. This is a deliberate
 * trade-off: edits in the admin panel appear on the live site instantly
 * (no rebuild), but AI crawlers see less content per article.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        lazy: () => import('./pages/Home').then((m) => ({ Component: m.default })),
        entry: 'pages/Home.tsx',
      },
      {
        path: 'dakiraty',
        lazy: () => import('./pages/DakiratyLanding').then((m) => ({ Component: m.default })),
        entry: 'pages/DakiratyLanding.tsx',
      },
      {
        path: 'quran',
        lazy: async () => {
          const ProgramDetails = (await import('./pages/ProgramDetails')).default;
          return { Component: () => <ProgramDetails type="quran" /> };
        },
        entry: 'pages/ProgramDetails.tsx',
      },
      {
        path: 'kids-memory',
        lazy: () => import('./pages/KidsMemoryLanding').then((m) => ({ Component: m.default })),
        entry: 'pages/KidsMemoryLanding.tsx',
      },
      {
        path: 'about',
        lazy: () => import('./pages/About').then((m) => ({ Component: m.default })),
        entry: 'pages/About.tsx',
      },
      {
        path: 'blog',
        lazy: () => import('./pages/Blog').then((m) => ({ Component: m.default })),
        entry: 'pages/Blog.tsx',
      },
      {
        path: 'blog/:slug',
        lazy: () => import('./pages/BlogPost').then((m) => ({ Component: m.default })),
        entry: 'pages/BlogPost.tsx',
      },
      {
        path: 'fr/blog',
        lazy: async () => {
          const BlogFr = (await import('./pages/BlogFr')).default;
          return { Component: BlogFr };
        },
        entry: 'pages/BlogFr.tsx',
      },
      {
        path: 'fr/blog/:slug',
        lazy: async () => {
          const BlogPostFr = (await import('./pages/BlogPostFr')).default;
          return { Component: BlogPostFr };
        },
        entry: 'pages/BlogPostFr.tsx',
      },
    ],
  },
  // ============================================================
  // Admin tree — hidden from sitemap, blocked by robots.txt,
  // noindex'd via Seo component. NOT prerendered (no SSG) since
  // the content is dynamic (Convex-backed) and auth-gated.
  // ============================================================
  {
    path: '/admin',
    lazy: () => import('./components/AdminLayout').then((m) => ({ Component: m.default })),
    entry: 'components/AdminLayout.tsx',
    children: [
      {
        index: true,
        lazy: () => import('./pages/Admin').then((m) => ({ Component: m.default })),
      },
      {
        path: 'articles',
        lazy: () => import('./pages/Admin').then((m) => ({ Component: m.AdminDashboard })),
      },
      {
        path: 'edit/:id',
        lazy: () => import('./pages/AdminEditor').then((m) => ({ Component: m.default })),
      },
    ],
  },
];
