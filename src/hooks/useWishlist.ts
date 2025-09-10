// src/hooks/useWishlist.ts
import { useState, useCallback } from 'react';
import { ComponentProduct, ApiResponse } from '@/types/product';

/**
 * Hook personnalisé pour la gestion des favoris
 * 
 * @description Ce hook gère l'ajout et la suppression de produits dans la wishlist
 * avec gestion d'état de chargement, d'erreurs et tracking analytics
 * 
 * @returns {Object} Objet contenant les fonctions et états du hook
 * @returns {Function} addToWishlist - Ajoute un produit aux favoris
 * @returns {Function} removeFromWishlist - Supprime un produit des favoris
 * @returns {boolean} isLoading - État de chargement des requêtes
 * @returns {string|null} error - Message d'erreur éventuel
 * @returns {Function} clearError - Fonction pour effacer l'erreur
 */
export const useWishlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Ajoute un produit à la wishlist
   * 
   * @param {ComponentProduct} product - Le produit à ajouter aux favoris
   * @returns {Promise<boolean>} True si l'ajout réussit, false sinon
   */
  const addToWishlist = useCallback(async (product: ComponentProduct): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Appel API pour ajouter aux favoris
      const response = await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id
        })
      });

      // Vérification du status HTTP
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result: ApiResponse<void> = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'ajout aux favoris');
      }

      // Analytics tracking avec la nouvelle interface typée
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'add_to_wishlist', {
          currency: 'MAD',
          value: product.price,
          items: [{
            item_id: product.id,
            item_name: product.name,
            item_brand: product.brand,
            item_category: product.category,
            quantity: 1, // Requis pour l'interface GtagItem
            price: product.price
          }]
        });
      }

      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur ajout favoris:', {
        error: err,
        product: product.id,
        timestamp: new Date().toISOString()
      });
      return false;

    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Supprime un produit de la wishlist
   * 
   * @param {string} productId - ID du produit à supprimer
   * @returns {Promise<boolean>} True si la suppression réussit, false sinon
   */
  const removeFromWishlist = useCallback(async (productId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Appel API pour supprimer des favoris
      const response = await fetch(`/api/wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Vérification du status HTTP
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result: ApiResponse<void> = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la suppression');
      }

      // Analytics tracking pour suppression (optionnel)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'remove_from_wishlist', {
          currency: 'MAD',
          items: [{
            item_id: productId,
            item_name: 'Produit supprimé des favoris',
            quantity: 1,
            price: 0 // Prix inconnu lors de la suppression
          }]
        });
      }

      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur suppression favoris:', {
        error: err,
        productId,
        timestamp: new Date().toISOString()
      });
      return false;

    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Efface le message d'erreur
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    addToWishlist,
    removeFromWishlist,
    isLoading,
    error,
    clearError
  } as const; // 'as const' pour un meilleur typage en lecture seule
};

// ==========================================
// VERSION ALTERNATIVE avec hook Google Analytics séparé

// Si vous préférez utiliser le hook useGoogleAnalytics séparé :

/*
import { useState, useCallback } from 'react';
import { ComponentProduct, ApiResponse } from '@/types/product';
import { useGoogleAnalytics } from './useGoogleAnalytics';

export const useWishlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackEvent } = useGoogleAnalytics();

  const addToWishlist = useCallback(async (product: ComponentProduct): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result: ApiResponse<void> = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'ajout aux favoris');
      }

      // Analytics avec hook séparé
      trackEvent('add_to_wishlist', {
        currency: 'MAD',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          quantity: 1,
          price: product.price
        }]
      });

      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur ajout favoris:', err);
      return false;

    } finally {
      setIsLoading(false);
    }
  }, [trackEvent]);

  const removeFromWishlist = useCallback(async (productId: string): Promise<boolean> => {
    // ... même logique que ci-dessus
    
    return {
      addToWishlist,
      removeFromWishlist,
      isLoading,
      error,
      clearError: () => setError(null)
    } as const;
  };
};
*/

// ==========================================
// Types supplémentaires pour une meilleure intégration

/**
 * Interface pour les paramètres de la wishlist
 */
export interface WishlistParams {
  productId: string;
  userId?: string; // Optionnel si vous avez un système d'utilisateurs
  timestamp?: string;
}

/**
 * Interface pour la réponse de l'API wishlist
 */
export interface WishlistResponse extends ApiResponse<void> {
  wishlistCount?: number; // Nombre total d'items dans la wishlist
}

/**
 * Hook avec gestion d'utilisateur (exemple avancé)
 */
/*
export const useWishlistWithUser = (userId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wishlistCount, setWishlistCount] = useState(0);

  const addToWishlist = useCallback(async (product: ComponentProduct): Promise<boolean> => {
    if (!userId) {
      setError('Utilisateur non connecté');
      return false;
    }

    // ... logique similaire avec userId
    
  }, [userId]);

  // ... autres méthodes

  return {
    addToWishlist,
    removeFromWishlist,
    isLoading,
    error,
    wishlistCount,
    clearError: () => setError(null)
  } as const;
};
*/