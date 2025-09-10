
// src/components/layout/ImageSection.tsx - Section 3 colonnes d'images avec carousel mobile
'use client'
import React, { useState } from 'react';
import Image from 'next/image';

/**
 * ImageSection Component - Section avec 3 images en colonnes
 * 
 * FONCTIONNALITÉS :
 * - Desktop: 3 images verticales en colonnes
 * - Mobile: Carousel avec une image visible + navigation par swipe
 * - Responsive design adaptatif
 * - Design cohérent avec la palette orange
 * - Hover effects et transitions fluides
 */

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  href?: string;
}

interface ImageSectionProps {
  title?: string;
  subtitle?: string;
  images: ImageItem[];
  onImageClick?: (imageId: string) => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  title = "Découvrez nos catégories",
  subtitle = "Trouvez exactement ce que vous cherchez",
  images,
  onImageClick
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full bg-gray-50 py-8 lg:py-16 font-gotham-book">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4">
        
        {/* HEADER DE LA SECTION */}
        {(title || subtitle) && (
          <div className="text-center mb-6 lg:mb-12">
            {title && (
              <h2 className="font-custom text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 lg:mb-4">
                {typeof title === 'string' && title.includes('GAMING') ? (
                  <span>
                    {title.split('GAMING')[0]}
                    <span className="text-orange-600">GAMING</span>
                    {title.split('GAMING')[1]}
                  </span>
                ) : (
                  title
                )}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-600 text-sm lg:text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* MOBILE: CAROUSEL AVEC UNE IMAGE */}
        <div className="block lg:hidden">
          <div className="relative">
            {/* CONTAINER DES IMAGES */}
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="w-full flex-shrink-0 relative group cursor-pointer"
                    onClick={() => onImageClick?.(image.id)}
                  >
                    {/* IMAGE CONTAINER */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                        sizes="100vw"
                      />
                      
                      {/* OVERLAY GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* CONTENU OVERLAY */}
                      {(image.title || image.subtitle) && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          {image.title && (
                            <h3 className="font-bold text-lg mb-1">
                              {image.title}
                            </h3>
                          )}
                          {image.subtitle && (
                            <p className="text-sm text-gray-200">
                              {image.subtitle}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOUTONS DE NAVIGATION MOBILE */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* INDICATEURS DE NAVIGATION */}
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-orange-600 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP: GRID 3 COLONNES */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {images.slice(0, 3).map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => onImageClick?.(image.id)}
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  sizes="(max-width: 1200px) 25vw, 20vw"
                  quality={95}
                  priority={index === 0}
                  unoptimized
                />
                
                {/* OVERLAY GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* CONTENU OVERLAY */}
                {(image.title || image.subtitle) && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {image.title && (
                      <h3 className="font-bold text-xl mb-2">
                        {image.title}
                      </h3>
                    )}
                    {image.subtitle && (
                      <p className="text-sm text-gray-200">
                        {image.subtitle}
                      </p>
                    )}
                  </div>
                )}
                
                {/* INDICATEUR HOVER */}
                <div className="absolute top-3 right-3 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* BORDURE ORANGE AU HOVER */}
              <div className="absolute inset-0 border-2 border-orange-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* MESSAGE SI MOINS DE 3 IMAGES */}
        {images.length < 3 && (
          <div className="text-center mt-8 text-gray-500">
            <p className="text-sm lg:text-base">
              Ajoutez {3 - images.length} image{3 - images.length > 1 ? 's' : ''} supplémentaire{3 - images.length > 1 ? 's' : ''} pour compléter cette section
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;

// EXEMPLE D'UTILISATION
export const ExampleUsage: React.FC = () => {
  const sampleImages: ImageItem[] = [
    {
      id: "gaming-pc",
      src: "/images/gaming-pc-vertical.jpg",
      alt: "PC Gaming",
      title: "PC Gaming",
      subtitle: "Configurations hautes performances"
    },
    {
      id: "gaming-laptop",
      src: "/images/gaming-laptop-vertical.jpg", 
      alt: "Laptops Gaming",
      title: "Laptops Gaming",
      subtitle: "Puissance et mobilité"
    },
    {
      id: "gaming-accessories",
      src: "/images/gaming-accessories-vertical.jpg",
      alt: "Accessoires Gaming",
      title: "Accessoires",
      subtitle: "Périphériques professionnels"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <ImageSection
        title="Nos Catégories Gaming"
        subtitle="Découvrez notre gamme complète d'équipements gaming professionnels"
        images={sampleImages}
        onImageClick={(imageId) => console.log('Image cliquée:', imageId)}
      />
    </div>
  );
};