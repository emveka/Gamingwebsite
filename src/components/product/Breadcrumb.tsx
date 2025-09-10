// src/components/product/Breadcrumb.tsx
'use client'
import React from 'react';
import Link from 'next/link';
import { ComponentProduct } from '@/types/product';

interface BreadcrumbProps {
  product: ComponentProduct;
}

/**
 * Composant Breadcrumb - Navigation hiérarchique
 * 
 * FONCTIONNALITÉS :
 * - Navigation par catégories
 * - Liens Next.js optimisés
 * - Style responsive
 * - Séparateurs visuels
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({ product }) => {
  return (
    <div className="bg-gray-50 py-4">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
            Accueil
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/composants" className="text-gray-600 hover:text-orange-600 transition-colors">
            Composants
          </Link>
          <span className="text-gray-400">/</span>
          <Link 
            href={`/composants/${product.category.toLowerCase()}`} 
            className="text-gray-600 hover:text-orange-600 transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;