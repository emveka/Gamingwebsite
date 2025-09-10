// src/components/product/index.ts - Export central pour faciliter les imports
export { default as Breadcrumb } from './Breadcrumb';
export { default as ImageGallery } from './ImageGallery';
export { default as ProductInfo } from './ProductInfo';
export { default as PCGamerSection } from './PCGamerSection';
export { default as ProductDescription } from './ProductDescription';
export { default as RelatedProducts } from './RelatedProducts';

// Exemple d'usage avec imports groupés :
// import { ImageGallery, ProductInfo } from '@/components/product';

/**
 * INTÉGRATION AVEC VOTRE API :
 * 
 * 1. Remplacez les données mockées dans page.tsx par vos vrais appels API
 * 2. Adaptez les types dans product.ts selon votre structure de données
 * 3. Configurez les hooks useCart et useWishlist avec vos endpoints
 * 4. Intégrez les fonctions analytics avec vos outils de tracking
 */