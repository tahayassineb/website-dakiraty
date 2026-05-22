import { jsxs, jsx } from 'react/jsx-runtime';
import { Head } from 'vite-react-ssg';

const SITE_URL = "https://website-dakiraty.vercel.app";
const DEFAULT_OG_IMAGE = "https://szyuhfwlwmmjjtbupmxf.supabase.co/storage/v1/object/public/chat-media/212632730020@s.whatsapp.net_1768925248390.jpeg";
const Seo = ({
  title,
  description,
  keywords,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  jsonLd
}) => {
  const fullUrl = `${SITE_URL}${path}`;
  const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  return /* @__PURE__ */ jsxs(Head, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: robots }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: fullUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: fullUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage }),
    jsonLd && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) })
  ] });
};

export { DEFAULT_OG_IMAGE as D, Seo as S, SITE_URL as a };
