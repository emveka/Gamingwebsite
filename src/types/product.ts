// src/types/product.ts - Types corrigés et étendus

/**
 * Interface principale pour un produit composant
 */
export interface ComponentProduct {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  originalPrice?: number;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  category: 'PCGamer' | 'GPU' | 'CPU' | 'RAM' | 'Storage' | 'Motherboard' | 'Peripherals';
  specifications: Record<string, string>;
  description: string;
  features: string[];
  warranty: string;
  compatibility?: string[];
  videoUrl?: string;
}

/**
 * Props pour le composant ProductDetailClient
 */
export interface ProductDetailClientProps {
  product: ComponentProduct;
  relatedProducts: ComponentProduct[];
}

/**
 * Interface pour les actions du panier
 */
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

/**
 * Interface pour les réponses API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Types pour les catégories de produits
 */
export type ProductCategory = ComponentProduct['category'];

/**
 * Interface pour les filtres de recherche
 */
export interface ProductFilters {
  category?: ProductCategory;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  features?: string[];
}

/**
 * Interface pour les métadonnées de pagination
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Interface pour les résultats de recherche paginés
 */
export interface ProductSearchResult {
  products: ComponentProduct[];
  meta: PaginationMeta;
  filters?: ProductFilters;
}