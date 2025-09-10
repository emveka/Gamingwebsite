// src/hooks/useCart.ts
import { useState, useCallback } from 'react';
import { ComponentProduct, CartItem, ApiResponse } from '@/types/product';

/**
 * Hook personnalisé pour la gestion du panier
 */
export const useCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = useCallback(async (
    product: ComponentProduct, 
    quantity: number
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Remplacer par votre endpoint API
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          price: product.price
        })
      });

      const result: ApiResponse<CartItem> = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'ajout au panier');
      }

      // Analytics tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'add_to_cart', {
          currency: 'MAD',
          value: product.price * quantity,
          items: [{
            item_id: product.id,
            item_name: product.name,
            item_brand: product.brand,
            item_category: product.category,
            quantity: quantity,
            price: product.price
          }]
        });
      }

      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur ajout panier:', err);
      return false;

    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (productId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Remplacer par votre endpoint API
      const response = await fetch(`/api/cart/remove/${productId}`, {
        method: 'DELETE'
      });

      const result: ApiResponse<void> = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la suppression');
      }

      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur suppression panier:', err);
      return false;

    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    addToCart,
    removeFromCart,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};