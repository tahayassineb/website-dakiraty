import { useEffect } from 'react';

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

const TAG_ID = 'data-seo-managed';

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(TAG_ID, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (rel: string, href: string, attrs: Record<string, string> = {}) => {
  const selectorAttrs = Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join('');
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${selectorAttrs}`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    el.setAttribute(TAG_ID, 'true');
    document.head.appendChild(el);
  }
  el.href = href;
};

/**
 * Per-page SEO. Updates title + meta + OG + Twitter + JSON-LD on mount.
 *
 * Note: This is client-side SEO. Google's renderer executes JS and will see
 * the updated tags. However, most AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
 * do NOT execute JS — for full AI search visibility, we need build-time
 * prerendering (see SEO_PHASE1_NOTES.md, Phase 2).
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
  useEffect(() => {
    const fullUrl = `${SITE_URL}${path}`;

    document.title = title;

    setMeta('meta[name="description"]', 'name', 'description', description);
    if (keywords) setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    );

    setLink('canonical', fullUrl);

    setMeta('meta[property="og:url"]', 'property', 'og:url', fullUrl);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    document
      .querySelectorAll(`script[type="application/ld+json"][${TAG_ID}="page"]`)
      .forEach((s) => s.remove());

    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(TAG_ID, 'page');
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, path, ogImage, ogType, noindex, jsonLd]);

  return null;
};

export default Seo;
