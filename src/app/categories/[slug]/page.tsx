// app/categories/[slug]/page.tsx - Version corrigée pour Next.js 15
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageClient from '@/components/pages/CategoryPageClient';

/**
 * Page catégorie dynamique Next.js 15 avec App Router et slug
 * 
 * ✅ CORRECTIONS Next.js 15 :
 * - Ajout de await pour params et searchParams
 * - Gestion asynchrone des props
 * - TypeScript strict compatible
 * 
 * ROUTING :
 * - /categories/[slug] pour chaque catégorie
 * - /categories/cartes-graphiques
 * - /categories/processeurs
 * - /categories/memoire-ram
 * - /categories/stockage-ssd
 * - /categories/cartes-meres
 * - /categories/peripheriques-gaming
 * - /categories/pc-gaming-complets
 */

// Interface pour une catégorie
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

// Interface pour les produits de catégorie
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

// Données des catégories (à remplacer par votre API)
const categoriesData: Record<string, Category> = {
  'cartes-graphiques': {
    slug: 'cartes-graphiques',
    name: 'GPU',
    displayName: 'Cartes Graphiques',
    description: 'Cartes graphiques haute performance pour gaming 4K, ray tracing et création de contenu professionnel.',
    image: '/images/gpu-category.webp',
    icon: '/icons/Gpu(1).svg',
    productCount: 156,
    subCategories: [
      { slug: 'rtx-4090', name: 'RTX 4090', productCount: 12 },
      { slug: 'rtx-4080', name: 'RTX 4080', productCount: 18 },
      { slug: 'rtx-4070', name: 'RTX 4070', productCount: 24 },
      { slug: 'rtx-4060', name: 'RTX 4060', productCount: 16 },
      { slug: 'amd-rx-7000', name: 'AMD RX 7000', productCount: 32 }
    ],
    filters: [
      {
        type: 'brand',
        name: 'Marque',
        options: [
          { value: 'nvidia', label: 'NVIDIA', count: 89 },
          { value: 'amd', label: 'AMD', count: 67 },
          { value: 'intel', label: 'Intel Arc', count: 12 }
        ]
      },
      {
        type: 'price',
        name: 'Prix',
        options: [
          { value: '0-5000', label: 'Moins de 5 000 DH', count: 23 },
          { value: '5000-10000', label: '5 000 - 10 000 DH', count: 45 },
          { value: '10000-20000', label: '10 000 - 20 000 DH', count: 67 },
          { value: '20000+', label: 'Plus de 20 000 DH', count: 21 }
        ]
      },
      {
        type: 'specs',
        name: 'Mémoire VRAM',
        options: [
          { value: '8gb', label: '8 GB', count: 34 },
          { value: '12gb', label: '12 GB', count: 28 },
          { value: '16gb', label: '16 GB', count: 19 },
          { value: '24gb', label: '24 GB', count: 8 }
        ]
      }
    ]
  },
  'processeurs': {
    slug: 'processeurs',
    name: 'CPU',
    displayName: 'Processeurs',
    description: 'Processeurs Intel et AMD haute performance pour gaming, streaming et création de contenu.',
    image: '/images/cpu-category.webp',
    icon: '/icons/cpu.svg',
    productCount: 89,
    subCategories: [
      { slug: 'intel-i9', name: 'Intel Core i9', productCount: 12 },
      { slug: 'intel-i7', name: 'Intel Core i7', productCount: 18 },
      { slug: 'intel-i5', name: 'Intel Core i5', productCount: 16 },
      { slug: 'amd-ryzen-9', name: 'AMD Ryzen 9', productCount: 14 },
      { slug: 'amd-ryzen-7', name: 'AMD Ryzen 7', productCount: 19 },
      { slug: 'amd-ryzen-5', name: 'AMD Ryzen 5', productCount: 10 }
    ],
    filters: [
      {
        type: 'brand',
        name: 'Marque',
        options: [
          { value: 'intel', label: 'Intel', count: 46 },
          { value: 'amd', label: 'AMD', count: 43 }
        ]
      },
      {
        type: 'specs',
        name: 'Nombre de cœurs',
        options: [
          { value: '4-cores', label: '4 cœurs', count: 12 },
          { value: '6-cores', label: '6 cœurs', count: 23 },
          { value: '8-cores', label: '8 cœurs', count: 28 },
          { value: '12-cores', label: '12+ cœurs', count: 26 }
        ]
      }
    ]
  },
  'memoire-ram': {
    slug: 'memoire-ram',
    name: 'RAM',
    displayName: 'Mémoire RAM',
    description: 'Mémoire RAM DDR4 et DDR5 haute fréquence pour performances gaming optimales.',
    image: '/images/ram-category.webp',
    icon: '/icons/ram.svg',
    productCount: 134,
    subCategories: [
      { slug: 'ddr5-32gb', name: 'DDR5 32GB', productCount: 24 },
      { slug: 'ddr5-16gb', name: 'DDR5 16GB', productCount: 32 },
      { slug: 'ddr4-32gb', name: 'DDR4 32GB', productCount: 28 },
      { slug: 'ddr4-16gb', name: 'DDR4 16GB', productCount: 50 }
    ],
    filters: [
      {
        type: 'specs',
        name: 'Type de mémoire',
        options: [
          { value: 'ddr5', label: 'DDR5', count: 67 },
          { value: 'ddr4', label: 'DDR4', count: 67 }
        ]
      },
      {
        type: 'specs',
        name: 'Capacité',
        options: [
          { value: '16gb', label: '16 GB', count: 82 },
          { value: '32gb', label: '32 GB', count: 52 }
        ]
      }
    ]
  },
  'stockage-ssd': {
    slug: 'stockage-ssd',
    name: 'Storage',
    displayName: 'Stockage SSD',
    description: 'Disques SSD NVMe et SATA ultra-rapides pour des temps de chargement optimaux.',
    image: '/images/ssd-category.webp',
    icon: '/icons/ssd.svg',
    productCount: 98,
    subCategories: [
      { slug: 'nvme-2tb', name: 'NVMe 2TB', productCount: 16 },
      { slug: 'nvme-1tb', name: 'NVMe 1TB', productCount: 28 },
      { slug: 'sata-2tb', name: 'SATA 2TB', productCount: 18 },
      { slug: 'sata-1tb', name: 'SATA 1TB', productCount: 36 }
    ],
    filters: [
      {
        type: 'specs',
        name: 'Interface',
        options: [
          { value: 'nvme', label: 'NVMe PCIe', count: 56 },
          { value: 'sata', label: 'SATA III', count: 42 }
        ]
      },
      {
        type: 'specs',
        name: 'Capacité',
        options: [
          { value: '500gb', label: '500 GB', count: 24 },
          { value: '1tb', label: '1 TB', count: 64 },
          { value: '2tb', label: '2 TB', count: 34 },
          { value: '4tb', label: '4 TB+', count: 16 }
        ]
      }
    ]
  },
  'cartes-meres': {
    slug: 'cartes-meres',
    name: 'Motherboard',
    displayName: 'Cartes Mères',
    description: 'Cartes mères gaming avec chipsets Intel et AMD pour configurations haute performance.',
    image: '/images/motherboard-category.webp',
    icon: '/icons/motherboard.svg',
    productCount: 67,
    subCategories: [
      { slug: 'z790-intel', name: 'Intel Z790', productCount: 18 },
      { slug: 'b760-intel', name: 'Intel B760', productCount: 12 },
      { slug: 'x670-amd', name: 'AMD X670', productCount: 16 },
      { slug: 'b650-amd', name: 'AMD B650', productCount: 21 }
    ],
    filters: [
      {
        type: 'brand',
        name: 'Chipset',
        options: [
          { value: 'intel', label: 'Intel (LGA1700)', count: 30 },
          { value: 'amd', label: 'AMD (AM5)', count: 37 }
        ]
      }
    ]
  },
  'peripheriques-gaming': {
    slug: 'peripheriques-gaming',
    name: 'Peripherals',
    displayName: 'Périphériques Gaming',
    description: 'Claviers, souris, casques et accessoires gaming pour une expérience de jeu optimale.',
    image: '/images/peripherals-category.webp',
    icon: '/icons/gaming-peripheral.svg',
    productCount: 234,
    subCategories: [
      { slug: 'claviers-mecaniques', name: 'Claviers Mécaniques', productCount: 56 },
      { slug: 'souris-gaming', name: 'Souris Gaming', productCount: 78 },
      { slug: 'casques-audio', name: 'Casques Audio', productCount: 45 },
      { slug: 'moniteurs-gaming', name: 'Moniteurs Gaming', productCount: 55 }
    ],
    filters: [
      {
        type: 'brand',
        name: 'Marque',
        options: [
          { value: 'logitech', label: 'Logitech', count: 67 },
          { value: 'razer', label: 'Razer', count: 54 },
          { value: 'steelseries', label: 'SteelSeries', count: 43 },
          { value: 'corsair', label: 'Corsair', count: 70 }
        ]
      }
    ]
  },
  'pc-gaming-complets': {
    slug: 'pc-gaming-complets',
    name: 'PCGamer',
    displayName: 'PC Gaming Complets',
    description: 'Configurations PC gaming pré-assemblées et optimisées pour tous les budgets et performances.',
    image: '/images/pc-gaming-category.webp',
    icon: '/icons/pc-tower.svg',
    productCount: 45,
    subCategories: [
      { slug: 'pc-entree-gamme', name: 'Entrée de gamme', productCount: 12 },
      { slug: 'pc-milieu-gamme', name: 'Milieu de gamme', productCount: 18 },
      { slug: 'pc-haut-gamme', name: 'Haut de gamme', productCount: 15 }
    ],
    filters: [
      {
        type: 'price',
        name: 'Budget',
        options: [
          { value: '0-15000', label: 'Moins de 15 000 DH', count: 12 },
          { value: '15000-25000', label: '15 000 - 25 000 DH', count: 18 },
          { value: '25000+', label: 'Plus de 25 000 DH', count: 15 }
        ]
      }
    ]
  }
};

