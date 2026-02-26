import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface LiteYouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
  posterQuality?: 'maxresdefault' | 'hqdefault' | 'sddefault';
  priority?: boolean;
  customThumbnail?: string;
}

const LiteYouTubeEmbed: React.FC<LiteYouTubeEmbedProps> = ({ 
  videoId, 
  title, 
  className = "",
  posterQuality = 'hqdefault',
  priority = false,
  customThumbnail
}) => {
  const [isPreconnected, setIsPreconnected] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Use custom thumbnail if provided, otherwise fallback to YouTube standard
  const posterUrl = customThumbnail || `https://i.ytimg.com/vi/${videoId}/${posterQuality}.jpg`;

  const warmConnections = () => {
    if (isPreconnected) return;
    setIsPreconnected(true);
  };

  const loadIframe = () => {
    setIsIframeLoaded(true);
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden bg-gray-900 cursor-pointer group ${className}`}
      onPointerOver={warmConnections}
      onClick={loadIframe}
      aria-label={`Play video: ${title}`}
    >
      {isIframeLoaded ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      ) : (
        <>
          <img
            src={posterUrl}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            loading={priority ? "eager" : "lazy"}
            // @ts-ignore - fetchPriority is valid in modern browsers but missing in some React types
            fetchPriority={priority ? "high" : "auto"}
            width="640"
            height="360"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:bg-red-700 transition-all duration-300">
                <Play className="text-white fill-current ml-1" size={32} />
             </div>
          </div>
          {/* Preconnect links when hovering to speed up iframe load */}
          {isPreconnected && (
            <div className="hidden">
              <link rel="preconnect" href="https://www.youtube.com" />
              <link rel="preconnect" href="https://www.google.com" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LiteYouTubeEmbed;