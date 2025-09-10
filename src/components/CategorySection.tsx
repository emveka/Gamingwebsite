// src/components/layout/CategorySection.tsx - Version simplifiée avec juste des images

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * CategorySection Component - 4 rectangles de catégories avec images simples
 * 
 * Mobile : Grid 2x2 (4 rectangles)
 * Desktop : Une ligne (4 rectangles côte à côte)
 * 
 * VERSION SIMPLIFIÉE :
 * - Juste une image par catégorie
 * - Design épuré et minimaliste
 * - Effet hover subtil
 */

const CategorySection: React.FC = () => {
  const categories = [
    {
      id: 1,
      name: "",
      href: "/categories/playstation",
      image: "/images/categories/Graphic.webp"
    },
    {
      id: 2,
      name: "",
      href: "/categories/xbox",
      image: "/images/categories/BannerCatpcgamer.webp"
    },
    {
      id: 3,
      name: "",
      href: "/categories/nintendo",
      image: "/images/categories/BannerCatCartemere.webp"
    },
    {
      id: 4,
      name: "",
      href: "/categories/pc-gaming",
      image: "/images/categories/BannerCatPortable.webp"
    }
  ];

  return (
    <div className="w-full bg-white py-2">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-2">
        {/* Grid responsive : 2x2 sur mobile, 1x4 sur desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="block group"
            >
              {/* Container avec image */}
              <div className="relative min-h-[80px] lg:min-h-[150px] overflow-hidden group-hover:scale-105 transition-transform duration-300">
                
                {/* IMAGE SIMPLE */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* OVERLAY LÉGER pour le nom (optionnel) */}
                <div className="absolute inset-0  group-hover:bg-black/10 transition-colors duration-300" />

                {/* NOM DE LA CATÉGORIE */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm lg:text-xl uppercase tracking-wide text-center drop-shadow-lg">
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;