// src/components/product/ImageGallery.tsx
'use client'
import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  discountPercentage: number;
  inStock: boolean;
}

/**
 * Composant ImageGallery - Galerie d'images avec sélection
 * 
 * FONCTIONNALITÉS :
 * - Image principale zoomable
 * - Miniatures cliquables
 * - Badges de réduction et stock
 * - Navigation responsive
 * - Overlay pour rupture de stock
 */
const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  productName,
  discountPercentage,
  inStock
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* IMAGE PRINCIPALE */}
      <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImageIndex] || images[0] || '/images/1.webp'}
          alt={productName}
          fill
          className="object-contain p-8"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          unoptimized
        />
        
        {/* BADGE RÉDUCTION */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-sm">
            -{discountPercentage}%
          </div>
        )}

        {/* STATUT STOCK */}
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
              Rupture de stock
            </span>
          </div>
        )}
      </div>

      {/* MINIATURES */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImageIndex === index 
                  ? 'border-orange-600' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-contain p-2 bg-gray-50"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;