'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import ProductCardComponent from '@/components/products/ProductCardComponent';
import ProductCardPCGamer from '@/components/products/ProductCardPCGamer';
import FiltersSection from '@/components/filters/FiltersSection';

/**
 * CategoryPageClient - Version avec composant filtres séparé
 * - Largeur optimisée pour le container filtres (288px au lieu de 25%)
 * - Compteurs de produits conservés dans les filtres
 * - Composant FiltersSection réutilisable pour desktop et mobile
 * 
 * CORRECTION :
 * ✅ Interface PCComponent mise à jour avec les nouvelles catégories
 * ✅ Fonction convertToPCGamerProduct corrigée pour 'SSD' au lieu de 'Storage'
 * ✅ Type category corrigé pour ProductCardComponent
 */

// Interfaces (corrigées)
interface Category {
  slug: string;
  name: string;
  displayName: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
  subCategories?: SubCategory[];
  filters: CategoryFilter[];
}

interface SubCategory {
  slug: string;
  name: string;
  productCount: number;
}

interface CategoryFilter {
  type: 'brand' | 'price' | 'specs' | 'availability';
  name: string;
  options: FilterOption[];
}

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface CategoryProduct {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  inStock: boolean;
  stockQuantity: number;
  category: string;
  subCategory?: string;
  specifications: Record<string, string>;
  rating: number;
  reviewCount: number;
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

interface PCGamerProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  components: PCComponent[];
  inStock: boolean;
}

// ✅ INTERFACE CORRIGÉE
interface PCComponent {
  type: 'GPU' | 'Motherboard' | 'CPU' | 'RAM' | 'SSD' | 'PSU'; // ✅ INTERFACE CORRIGÉE
  name: string;
  icon?: string;
}

interface CategoryPageClientProps {
  category: Category;
  products: CategoryProduct[];
  totalCount: number;
  currentPage: number;
  currentSort: string;
  currentFilters: Record<string, string[]>;
}

