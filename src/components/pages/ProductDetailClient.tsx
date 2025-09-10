// src/components/pages/ProductDetailClient.tsx - Composant principal refactorisé
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComponentProduct, ProductDetailClientProps } from '@/types/product';

// Import des composants décomposés
import Breadcrumb from '@/components/product/Breadcrumb';
import ImageGallery from '@/components/product/ImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductDescription from '@/components/product/ProductDescription';
import RelatedProducts from '@/components/product/RelatedProducts';

/**
 * ProductDetailClient - Composant principal refactorisé et modulaire
 * 
 * ARCHITECTURE DÉCOMPOSÉE :
 * ✅ Breadcrumb - Navigation hiérarchique
 * ✅ ImageGallery - Galerie d'images avec sélection
 * ✅ ProductInfo - Informations produit et actions d'achat
 * ✅ ProductDescription - Description détaillée avec sections
 * ✅ RelatedProducts - Produits similaires
 * 
 * AVANTAGES DE LA DÉCOMPOSITION :
 * - Code plus lisible et maintenable
 * - Composants réutilisables
 * - Tests unitaires facilités
 * - Séparation des responsabilités
 * - Performance optimisée (re-render ciblé)
 */
const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts = []
}) => {
  const router = useRouter();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Calcul du pourcentage de réduction
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Gestion ajout au panier avec quantité
  const handleAddToCart = async (quantity: number) => {
    setIsAddingToCart(true);
    
    try {
      // TODO: Intégrer avec votre système de panier
      console.log('Ajout au panier:', {
        productId: product.id,
        quantity: quantity,
        totalPrice: product.price * quantity
      });
      
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Feedback utilisateur (remplacer par toast notification)
      alert(`${product.name} ajouté au panier !`);
      
    } catch (error) {
      console.error('Erreur ajout panier:', error);
      alert('Erreur lors de l\'ajout au panier');
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Gestion ajout aux favoris
  const handleAddToWishlist = () => {
    // TODO: Intégrer avec votre système de favoris
    console.log('Ajout aux favoris:', product.id);
    alert(`${product.name} ajouté aux favoris !`);
  };

  // Navigation vers produit similaire
  const handleRelatedProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen bg-white font-gotham-book">
      
      {/* BREADCRUMB - Composant séparé */}
      <Breadcrumb product={product} />

      {/* SECTION PRINCIPALE */}
      <div className="py-8 lg:py-12">
        <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* GALERIE D'IMAGES - Composant séparé */}
            <ImageGallery 
              images={product.images}
              productName={product.name}
              discountPercentage={discountPercentage}
              inStock={product.inStock}
            />

            {/* INFORMATIONS PRODUIT - Composant séparé */}
            <ProductInfo 
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              isAddingToCart={isAddingToCart}
            />
          </div>
        </div>
      </div>

      {/* DESCRIPTION DÉTAILLÉE - Composant séparé */}
      <ProductDescription product={product} />

      {/* PRODUITS SIMILAIRES - Composant séparé */}
      <RelatedProducts 
        products={relatedProducts}
        onProductClick={handleRelatedProductClick}
      />
    </div>
  );
};

export default ProductDetailClient;

/**
 * BÉNÉFICES DE LA DÉCOMPOSITION :
 * 
 * 🎯 MAINTENABILITÉ :
 * - Chaque composant a une responsabilité unique
 * - Facilite les modifications et corrections
 * - Code plus lisible et organisé
 * 
 * 🔄 RÉUTILISABILITÉ :
 * - ImageGallery peut être utilisé ailleurs
 * - ProductInfo réutilisable pour autres pages
 * - RelatedProducts adaptable à d'autres contextes
 * 
 * ⚡ PERFORMANCE :
 * - Re-render ciblé (seul le composant modifié se met à jour)
 * - Bundle splitting possible
 * - Lazy loading par composant
 * 
 * 🧪 TESTABILITÉ :
 * - Tests unitaires par composant
 * - Mocking plus facile
 * - Isolation des bugs
 * 
 * 👥 COLLABORATION :
 * - Développeurs peuvent travailler sur composants séparés
 * - Conflits git réduits
 * - Responsabilités claires
 */