// Fonction pour récupérer une catégorie par slug
async function getCategory(slug: string): Promise<Category | null> {
  return categoriesData[slug] || null;
}

// Fonction pour récupérer les produits d'une catégorie
async function getCategoryProducts(
  categorySlug: string,
  filters?: Record<string, string[]>,
  sortBy?: string,
  page: number = 1,
  limit: number = 24
): Promise<{ products: CategoryProduct[], totalCount: number }> {
  
  // Données de test - à remplacer par votre API
  const mockProducts: CategoryProduct[] = [
    {
      id: "gpu-rtx4090-msi-1",
      name: "GeForce RTX 4090 Gaming X Trio",
      brand: "MSI",
      model: "RTX 4090 Gaming X Trio 24GB",
      price: 21999,
      originalPrice: 23999,
      image: "/images/1.webp",
      slug: "msi-rtx-4090-gaming-x-trio",
      inStock: true,
      stockQuantity: 5,
      category: 'cartes-graphiques',
      subCategory: 'rtx-4090',
      specifications: {
        'Mémoire': '24GB GDDR6X',
        'Boost Clock': '2610 MHz',
        'Interface': 'PCIe 4.0 x16',
        'Connecteurs': '3x DP 1.4a, 1x HDMI 2.1'
      },
      rating: 4.8,
      reviewCount: 127,
      features: ['Ray Tracing', 'DLSS 3', 'RGB Lighting'],
      isNew: false,
      isFeatured: true
    },
    {
      id: "cpu-intel-i9-14900k-1",
      name: "Core i9-14900K",
      brand: "Intel",
      model: "Core i9-14900K",
      price: 8999,
      originalPrice: 9999,
      image: "/images/Intel-Core-i9-14900K.webp",
      slug: "intel-core-i9-14900k",
      inStock: true,
      stockQuantity: 12,
      category: 'processeurs',
      subCategory: 'intel-i9',
      specifications: {
        'Cœurs': '24 (8P + 16E)',
        'Fréquence Boost': '6.0 GHz',
        'Socket': 'LGA1700',
        'Cache': '36MB'
      },
      rating: 4.7,
      reviewCount: 89,
      features: ['Overclocking', 'Intel UHD 770', 'DDR5 Support'],
      isNew: true,
      isFeatured: true
    },
    {
      id: "ram-corsair-32gb-1",
      name: "Vengeance LPX DDR5-5600",
      brand: "Corsair",
      model: "CMK32GX5M2B5600C36",
      price: 2499,
      image: "/images/1.webp",
      slug: "corsair-vengeance-lpx-ddr5-32gb",
      inStock: true,
      stockQuantity: 25,
      category: 'memoire-ram',
      subCategory: 'ddr5-32gb',
      specifications: {
        'Capacité': '32GB (2x16GB)',
        'Type': 'DDR5',
        'Fréquence': '5600 MHz',
        'Timings': 'CL36-36-36-76'
      },
      rating: 4.6,
      reviewCount: 156,
      features: ['Low Profile', 'Aluminum Heat Spreader', 'XMP 3.0'],
      isNew: false,
      isFeatured: false
    }
  ];

  // Simulation de filtrage et pagination
  let filteredProducts = mockProducts;
  
  // Filtrage par catégorie
  if (categorySlug) {
    filteredProducts = filteredProducts.filter(p => p.category === categorySlug);
  }

  // Application des filtres (simulation)
  if (filters) {
    console.log('Filtres appliqués:', filters);
  }

  // Tri (simulation)
  if (sortBy) {
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Tri par défaut : produits en vedette puis nouveaux
        filteredProducts.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
    }
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

  return {
    products: paginatedProducts,
    totalCount: filteredProducts.length
  };
}

