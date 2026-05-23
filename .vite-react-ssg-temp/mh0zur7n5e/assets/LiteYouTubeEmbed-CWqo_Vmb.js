import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Play } from 'lucide-react';

const LiteYouTubeEmbed = ({
  videoId,
  title,
  className = "",
  posterQuality = "hqdefault",
  priority = false,
  customThumbnail
}) => {
  const [isPreconnected, setIsPreconnected] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const posterUrl = customThumbnail || `https://i.ytimg.com/vi/${videoId}/${posterQuality}.jpg`;
  const warmConnections = () => {
    if (isPreconnected) return;
    setIsPreconnected(true);
  };
  const loadIframe = () => {
    setIsIframeLoaded(true);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `relative w-full h-full overflow-hidden bg-gray-900 cursor-pointer group ${className}`,
      onPointerOver: warmConnections,
      onClick: loadIframe,
      "aria-label": `Play video: ${title}`,
      children: isIframeLoaded ? /* @__PURE__ */ jsx(
        "iframe",
        {
          src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
          title,
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true,
          className: "absolute top-0 left-0 w-full h-full"
        }
      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: posterUrl,
            alt: title,
            className: "absolute top-0 left-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300",
            loading: priority ? "eager" : "lazy",
            fetchPriority: priority ? "high" : "auto",
            width: "640",
            height: "360"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:bg-red-700 transition-all duration-300", children: /* @__PURE__ */ jsx(Play, { className: "text-white fill-current ml-1", size: 32 }) }) }),
        isPreconnected && /* @__PURE__ */ jsxs("div", { className: "hidden", children: [
          /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://www.youtube.com" }),
          /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://www.google.com" })
        ] })
      ] })
    }
  );
};

export { LiteYouTubeEmbed as L };
