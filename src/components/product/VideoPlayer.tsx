// src/components/product/VideoPlayer.tsx - Lecteur vidéo amélioré
'use client'
import React, { useState } from 'react';

interface VideoPlayerProps {
  videoUrl?: string;
  productName: string;
  fallbackImage?: string;
}

/**
 * Composant VideoPlayer - Lecteur vidéo optimisé
 * 
 * FONCTIONNALITÉS :
 * - Support YouTube sans cookies
 * - Support vidéos MP4/WebM
 * - Fallback image si pas de vidéo
 * - Réduction des erreurs console
 * - Lazy loading
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  productName,
  fallbackImage = '/images/1.webp'
}) => {
  const [hasError, setHasError] = useState(false);

  // Helper pour extraire l'ID YouTube d'une URL
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      // youtu.be/VIDEO_ID
      if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
      // youtube.com/watch?v=VIDEO_ID
      const v = u.searchParams.get('v');
      if (v) return v;
      // youtube.com/embed/VIDEO_ID
      const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (m) return m[1];
    } catch {
      setHasError(true);
    }
    return null;
  };

  const renderVideoContent = () => {
    if (hasError || !videoUrl) {
      return (
        <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <p className="text-gray-600">Aucune vidéo disponible pour ce produit.</p>
            </div>
          </div>
        </div>
      );
    }

    const ytId = getYouTubeId(videoUrl);
    
    if (ytId) {
      // Configuration YouTube optimisée pour réduire les erreurs
      const youtubeParams = new URLSearchParams({
        rel: '0',
        modestbranding: '1',
        controls: '1',
        showinfo: '0',
        iv_load_policy: '3',
        fs: '1',
        cc_load_policy: '0',
        disablekb: '0',
        enablejsapi: '0'
      });

      return (
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src={`https://www.youtube-nocookie.com/embed/${ytId}?${youtubeParams}`}
            title={`${productName} - vidéo produit`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onError={() => setHasError(true)}
          />
        </div>
      );
    }

    // Vidéo directe (MP4, WebM, etc.)
    const isDirectVideo = videoUrl.match(/\.(mp4|webm|ogg)$/i);
    if (isDirectVideo) {
      return (
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <video
            className="absolute inset-0 w-full h-full rounded-lg object-cover"
            controls
            preload="metadata"
            poster={fallbackImage}
            onError={() => setHasError(true)}
          >
            <source src={videoUrl} type={`video/${videoUrl.split('.').pop()}`} />
            Votre navigateur ne supporte pas les vidéos HTML5.
          </video>
        </div>
      );
    }

    // URL non reconnue
    setHasError(true);
    return null;
  };

  return (
    <div className="w-full">
      {renderVideoContent()}
    </div>
  );
};

export default VideoPlayer;