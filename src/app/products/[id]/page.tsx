// src/app/products/[id]/page.tsx - Correction de l'erreur params
import React from 'react';
import { Metadata } from 'next';
import ProductDetailClient from '@/components/pages/ProductDetailClient';
import { ComponentProduct } from '@/types/product';
import Link from 'next/link';

// Exemple de données produit (remplacez par votre API)
const getProductData = async (id: string): Promise<ComponentProduct> => {
  // Simulation d'un appel API
  // Remplacez par votre vraie logique de récupération de données
  
  const mockProduct: ComponentProduct = {
    id: id,
    name: "MSI GeForce RTX 4080 SUPRIM X 16GB",
    brand: "MSI",
    model: "RTX 4080 SUPRIM X",
    price: 12500,
    originalPrice: 14999,
    images: [
      "/images/gpu/msi-rtx-4080-1.webp",
      "/images/gpu/msi-rtx-4080-2.webp",
      "/images/gpu/msi-rtx-4080-3.webp",
      "/images/gpu/msi-rtx-4080-4.webp"
    ],
    inStock: true,
    stockQuantity: 15,
    category: "GPU",
    specifications: {
      "Architecture": "Ada Lovelace",
      "Processus de fabrication": "TSMC 4nm",
      "Cœurs CUDA": "9728",
      "Mémoire": "16GB GDDR6X",
      "Interface mémoire": "256-bit",
      "Fréquence de base": "2205 MHz",
      "Fréquence boost": "2550 MHz",
      "TDP": "320W",
      "Connecteurs": "3x DisplayPort 1.4a, 1x HDMI 2.1"
    },
    description: "La MSI GeForce RTX 4080 SUPRIM X 16GB représente l'excellence en matière de performances graphiques. Équipée de l'architecture Ada Lovelace de NVIDIA et de 16GB de mémoire GDDR6X, cette carte graphique offre des performances exceptionnelles pour le gaming 4K et la création de contenu. Le système de refroidissement SUPRIM X garantit des températures optimales même sous charge intensive.",
    features: [
      "Architecture Ada Lovelace nouvelle génération",
      "16GB GDDR6X pour les jeux et applications exigeantes",
      "Ray Tracing de 3ème génération",
      "DLSS 3 avec Frame Generation",
      "Système de refroidissement SUPRIM X silent",
      "RGB Mystic Light personnalisable",
      "Boost Clock jusqu'à 2550 MHz",
      "Support 4K HDR et 8K"
    ],
    warranty: "3 ans constructeur",
    compatibility: [
      "Compatible PCI Express 4.0",
      "Alimentation 850W recommandée",
      "Connecteurs 3x 8-pins requis",
      "Boîtier ATX moyen tour minimum"
    ],
    videoUrl: "https://www.youtube.com/watch?v=example_video_id"
  };

  // Simulation délai API
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockProduct;
};

// Exemple de données produits similaires
const getRelatedProducts = async (category: string): Promise<ComponentProduct[]> => {
  const mockRelatedProducts: ComponentProduct[] = [
    {
      id: "gpu-2",
      name: "ASUS ROG Strix RTX 4070 Ti 12GB",
      brand: "ASUS",
      model: "ROG Strix RTX 4070 Ti",
      price: 9500,
      originalPrice: 10999,
      images: ["/images/gpu/asus-rtx-4070ti.webp"],
      inStock: true,
      stockQuantity: 8,
      category: "GPU",
      specifications: {},
      description: "Carte graphique ASUS ROG Strix RTX 4070 Ti",
      features: [],
      warranty: "3 ans"
    },
    {
      id: "gpu-3", 
      name: "Gigabyte RTX 4090 Gaming OC 24GB",
      brand: "Gigabyte",
      model: "RTX 4090 Gaming OC",
      price: 18500,
      images: ["/images/gpu/gigabyte-rtx-4090.webp"],
      inStock: false,
      stockQuantity: 0,
      category: "GPU",
      specifications: {},
      description: "Carte graphique Gigabyte RTX 4090",
      features: [],
      warranty: "3 ans"
    },
    {
      id: "gpu-4",
      name: "EVGA RTX 4060 Ti FTW3 16GB",
      brand: "EVGA", 
      model: "RTX 4060 Ti FTW3",
      price: 6500,
      images: ["/images/gpu/evga-rtx-4060ti.webp"],
      inStock: true,
      stockQuantity: 12,
      category: "GPU",
      specifications: {},
      description: "Carte graphique EVGA RTX 4060 Ti",
      features: [],
      warranty: "3 ans"
    }
  ];

  return mockRelatedProducts;
};

// Props pour la page
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Génération des métadonnées SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // 🔧 CORRECTION : Await params avant utilisation
  const resolvedParams = await params;
  const product = await getProductData(resolvedParams.id);
  
  return {
    title: `${product.name} - ${product.brand} | TechShop`,
    description: `${product.description.slice(0, 160)}...`,
    keywords: [
      product.name,
      product.brand,
      product.category,
      'ordinateur',
      'gaming',
      'composant PC',
      'Maroc'
    ].join(', '),
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map(img => ({
        url: img,
        width: 800,
        height: 600,
        alt: product.name
      }))
    }
  };
}

// Composant de page Server Component
export default async function ProductDetailPage({ params }: PageProps) {
  try {
    // 🔧 CORRECTION : Await params avant utilisation
    const resolvedParams = await params;
    
    // Récupération des données côté serveur
    const [product, relatedProducts] = await Promise.all([
      getProductData(resolvedParams.id),
      getRelatedProducts("GPU") // Filtrer selon la catégorie du produit
    ]);

    return (
      <main>
        {/* Composant client avec toute la logique d'interactivité */}
        <ProductDetailClient 
          product={product}
          relatedProducts={relatedProducts}
        />
      </main>
    );

  } catch (error) {
    console.error('Erreur lors du chargement du produit:', error);
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Produit introuvable
          </h1>
          <p className="text-gray-600 mb-6">
            Le produit demandé n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <Link 
            href="/products" 
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
          >
            Retour aux produits
          </Link>
        </div>
      </div>
    );
  }
}