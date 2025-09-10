// src/utils/analytics.ts - Version corrigée avec types appropriés
interface GtagEventParams {
  currency?: string;
  value?: number;
  items?: Array<{
    item_id: string;
    item_name: string;
    category?: string;
    quantity?: number;
    price?: number;
  }>;
}

// Fonction helper pour vérifier si gtag est disponible
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.gtag === 'function';
};

/**
 * Suit la vue d'un produit pour les analytics
 * @param productId - ID unique du produit
 * @param productName - Nom du produit affiché
 */
export const trackProductView = (productId: string, productName: string): void => {
  // Vérification de la disponibilité de gtag avant utilisation
  if (isGtagAvailable()) {
    const params: GtagEventParams = {
      currency: 'MAD',
      value: 0, // Prix du produit - à mettre à jour si disponible
      items: [{
        item_id: productId,
        item_name: productName,
        category: 'product'
      }]
    };
    
    window.gtag!('event', 'view_item', params);
  }
  
  // Log pour le débogage en développement
  if (process.env.NODE_ENV === 'development') {
    console.log('Product viewed:', { productId, productName });
  }
};

/**
 * Suit l'ajout d'un produit au panier
 * @param productId - ID unique du produit
 * @param productName - Nom du produit
 * @param price - Prix unitaire du produit
 * @param quantity - Quantité ajoutée au panier
 */
export const trackAddToCart = (
  productId: string, 
  productName: string, 
  price: number, 
  quantity: number
): void => {
  if (isGtagAvailable()) {
    const params: GtagEventParams = {
      currency: 'MAD',
      value: price * quantity,
      items: [{
        item_id: productId,
        item_name: productName,
        category: 'product',
        quantity: quantity,
        price: price
      }]
    };
    
    window.gtag!('event', 'add_to_cart', params);
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Added to cart:', { productId, productName, price, quantity });
  }
};

/**
 * Suit l'ajout d'un produit à la liste de souhaits
 * @param productId - ID unique du produit
 * @param productName - Nom du produit
 */
export const trackAddToWishlist = (productId: string, productName: string): void => {
  if (isGtagAvailable()) {
    const params: GtagEventParams = {
      currency: 'MAD',
      value: 0,
      items: [{
        item_id: productId,
        item_name: productName,
        category: 'product'
      }]
    };
    
    window.gtag!('event', 'add_to_wishlist', params);
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Added to wishlist:', { productId, productName });
  }
};