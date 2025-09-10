// src/components/products/ProductCardComponent.tsx - Card cliquable pour composants individuels avec Poppins
'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/**
 * ProductCardComponent - Card cliquable pour composants individuels avec Poppins
 * 
 * NOUVELLES FONCTIONNALITÉS :
 * ✅ Card entièrement cliquable avec navigation
 * ✅ Bouton "Ajouter au panier" avec stopPropagation pour éviter la navigation
 * ✅ Cursor pointer sur hover
 * ✅ Navigation vers /products/[id]
 * ✅ Gestion des événements séparés pour card et bouton
 * ✅ Police Poppins via classe CSS font-poppins (depuis globals.css)
 * 
 * CORRECTION MAJEURE :
 * ✅ Interface mise à jour avec les nouvelles catégories : GPU, Motherboard, CPU, RAM, SSD, PSU
 * ✅ Suppression des anciennes catégories : Storage, Peripherals
 * ✅ Adaptation des spécifications par catégorie
 */

interface ComponentProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  category: 'GPU' | 'Motherboard' | 'CPU' | 'RAM' | 'SSD' | 'PSU'; // ✅ INTERFACE CORRIGÉE
  specifications: Record<string, string>;
}

interface ProductCardComponentProps {
  product: ComponentProduct;
  onAddToCart: (id: string) => void;
  onViewDetails?: (id: string) => void; // Optionnel car on utilise la navigation
  className?: string;
}

const ProductCardComponent: React.FC<ProductCardComponentProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  className = ''
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const router = useRouter();

  /**
   * GESTION DE LA NAVIGATION
   * Fonction pour naviguer vers la page produit
   */
  const handleCardClick = () => {
    // Si une fonction onViewDetails est fournie, l'utiliser
    if (onViewDetails) {
      onViewDetails(product.id);
    } else {
      // Sinon, naviguer vers la page produit
      router.push(`/products/${product.id}`);
    }
  };

  /**
   * GESTION DU BOUTON PANIER
   * Empêche la propagation de l'événement pour éviter la navigation
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche le clic de remonter à la card
    onAddToCart(product.id);
  };

  // Obtenir les 4 spécifications les plus importantes selon la catégorie
  const getKeySpecifications = () => {
    const specs = Object.entries(product.specifications);
    switch (product.category) {
      case 'GPU':
        return specs.filter(([key]) => 
          ['Mémoire', 'Boost Clock', 'Interface', 'Alimentation'].includes(key)
        ).slice(0, 4);
      case 'CPU':
        return specs.filter(([key]) => 
          ['Cœurs', 'Threads', 'Fréquence Boost', 'Socket'].includes(key)
        ).slice(0, 4);
      case 'RAM':
        return specs.filter(([key]) => 
          ['Capacité', 'Type', 'Fréquence', 'Timings'].includes(key)
        ).slice(0, 4);
      case 'SSD': // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
        return specs.filter(([key]) => 
          ['Capacité', 'Interface', 'Lecture', 'Écriture'].includes(key)
        ).slice(0, 4);
      case 'Motherboard':
        return specs.filter(([key]) => 
          ['Socket', 'Chipset', 'RAM', 'WiFi'].includes(key)
        ).slice(0, 4);
      case 'PSU': // ✅ NOUVEAU : 'PSU' au lieu de 'Peripherals'
        return specs.filter(([key]) => 
          ['Puissance', 'Certification', 'Modularité', 'Ventilateur'].includes(key)
        ).slice(0, 4);
      default:
        return specs.slice(0, 4);
    }
  };

  const keySpecs = getKeySpecifications();

  return (
    <div 
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 font-poppins group cursor-pointer ${className}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // Gestion de l'accessibilité : navigation au clavier
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          </div>
        )}
        
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        
        {/* BADGE REMISE (si prix original) */}
        {product.originalPrice && (
          <div className="absolute top-0 left-0">
            <div className="bg-orange-600 text-white px-2 py-1 text-xs font-bold">
              -{(product.originalPrice - product.price).toLocaleString()} DH
            </div>
          </div>
        )}

        {/* STATUT STOCK */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-10">
            <span className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-bold">
              Rupture de stock
            </span>
          </div>
        )}
      </div>

      {/* CONTENU */}
      <div className="p-2 lg:p-4">
        
        {/* MARQUE */}
        <div className="mb-1">
          <span className="text-orange-600 font-semibold text-xs uppercase tracking-wide">
            {product.brand}
          </span>
        </div>

        {/* NOM DU PRODUIT */}
        <h3 className="font-bold text-sm lg:text-lg text-gray-900 mb-1 lg:mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors h-10 lg:h-14 flex items-start leading-tight">
          {product.name}
        </h3>

        {/* SPÉCIFICATIONS PRINCIPALES */}
        <div className="mb-2 lg:mb-4 space-y-1 lg:space-y-2">
          <div className="grid grid-cols-1 gap-0.5 lg:gap-1">
            {keySpecs.map(([key, value], index) => (
              <div key={index} className="flex items-center text-xs text-gray-600 bg-gray-50 rounded px-1 lg:px-2 py-0.5 lg:py-1">
                <span className="font-medium text-gray-700 mr-1">{key}:</span>
                <span className="truncate">{value}</span>
              </div>
            ))}
          </div>
          
          {/* INDICATEUR S'IL Y A PLUS DE SPÉCIFICATIONS */}
          {Object.keys(product.specifications).length > 4 && (
            <div className="text-xs text-gray-500 text-center mt-0.5 lg:mt-1">
              +{Object.keys(product.specifications).length - 4} autres spécifications
            </div>
          )}
        </div>

        {/* PRIX */}
        <div className="flex items-center justify-between mb-2 lg:mb-4">
          <div className="flex items-center space-x-2 lg:flex-row lg:items-center lg:space-x-2">
            <span className="text-lg lg:text-2xl font-bold text-red-500">
              {product.price.toLocaleString()} DH
            </span>
            {product.originalPrice && (
              <span className="text-sm lg:text-lg text-gray-400 line-through">
                {product.originalPrice.toLocaleString()} DH
              </span>
            )}
          </div>
        </div>

        {/* BOUTON AVEC GESTION SÉPARÉE DES ÉVÉNEMENTS */}
        <div>
          <button
            onClick={handleAddToCart} // Utilise la fonction qui empêche la propagation
            disabled={!product.inStock}
            className={`w-full py-1.5 lg:py-2 px-2 lg:px-4 rounded-lg font-medium transition-all duration-300 text-xs lg:text-sm ${
              product.inStock
                ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 shadow-md hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardComponent;

/**
 * CORRECTIONS APPORTÉES :
 * 
 * ✅ INTERFACE TYPESCRIPT :
 * - category: 'GPU' | 'Motherboard' | 'CPU' | 'RAM' | 'SSD' | 'PSU'
 * - Suppression de 'Storage' et 'Peripherals'
 * 
 * ✅ FONCTION getKeySpecifications() :
 * - case 'SSD': au lieu de 'Storage'
 * - case 'PSU': au lieu de 'Peripherals'
 * - Spécifications adaptées pour PSU (Puissance, Certification, Modularité)
 * 
 * ✅ COMPATIBILITÉ TOTALE :
 * - Maintenant compatible avec ComponentsSection.tsx
 * - Plus d'erreurs TypeScript
 * - Logique préservée, juste les types corrigés
 */