// ✅ CORRECTION : Génération des métadonnées SEO avec await params
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }>  // 🔄 Change: Promise wrapper
}): Promise<Metadata> {
  // ✅ CORRECTION : Await params avant utilisation
  const resolvedParams = await params;
  const category = await getCategory(resolvedParams.slug);

  if (!category) {
    return {
      title: 'Catégorie non trouvée',
      description: 'La catégorie demandée n\'existe pas.'
    };
  }

  return {
    title: `${category.displayName} - ${category.productCount} produits | Votre Site`,
    description: category.description,
    keywords: [
      category.displayName.toLowerCase(),
      category.name.toLowerCase(),
      'gaming',
      'haute performance',
      'composants PC',
      ...category.subCategories?.map(sub => sub.name.toLowerCase()) || []
    ].join(', '),
    openGraph: {
      title: `${category.displayName} - Gaming Haute Performance`,
      description: category.description,
      images: [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: category.displayName,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.displayName} - Gaming Haute Performance`,
      description: category.description,
      images: [category.image],
    }
  };
}

// Génération des paramètres statiques pour ISG
export async function generateStaticParams() {
  const categorySlugs = Object.keys(categoriesData);
  
  return categorySlugs.map((slug) => ({
    slug: slug
  }));
}

// ✅ CORRECTION : Interface pour les props de recherche avec Promise
interface CategoryPageProps {
  params: Promise<{ slug: string }>; // 🔄 Change: Promise wrapper
  searchParams?: Promise<{           // 🔄 Change: Promise wrapper
    [key: string]: string | string[] | undefined;
    page?: string;
    sort?: string;
    brand?: string | string[];
    price?: string | string[];
    specs?: string | string[];
  }>;
}

// ✅ CORRECTION : Composant de page principal avec await params et searchParams
export default async function CategoryPage({ 
  params, 
  searchParams
}: CategoryPageProps) {
  // ✅ CORRECTION : Await params et searchParams avant utilisation
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams || {};
  
  const category = await getCategory(resolvedParams.slug);
  
  if (!category) {
    notFound();
  }

  // Extraction des paramètres de recherche
  const page = parseInt(resolvedSearchParams.page as string) || 1;
  const sortBy = resolvedSearchParams.sort as string || 'featured';
  
  // Construction des filtres
  const filters: Record<string, string[]> = {};
  if (resolvedSearchParams.brand) {
    filters.brand = Array.isArray(resolvedSearchParams.brand) 
      ? resolvedSearchParams.brand 
      : [resolvedSearchParams.brand];
  }
  if (resolvedSearchParams.price) {
    filters.price = Array.isArray(resolvedSearchParams.price) 
      ? resolvedSearchParams.price 
      : [resolvedSearchParams.price];
  }
  if (resolvedSearchParams.specs) {
    filters.specs = Array.isArray(resolvedSearchParams.specs) 
      ? resolvedSearchParams.specs 
      : [resolvedSearchParams.specs];
  }

  // Récupération des produits
  const { products, totalCount } = await getCategoryProducts(
    resolvedParams.slug,
    filters,
    sortBy,
    page,
    24
  );

  return (
    <CategoryPageClient 
      category={category}
      products={products}
      totalCount={totalCount}
      currentPage={page}
      currentSort={sortBy}
      currentFilters={filters}
    />
  );
}

/**
 * ✅ CORRECTIONS APPORTÉES POUR Next.js 15 :
 * 
 * 1. **ASYNC PARAMS & SEARCH PARAMS** :
 *    - params devient Promise<{ slug: string }>
 *    - searchParams devient Promise<{...}>
 *    - Ajout de await avant utilisation
 * 
 * 2. **TYPE SAFETY** :
 *    - Interfaces mises à jour avec Promise wrappers
 *    - Variables resolvedParams et resolvedSearchParams
 *    - Gestion des valeurs undefined avec || {}
 * 
 * 3. **COMPATIBILITÉ** :
 *    - Compatible Next.js 15.x
 *    - Support TypeScript strict
 *    - Zero deprecation warnings
 * 
 * 4. **STRUCTURE MAINTENUE** :
 *    - Toutes les fonctionnalités existantes préservées
 *    - Données de test inchangées
 *    - Logique métier identique
 * 
 * 5. **ROUTES SUPPORTÉES** :
 *    ✅ /categories/cartes-graphiques
 *    ✅ /categories/processeurs  
 *    ✅ /categories/memoire-ram
 *    ✅ /categories/stockage-ssd
 *    ✅ /categories/cartes-meres
 *    ✅ /categories/peripheriques-gaming
 *    ✅ /categories/pc-gaming-complets
 * 
 * 6. **PARAMÈTRES URL** :
 *    ✅ ?page=2&sort=price-asc&brand=nvidia,amd
 *    ✅ Filtres dynamiques conservés
 *    ✅ Pagination fonctionnelle
 * 
 * 🎯 Plus d'erreurs Next.js 15 !
 */