import { Head } from 'vite-react-ssg';

export const SITE_URL = 'https://website-dakiraty.vercel.app';
export const DEFAULT_OG_IMAGE = 'https://szyuhfwlwmmjjtbupmxf.supabase.co/storage/v1/object/public/chat-media/212632730020@s.whatsapp.net_1768925248390.jpeg';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Per-page SEO via <Head/> from vite-react-ssg.
 *
 * Renders during SSG (Node renderToString) so the prerendered HTML for each
 * route ships with its own title, meta, OG, Twitter, canonical, and JSON-LD.
 * That's what AI crawlers (GPTBot, ClaudeBot, PerplexityBot) need to cite us.
 *
 * After hydration, react-helmet-async (under the hood) keeps the head in sync
 * during client-side navigation too.
 */
export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  keywords,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd,
}) => {
  const fullUrl = `${SITE_URL}${path}`;
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Head>
  );
};

export default Seo;
