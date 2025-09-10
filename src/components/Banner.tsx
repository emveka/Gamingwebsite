// src/components/layout/Banner.tsx - Banner avec carousel de 2 images
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * Banner Component - Carousel automatique de 2 images
 * 
 * FONCTIONNALITÉS :
 * - Défilement automatique toutes les 5 secondes
 * - Navigation manuelle avec flèches
 * - Indicateurs de position (dots)
 * - Responsive et optimisé
 * - Largeur limitée sur desktop (max 1500px)
 * - Transition fluide entre images
 */

interface BannerImage {
  id: string;
  src: string;
  alt: string;
}

const Banner: React.FC = () => {
  // État pour l'image active
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Configuration des images du banner
  const bannerImages: BannerImage[] = [
    {
      id: "banner-msi-1",
      src: "/images/bannerMSI.webp",
      alt: "Banner Gaming MSI Discount"
    },
    {
      id: "banner-gaming-2",
      src: "/images/banner2.jpg", // Ajoutez votre deuxième image ici
      alt: "Banner Gaming Promotion 2"
    }
  ];

  // Fonction pour aller à l'image suivante
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bannerImages.length);
  };

  // Fonction pour aller à l'image précédente
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  // Fonction pour aller à une image spécifique
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // 5000ms = 5 secondes

    return () => clearInterval(interval); // Nettoie l'intervalle au démontage
  }, []);

  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-[1500px] mx-auto">
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-150 overflow-hidden group">
          
          {/* CONTAINER DES IMAGES */}
          <div className="relative w-full h-full">
            {bannerImages.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-center"
                  priority={index === 0} // Priorité pour la première image
                  sizes="(max-width: 1500px) 100vw, 1500px"
                />
              </div>
            ))}
          </div>

          {/* BOUTONS DE NAVIGATION - Visibles au hover */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
            aria-label="Image précédente"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
            aria-label="Image suivante"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* INDICATEURS DE POSITION (DOTS) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-orange-600 w-8' // Actif : orange et plus large
                    : 'bg-white/70 hover:bg-white' // Inactif : blanc transparent
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>

          {/* OVERLAY GRADIENT LÉGER POUR AMÉLIORER LA LISIBILITÉ DES CONTRÔLES */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Banner;

/**
 * INSTRUCTIONS D'UTILISATION :
 * 
 * 1. Ajoutez votre deuxième image dans le dossier public/images/
 * 2. Modifiez le src de la deuxième image dans bannerImages
 * 3. Ajustez le timing du défilement automatique en changeant 5000ms
 * 
 * PERSONALISATION :
 * - Changer la durée d'affichage : modifier la valeur dans setInterval (ligne 60)
 * - Ajouter plus d'images : ajoutez des objets dans bannerImages
 * - Changer les couleurs : modifier les classes Tailwind des boutons et dots
 * - Désactiver le défilement auto : commentez useEffect (lignes 53-58)
 */