const CategoryPageClient: React.FC<CategoryPageClientProps> = ({
  category,
  products: initialProducts,
  totalCount: initialTotalCount,
  currentPage: initialPage,
  currentSort: initialSort,
  currentFilters: initialFilters
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // États locaux
  const [products] = useState(initialProducts);
  const [totalCount] = useState(initialTotalCount);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // États des filtres et tri
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(initialFilters);
  const [sortBy, setSortBy] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const PRODUCTS_PER_PAGE = 24;
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  // Fonctions utilitaires
  const updateURL = (newFilters: Record<string, string[]>, newSort: string, newPage: number) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(','));
      }
    });
    
    if (newSort !== 'featured') {
      params.set('sort', newSort);
    }
    
    if (newPage > 1) {
      params.set('page', newPage.toString());
    }
    
    const newURL = params.toString() 
      ? `${pathname}?${params.toString()}`
      : pathname;
    
    router.push(newURL);
  };

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setLoading(true);
    
    const newFilters = { ...selectedFilters };
    
    if (!newFilters[filterType]) {
      newFilters[filterType] = [];
    }
    
    if (checked) {
      if (!newFilters[filterType].includes(value)) {
        newFilters[filterType].push(value);
      }
    } else {
      newFilters[filterType] = newFilters[filterType].filter(v => v !== value);
      if (newFilters[filterType].length === 0) {
        delete newFilters[filterType];
      }
    }
    
    setSelectedFilters(newFilters);
    setCurrentPage(1);
    updateURL(newFilters, sortBy, 1);
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleSortChange = (newSort: string) => {
    setLoading(true);
    setSortBy(newSort);
    setCurrentPage(1);
    updateURL(selectedFilters, newSort, 1);
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setLoading(true);
      setCurrentPage(page);
      updateURL(selectedFilters, sortBy, page);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const clearFilters = (filterType?: string) => {
    setLoading(true);
    
    if (filterType) {
      const newFilters = { ...selectedFilters };
      delete newFilters[filterType];
      setSelectedFilters(newFilters);
      updateURL(newFilters, sortBy, 1);
    } else {
      setSelectedFilters({});
      updateURL({}, sortBy, 1);
    }
    
    setCurrentPage(1);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // ✅ FONCTION CORRIGÉE
  const convertToPCGamerProduct = (product: CategoryProduct): PCGamerProduct => {
    const components: PCComponent[] = [];
    
    if (product.specifications['CPU'] || product.specifications['Processeur']) {
      components.push({
        type: 'CPU',
        name: product.specifications['CPU'] || product.specifications['Processeur']
      });
    }
    
    if (product.specifications['GPU'] || product.specifications['Carte Graphique']) {
      components.push({
        type: 'GPU',
        name: product.specifications['GPU'] || product.specifications['Carte Graphique']
      });
    }
    
    if (product.specifications['RAM'] || product.specifications['Mémoire']) {
      components.push({
        type: 'RAM',
        name: product.specifications['RAM'] || product.specifications['Mémoire']
      });
    }
    
    // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
    if (product.specifications['SSD'] || product.specifications['Stockage'] || product.specifications['Storage']) {
      components.push({
        type: 'SSD',
        name: product.specifications['SSD'] || product.specifications['Stockage'] || product.specifications['Storage']
      });
    }

    if (product.specifications['Motherboard'] || product.specifications['Carte Mère']) {
      components.push({
        type: 'Motherboard',
        name: product.specifications['Motherboard'] || product.specifications['Carte Mère']
      });
    }

    if (product.specifications['PSU'] || product.specifications['Alimentation']) {
      components.push({
        type: 'PSU',
        name: product.specifications['PSU'] || product.specifications['Alimentation']
      });
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      reviewCount: product.reviewCount,
      components: components,
      inStock: product.inStock
    };
  };

  // ✅ FONCTION DE CONVERSION POUR CATEGORY
  const getCategoryType = (categoryName: string): 'GPU' | 'Motherboard' | 'CPU' | 'RAM' | 'SSD' | 'PSU' => {
    const categoryMap: Record<string, 'GPU' | 'Motherboard' | 'CPU' | 'RAM' | 'SSD' | 'PSU'> = {
      'GPU': 'GPU',
      'Motherboard': 'Motherboard',
      'CPU': 'CPU',
      'RAM': 'RAM',
      'SSD': 'SSD',
      'PSU': 'PSU',
      // Mapping des anciens noms vers les nouveaux
      'Storage': 'SSD',
      'Peripherals': 'PSU', // ou une autre catégorie par défaut
      'Carte Mère': 'Motherboard',
      'Carte mère': 'Motherboard',
      'Stockage': 'SSD',
      'Alimentation': 'PSU'
    };
    
    return categoryMap[categoryName] || 'GPU'; // Valeur par défaut
  };

  const handleAddToCart = (productId: string) => {
    console.log('Ajout au panier:', productId);
    alert('Produit ajouté au panier !');
  };

  const handleViewDetails = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-gotham-book">
      
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/categories" className="text-gray-600 hover:text-orange-600 transition-colors">
              Catégories
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{category.displayName}</span>
          </nav>
        </div>
      </div>

      {/* CONTENU PRINCIPAL - LAYOUT OPTIMISÉ */}
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 py-8">
        <div className="flex gap-6">
          
          {/* COMPOSANT FILTRES (Largeur fixe optimisée) */}
          <FiltersSection
            filters={category.filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

          {/* CONTAINER PRODUITS (Flexible) */}
          <div className="flex-1 min-w-0">
            
            {/* TITRE ET DESCRIPTION + BARRE D'OUTILS */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              
              {/* TITRE ET DESCRIPTION */}
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {category.displayName}
                </h1>
                <p className="text-gray-600 text-lg">
                  {category.description}
                </p>
              </div>

              {/* BARRE D'OUTILS */}
              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  
                  {/* BOUTON FILTRES MOBILE + INFO */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                      <span>Filtres</span>
                      {Object.keys(selectedFilters).length > 0 && (
                        <span className="bg-orange-600 text-white text-xs rounded-full px-2 py-0.5">
                          {Object.values(selectedFilters).flat().length}
                        </span>
                      )}
                    </button>

                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{totalCount}</span> produits trouvés
                    </div>
                  </div>

                  {/* TRI ET VUE */}
                  <div className="flex items-center space-x-4">
                    {/* SÉLECTEUR DE TRI */}
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-700 whitespace-nowrap">Trier par :</label>
                      <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="featured">Recommandé</option>
                        <option value="name">Nom A-Z</option>
                        <option value="price-asc">Prix croissant</option>
                        <option value="price-desc">Prix décroissant</option>
                        <option value="rating">Mieux notés</option>
                        <option value="newest">Nouveautés</option>
                      </select>
                    </div>

                    {/* BOUTONS VUE */}
                    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* FILTRES ACTIFS */}
                {Object.keys(selectedFilters).length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gray-700">Filtres actifs :</span>
                      {Object.entries(selectedFilters).map(([filterType, values]) =>
                        values.map((value) => (
                          <button
                            key={`${filterType}-${value}`}
                            onClick={() => handleFilterChange(filterType, value, false)}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full hover:bg-orange-200 transition-colors"
                          >
                            <span>{value}</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        ))
                      )}
                      <button
                        onClick={() => clearFilters()}
                        className="text-sm text-gray-600 hover:text-red-600 ml-2"
                      >
                        Tout effacer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ÉTAT DE CHARGEMENT */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                <span className="ml-3 text-gray-600">Chargement des produits...</span>
              </div>
            )}

            {/* GRILLE DE PRODUITS */}
            {!loading && (
              <>
                {products.length > 0 ? (
                  <div className={`grid gap-4 lg:gap-6 mb-8 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                      : 'grid-cols-1'
                  }`}>
                    {products.map((product) => (
                      <div key={product.id}>
                        {category.name === 'PCGamer' ? (
                          <ProductCardPCGamer
                            product={convertToPCGamerProduct(product)}
                            onAddToCart={handleAddToCart}
                            onViewDetails={handleViewDetails}
                          />
                        ) : (
                          <ProductCardComponent
                            product={{
                              id: product.id,
                              name: product.name,
                              brand: product.brand,
                              price: product.price,
                              originalPrice: product.originalPrice,
                              image: product.image,
                              inStock: product.inStock,
                              category: getCategoryType(category.name), // ✅ CORRIGÉ : Utilise la fonction de conversion
                              specifications: product.specifications
                            }}
                            onAddToCart={handleAddToCart}
                            onViewDetails={handleViewDetails}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
                    <p className="text-gray-600 mb-4">
                      Essayez de modifier vos filtres ou d&apos;élargir votre recherche.
                    </p>
                    <button
                      onClick={() => clearFilters()}
                      className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Effacer tous les filtres
                    </button>
                  </div>
                )}
              </>
            )}

            {/* PAGINATION */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Précédent
                </button>

                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (currentPage <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = currentPage - 3 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        pageNum === currentPage
                          ? 'bg-orange-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Suivant
                </button>
              </div>
            )}

            {/* INFO PAGINATION */}
            {!loading && products.length > 0 && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Affichage de {(currentPage - 1) * PRODUCTS_PER_PAGE + 1} à {' '}
                {Math.min(currentPage * PRODUCTS_PER_PAGE, totalCount)} sur {totalCount} produits
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SIDEBAR FILTRES MOBILE - Utilise le composant FiltersSection */}
      <FiltersSection
        filters={category.filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        isMobile={true}
        showFilters={showFilters}
        onCloseFilters={() => setShowFilters(false)}
      />
    </div>
  );
};

export default CategoryPageClient;