// src/components/product/ProductInfo.tsx
'use client'
import React, { useState } from 'react';
import { ComponentProduct } from '@/types/product';

interface ProductInfoProps {
  product: ComponentProduct;
  onAddToCart: (quantity: number) => Promise<void>;
  onAddToWishlist: () => void;
  isAddingToCart: boolean;
}

/**
 * Composant ProductInfo - Informations et actions produit
 * 
 * FONCTIONNALITÉS :
 * - Affichage des prix avec réductions
 * - Gestion des quantités
 * - Actions d'achat et favoris
 * - Statut de stock en temps réel
 * - Informations complémentaires (garantie, livraison)
 */
const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  isAddingToCart
}) => {
  const [quantity, setQuantity] = useState(1);

  // Calcul du pourcentage de réduction
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Formatage des prix
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' DH';
  };

  // Gestion de la quantité
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  // Ajout au panier avec la quantité sélectionnée
  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  // Fonction de partage native
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ 
        title: product.name, 
        url: window.location.href 
      });
    } else {
      // Fallback pour navigateurs non compatibles
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* MARQUE ET CATÉGORIE */}
      <div className="flex items-center justify-between">
        <span className="text-orange-600 font-bold text-sm uppercase tracking-wide">
          {product.brand}
        </span>
        <span className="text-gray-500 text-sm px-3 py-1 bg-gray-100 rounded-full">
          {product.category}
        </span>
      </div>

      {/* NOM DU PRODUIT */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <p className="text-gray-600 font-medium">
          Modèle: {product.model}
        </p>
      </div>

      {/* PRIX */}
      <div className="border-t border-b border-gray-200 py-4">
        <div className="flex items-baseline space-x-4">
          <span className="text-3xl lg:text-4xl font-bold text-red-500">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-green-600 font-bold">
                Économisez {formatPrice(product.originalPrice - product.price)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* STOCK ET DISPONIBILITÉ */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? `En stock (${product.stockQuantity} disponibles)` : 'Rupture de stock'}
          </span>
        </div>
        
        {product.inStock && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Livraison rapide 24-48h</span>
          </div>
        )}
      </div>

      {/* SÉLECTEUR DE QUANTITÉ ET BOUTONS */}
      {product.inStock && (
        <div className="space-y-4">
          {/* QUANTITÉ */}
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Quantité:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-4 py-2 text-gray-900 font-medium border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stockQuantity}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* BOUTONS D'ACTION */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`w-full py-3 px-6 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 ${
                isAddingToCart
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {isAddingToCart 
                ? 'Ajout en cours...' 
                : `Ajouter au panier - ${formatPrice(product.price * quantity)}`
              }
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onAddToWishlist}
                className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:border-orange-600 hover:text-orange-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Favoris</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:border-orange-600 hover:text-orange-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INFORMATIONS COMPLÉMENTAIRES */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>Garantie constructeur: {product.warranty}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>Support technique inclus</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-2H1m6 20a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z"/>
          </svg>
          <span>Livraison gratuite dès 800 DH</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;