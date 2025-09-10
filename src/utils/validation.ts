// src/utils/validation.ts - Version corrigée avec types appropriés
/**
 * Interface définissant la structure minimale d'un produit
 */
export interface ProductData {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description?: string;
  stock?: number;
  inStock?: boolean;
}

/**
 * Valide la quantité demandée par rapport au stock disponible
 * @param quantity - Quantité demandée
 * @param maxStock - Stock maximum disponible
 * @returns true si la quantité est valide
 */
export const validateQuantity = (quantity: number, maxStock: number): boolean => {
  // Vérification des types et valeurs
  if (!Number.isInteger(quantity) || !Number.isInteger(maxStock)) {
    return false;
  }
  
  return quantity >= 1 && quantity <= maxStock;
};

/**
 * Valide qu'un objet produit contient tous les champs requis
 * @param product - Objet produit à valider
 * @returns true si le produit est valide
 */
export const validateProductData = (product: unknown): product is ProductData => {
  // Vérification que l'objet existe et est bien un objet
  if (!product || typeof product !== 'object') {
    return false;
  }
  
  const productObj = product as Record<string, unknown>;
  const requiredFields: (keyof ProductData)[] = ['id', 'name', 'price', 'category', 'images'];
  
  // Vérification de la présence de tous les champs requis
  const hasAllFields = requiredFields.every(field => 
    productObj[field] !== null && 
    productObj[field] !== undefined
  );
  
  if (!hasAllFields) {
    return false;
  }
  
  // Vérifications spécifiques par type de champ
  const typedProduct = productObj as unknown as ProductData;
  
  return (
    typeof typedProduct.id === 'string' && typedProduct.id.length > 0 &&
    typeof typedProduct.name === 'string' && typedProduct.name.length > 0 &&
    typeof typedProduct.price === 'number' && typedProduct.price >= 0 &&
    typeof typedProduct.category === 'string' && typedProduct.category.length > 0 &&
    Array.isArray(typedProduct.images) && typedProduct.images.length > 0 &&
    typedProduct.images.every(img => typeof img === 'string')
  );
};

/**
 * Valide une adresse email
 * @param email - Email à valider
 * @returns true si l'email est valide
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone marocain
 * @param phone - Numéro de téléphone à valider
 * @returns true si le numéro est valide
 */
export const validateMoroccanPhone = (phone: string): boolean => {
  // Format accepté: +212XXXXXXXXX ou 0XXXXXXXXX
  const phoneRegex = /^(\+212|0)[5-7]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};