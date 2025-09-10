// src/utils/youtube.ts - Version corrigée sans duplication
/**
 * Type pour les qualités de miniatures YouTube disponibles
 */
export type YouTubeThumbnailQuality = 'default' | 'medium' | 'high' | 'maxres';

/**
 * Extrait l'ID d'une vidéo YouTube depuis différents formats d'URL
 * @param url - URL YouTube à analyser
 * @returns ID de la vidéo ou null si invalide
 */
export const getYouTubeId = (url?: string): string | null => {
  if (!url || typeof url !== 'string') return null;
  
  try {
    const urlObj = new URL(url);
    
    // Format youtu.be/VIDEO_ID
    if (urlObj.hostname.includes('youtu.be')) {
      const videoId = urlObj.pathname.slice(1);
      return isValidYouTubeId(videoId) ? videoId : null;
    }
    
    // Format youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes('youtube.com')) {
      const videoId = urlObj.searchParams.get('v');
      if (videoId && isValidYouTubeId(videoId)) {
        return videoId;
      }
      
      // Format youtube.com/embed/VIDEO_ID
      const embedMatch = urlObj.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch && isValidYouTubeId(embedMatch[1])) {
        return embedMatch[1];
      }
    }
    
  } catch (error) {
    console.error('Erreur parsing URL YouTube:', error);
  }
  
  return null;
};

/**
 * Valide qu'un ID YouTube a le bon format
 * @param videoId - ID à valider
 * @returns true si l'ID est valide
 */
const isValidYouTubeId = (videoId: string): boolean => {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
};

/**
 * Génère une URL d'embed YouTube sécurisée
 * @param videoId - ID de la vidéo YouTube
 * @param options - Options d'embed optionnelles
 * @returns URL d'embed complète
 */
export const getYouTubeEmbedUrl = (
  videoId: string, 
  options?: {
    autoplay?: boolean;
    controls?: boolean;
    rel?: boolean;
    modestbranding?: boolean;
    start?: number;
  }
): string => {
  if (!isValidYouTubeId(videoId)) {
    throw new Error('ID YouTube invalide');
  }
  
  const params = new URLSearchParams();
  
  // Options par défaut pour une expérience propre
  const defaultOptions = {
    rel: false,
    modestbranding: true,
    controls: true,
    autoplay: false,
    ...options
  };
  
  // Conversion des options en paramètres URL
  Object.entries(defaultOptions).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      params.append(key, value ? '1' : '0');
    } else if (typeof value === 'number') {
      params.append(key, value.toString());
    }
  });
  
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
};

/**
 * Génère une URL de miniature YouTube
 * @param videoId - ID de la vidéo YouTube
 * @param quality - Qualité de la miniature souhaitée
 * @returns URL de la miniature
 */
export const getYouTubeThumbnail = (
  videoId: string, 
  quality: YouTubeThumbnailQuality = 'high'
): string => {
  if (!isValidYouTubeId(videoId)) {
    throw new Error('ID YouTube invalide');
  }
  
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
};

/**
 * Récupère les informations de base d'une vidéo YouTube (nécessite l'API)
 * @param videoId - ID de la vidéo
 * @returns Objet avec les informations de base
 */
export const getYouTubeVideoInfo = async (videoId: string) => {
  if (!isValidYouTubeId(videoId)) {
    throw new Error('ID YouTube invalide');
  }
  
  // Cette fonction nécessiterait une clé API YouTube
  // Pour l'instant, on retourne les informations de base disponibles
  return {
    id: videoId,
    embedUrl: getYouTubeEmbedUrl(videoId),
    thumbnailUrl: getYouTubeThumbnail(videoId),
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`
  };
};