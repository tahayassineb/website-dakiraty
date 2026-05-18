import type { RouteRecord } from 'vite-react-ssg';
import Layout from './components/Layout';
import { articleSlugs, articleSlugsFr } from './lib/articles';

/**
 * Routes config for vite-react-ssg.
 *
 * Each route is prerendered to static HTML at build time so AI crawlers
 * (GPTBot, ClaudeBot, PerplexityBot) see real content, not an empty SPA shell.
 *
 * `entry` hints which source file's CSS to inline per route (prevents FOUC).
 * Dynamic routes (`:slug`) use `getStaticPaths` so vite-react-ssg knows which
 * slugs to render.
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
        getStaticPaths: () => articleSlugs,
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
        getStaticPaths: () => articleSlugsFr,
      },
    ],
  },
];
