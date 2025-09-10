
// src/utils/formatters.ts - Fonctions utilitaires de formatage
export const formatPrice = (price: number, currency: string = 'DH'): string => {
  return `${price.toLocaleString('fr-FR')} ${currency}`;
};

export const formatDiscount = (originalPrice: number, currentPrice: number): number => {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatStock = (quantity: number, inStock: boolean): string => {
  if (!inStock) return 'Rupture de stock';
  if (quantity <= 5) return `Plus que ${quantity} en stock`;
  return `En stock (${quantity} disponibles)`;
};

export const formatShippingTime = (inStock: boolean): string => {
  if (!inStock) return 'Non disponible';
  return 'Livraison 24-48h';
};