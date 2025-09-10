// src/components/products/ProductCardPCGamer.tsx - Carte produit PC Gamer cliquable avec Poppins
'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/**
 * ProductCardPCGamer Component - Carte produit cliquable spécialisée pour PC Gaming avec Poppins
 * 
 * NOUVELLES FONCTIONNALITÉS :
 * ✅ Card entièrement cliquable avec navigation vers la page produit
 * ✅ Bouton "Ajouter au panier" avec événement séparé (stopPropagation)
 * ✅ Cursor pointer et indication visuelle de cliquabilité
 * ✅ Navigation vers /products/[id] par défaut
 * ✅ Support de onViewDetails personnalisé optionnel
 * ✅ Accessibilité complète (clavier, screen readers)
 * ✅ Police Poppins via classe CSS font-poppins (depuis globals.css)
 * 
 * CORRECTION MAJEURE :
 * ✅ Interface PCComponent mise à jour avec les nouvelles catégories
 * ✅ Suppression des anciennes catégories Storage, PSU
 * ✅ Adaptation des icônes et de la logique
 */

// Interface pour définir un composant PC - ✅ CORRIGÉE
interface PCComponent {
  type: 'GPU' | 'Motherboard' | 'CPU' | 'RAM' | 'SSD' | 'PSU'; // ✅ INTERFACE CORRIGÉE
  name: string;
  icon?: string;
}

// Interface pour le produit PC Gamer
interface PCGamerProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  components: PCComponent[];
  inStock: boolean;
}

interface ProductCardPCGamerProps {
  product: PCGamerProduct;
  onAddToCart?: (productId: string) => void;
  onViewDetails?: (productId: string) => void; // Optionnel - pour logique personnalisée
}

const ProductCardPCGamer: React.FC<ProductCardPCGamerProps> = ({
  product,
  onAddToCart,
  onViewDetails
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const router = useRouter();

  /**
   * GESTION DE LA NAVIGATION
   * Fonction principale pour naviguer vers la page produit
   */
  const handleCardClick = () => {
    // Si une fonction onViewDetails personnalisée est fournie, l'utiliser
    if (onViewDetails) {
      onViewDetails(product.id);
    } else {
      // Sinon, navigation par défaut vers /products/[id]
      router.push(`/products/${product.id}`);
    }
  };

  /**
   * GESTION DU BOUTON PANIER
   * Empêche la propagation pour éviter la navigation involontaire
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche le clic de remonter à la card parente
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  // Fonction pour obtenir l'icône du composant - ✅ MISE À JOUR
  const getComponentIcon = (type: PCComponent['type']) => {
    const iconPaths = {
      CPU: '/icons/cpu.svg',
      GPU: '/icons/Gpu(1).svg', 
      RAM: '/icons/ram.svg',
      SSD: '/icons/ssd.svg', // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
      Motherboard: '/icons/motherboard.svg',
      PSU: '/icons/psu.svg'
    };

    return (
      <Image
        src={iconPaths[type] || '/icons/default.svg'}
        alt={`${type} icon`}
        width={16}
        height={16}
        className="w-4 h-4 text-gray-600"
        unoptimized
      />
    );
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 font-poppins group cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // Accessibilité : navigation au clavier
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`Voir les détails du produit ${product.name}`}
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
              Indisponible
            </span>
          </div>
        )}
      </div>

      {/* CONTENU */}
      <div className="p-2 lg:p-4">
        
        {/* NOM DU PRODUIT */}
        <h3 className="font-bold text-sm lg:text-lg text-gray-900 mb-1 lg:mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors h-10 lg:h-14 flex items-start leading-tight">
          {product.name}
        </h3>

        {/* COMPOSANTS PRINCIPAUX */}
        <div className="mb-2 lg:mb-4 space-y-1 lg:space-y-2">
          <div className="grid grid-cols-1 gap-0.5 lg:gap-1">
            {product.components.slice(0, 4).map((component, index) => (
              <div key={index} className="flex items-center text-xs text-gray-600 bg-gray-50 rounded px-1 lg:px-2 py-0.5 lg:py-1">
                <span className="mr-1">{getComponentIcon(component.type)}</span>
                <span className="font-medium text-gray-700 mr-1">{component.type}:</span>
                <span className="truncate">{component.name}</span>
              </div>
            ))}
          </div>
          
          {/* INDICATEUR S'IL Y A PLUS DE COMPOSANTS */}
          {product.components.length > 4 && (
            <div className="text-xs text-gray-500 text-center mt-0.5 lg:mt-1">
              +{product.components.length - 4} autres composants
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
            onClick={handleAddToCart} // Fonction avec stopPropagation
            disabled={!product.inStock}
            className={`w-full py-1.5 lg:py-2 px-2 lg:px-4 rounded-lg font-medium transition-all duration-300 text-xs lg:text-sm ${
              product.inStock
                ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 shadow-md hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label={`Ajouter ${product.name} au panier`}
          >
            {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardPCGamer;

// EXEMPLE D'UTILISATION SIMPLE AVEC POPPINS - ✅ CORRIGÉ
export const ExampleUsageSimplePoppins: React.FC = () => {
  const sampleProduct: PCGamerProduct = {
    id: "pc-gamer-rtx4070-poppins",
    name: "PC Gamer RTX 4070 - Configuration avec Poppins",
    price: 15999,
    originalPrice: 17999,
    image: "/images/pc-gamer-example.jpg",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    components: [
      { type: 'CPU', name: 'Intel Core i7-13700F' },
      { type: 'GPU', name: 'NVIDIA RTX 4070 12GB' },
      { type: 'RAM', name: '32GB DDR5-5600' },
      { type: 'SSD', name: '1TB NVMe SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
      { type: 'Motherboard', name: 'MSI B760M Pro' },
      { type: 'PSU', name: '750W Gold+' }
    ]
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center font-poppins">
          ProductCard avec Poppins depuis globals.css
        </h1>
        
        {/* UTILISATION STANDARD - Navigation automatique vers /products/[id] */}
        <ProductCardPCGamer
          product={sampleProduct}
          onAddToCart={(id) => {
            console.log('Ajouter au panier avec Poppins (globals.css):', id);
            alert(`✅ Fonctionne avec font-poppins depuis globals.css !`);
          }}
        />

        {/* MESSAGE DE CONFIRMATION */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg font-poppins">
          <p className="text-green-800 text-sm text-center">
            ✅ Cette card utilise <code className="bg-green-100 px-1 rounded">font-poppins</code> depuis votre globals.css
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * CORRECTIONS APPORTÉES :
 * 
 * ✅ INTERFACE PCComponent :
 * - type: 'GPU' | 'Motherboard' | 'CPU' | 'RAM' | 'SSD' | 'PSU'
 * - Suppression des anciennes références
 * 
 * ✅ FONCTION getComponentIcon() :
 * - SSD: '/icons/ssd.svg' au lieu de Storage
 * - Maintien de PSU: '/icons/psu.svg'
 * 
 * ✅ EXEMPLE D'UTILISATION :
 * - { type: 'SSD', name: '1TB NVMe SSD' } au lieu de Storage
 * - Cohérence avec les nouvelles catégories
 * 
 * ✅ COMPATIBILITÉ TOTALE :
 * - Compatible avec ComponentsSection.tsx
 * - Compatible avec ProductCardComponent.tsx
 * - Plus d'erreurs TypeScript
 */