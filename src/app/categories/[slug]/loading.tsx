// app/categories/[slug]/loading.tsx - Page de chargement adaptée au nouveau layout
import React from 'react';

/**
 * Loading UI pour la page catégorie - Version adaptée
 * Reflète exactement la nouvelle structure avec FiltersSection séparé
 * 
 * FONCTIONNALITÉS :
 * ✅ Skeleton identique à la structure finale optimisée
 * ✅ Container filtres w-56 (224px) 
 * ✅ Pas de section disponibilité
 * ✅ Animation de chargement fluide  
 * ✅ Responsive design cohérent
 */

const CategoryLoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-gotham-book">
      
      {/* BREADCRUMB SKELETON */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-1"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-3 bg-gray-200 rounded w-1"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </nav>
        </div>
      </div>

      {/* CONTENU PRINCIPAL - NOUVEAU LAYOUT */}
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 py-8">
        <div className="flex gap-6">
          
          {/* CONTAINER FILTRES SKELETON (w-56) */}
          <div className="w-56 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              
              {/* Header Filtres */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>

              {/* Filtres dynamiques skeleton (3 sections) */}
              {[1, 2, 3].map((section, index) => (
                <div 
                  key={section} 
                  className={`${index < 2 ? 'border-b border-gray-200' : ''} animate-pulse`}
                >
                  <div className="p-4">
                    {/* Titre du filtre */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-3 bg-gray-200 rounded w-12"></div>
                    </div>
                    
                    {/* Options de filtre */}
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center">
                          <div className="w-4 h-4 bg-gray-200 rounded"></div>
                          <div className="ml-3 h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTAINER PRODUITS (flex-1) */}
          <div className="flex-1 min-w-0">
            
            {/* TITRE ET BARRE D'OUTILS SKELETON */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              
              {/* Titre et description */}
              <div className="p-6 border-b border-gray-200 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-96"></div>
              </div>

              {/* Barre d'outils */}
              <div className="p-4 animate-pulse">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  
                  {/* Bouton filtres mobile + info */}
                  <div className="flex items-center space-x-4">
                    <div className="lg:hidden h-10 bg-gray-200 rounded-lg w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>

                  {/* Tri et vue */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-200 rounded-lg p-1 w-20 h-10"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* GRILLE DE PRODUITS SKELETON */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
                  
                  {/* Image skeleton */}
                  <div className="aspect-square bg-gray-200"></div>
                  
                  {/* Contenu skeleton */}
                  <div className="p-4">
                    {/* Marque */}
                    <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                    
                    {/* Nom produit */}
                    <div className="space-y-1 mb-3">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>

                    {/* Spécifications */}
                    <div className="mb-4 space-y-2">
                      {[1, 2, 3].map((spec) => (
                        <div key={spec} className="h-3 bg-gray-200 rounded w-full"></div>
                      ))}
                    </div>

                    {/* Prix */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>

                    {/* Bouton */}
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION SKELETON */}
            <div className="flex items-center justify-center space-x-2 mt-8 animate-pulse">
              <div className="h-10 bg-gray-200 rounded-lg w-20"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 w-10 bg-gray-200 rounded-lg"></div>
              ))}
              <div className="h-10 bg-gray-200 rounded-lg w-20"></div>
            </div>

            {/* INFO PAGINATION SKELETON */}
            <div className="text-center mt-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryLoadingPage;

/**
 * ADAPTATIONS APPORTÉES :
 * 
 * 1. STRUCTURE LAYOUT
 * ✅ Flex layout avec gap-6 (comme CategoryPageClient)
 * ✅ Container filtres w-56 (224px exact)
 * ✅ Container produits flex-1 min-w-0
 * 
 * 2. FILTRES SKELETON
 * ✅ Suppression section disponibilité
 * ✅ 3 sections de filtres dynamiques seulement
 * ✅ Pas de compteurs dans les options
 * ✅ Structure identique au FiltersSection
 * 
 * 3. OPTIMISATIONS
 * ✅ Classes font-gotham-book cohérentes
 * ✅ Animations animate-pulse fluides
 * ✅ Breakpoints responsive identiques
 * ✅ Proportions exactes des vrais composants
 * 
 * PLACEMENT DU FICHIER :
 * app/categories/[slug]/loading.tsx
 */