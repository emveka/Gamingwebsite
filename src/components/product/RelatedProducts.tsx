// src/components/product/RelatedProducts.tsx
'use client'
import React from 'react';
import Image from 'next/image';
import { ComponentProduct } from '@/types/product';

interface RelatedProductsProps {
  products: ComponentProduct[];
  onProductClick: (productId: string) => void;
}

/**
 * Composant RelatedProducts - Affichage des produits similaires
 * 
 * FONCTIONNALITÉS :
 * - Grille responsive de produits
 * - Hover effects avec animations
 * - Navigation vers produits similaires
 * - Formatage des prix
 * - Images optimisées
 * - Maximum 4 produits affichés
 */
const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, onProductClick }) => {
  // Ne s'affiche que s'il y a des produits
  if (!products || products.length === 0) {
    return null;
  }

  // Formatage des prix
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' DH';
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
          Produits similaires
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {products.slice(0, 4).map((product) => (
            <div 
              key={product.id} 
              onClick={() => onProductClick(product.id)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
            >
              {/* IMAGE DU PRODUIT */}
              <div className="aspect-square bg-gray-50 rounded-t-lg overflow-hidden relative">
                <Image
                  src={product.images[0] || '/images/1.webp'}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                
                {/* BADGE DE RÉDUCTION */}
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}

                {/* STATUT STOCK */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      Rupture
                    </span>
                  </div>
                )}
              </div>

              {/* INFORMATIONS PRODUIT */}
              <div className="p-4">
                <div className="text-orange-600 text-xs font-bold mb-1 uppercase tracking-wide">
                  {product.brand}
                </div>
                <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* PRIX */}
                <div className="space-y-1">
                  <div className="text-lg font-bold text-red-500">
                    {formatPrice(product.price)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-xs text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  )}
                </div>

                {/* STOCK INDICATOR */}
                <div className="mt-2 flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'En stock' : 'Rupture'}
                  </span>
                </div>
              </div>

              {/* OVERLAY HOVER */}
              <div className="absolute inset-0 bg-orange-600 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* LIEN VOIR PLUS si plus de 4 produits */}
        {products.length > 4 && (
          <div className="text-center mt-8">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors">
              Voir plus de produits similaires
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;