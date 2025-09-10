// src/components/layout/ProductSection.tsx - Section produits gaming avec palette orange
'use client'
import React, { useState } from 'react';
import ProductCardPCGamer from '../products/ProductCardPCGamer';

/**
 * ProductSection Component - Section d'affichage des produits gaming
 * 
 * STRUCTURE :
 * - Tag "Hurry up to buy" avec palette orange
 * - Titre principal "New Arrivals"
 * - Sous-titre descriptif
 * - 4 catégories : PC Gamer, Laptop Gamer, GPU, Carte mère
 * - Navigation avec couleurs orange cohérentes avec Header et TopHeader
 * - Grid de produits avec ProductCardPCGamer
 * 
 * CORRECTION :
 * ✅ Interface PCComponent mise à jour avec les nouvelles catégories
 */

// Interface pour définir un composant PC - ✅ CORRIGÉE
interface PCComponent {
  type: 'GPU' | 'Motherboard' | 'CPU' | 'RAM' | 'SSD' | 'PSU'; // ✅ INTERFACE CORRIGÉE
  name: string;
  icon?: string;
}

// Interface pour le produit PC Gamer
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

const ProductSection: React.FC = () => {
  // État pour la catégorie active
  const [activeCategory, setActiveCategory] = useState('PC Gamer');

  // Catégories de produits gaming
  const categories = [
    { 
      id: 'pc-gamer', 
      name: 'PC Gamer',
      slug: 'pc-gamer' 
    },
    { 
      id: 'laptop-gamer', 
      name: 'Laptop Gamer',
      slug: 'laptop-gamer' 
    },
    { 
      id: 'gpu', 
      name: 'GPU',
      slug: 'gpu' 
    },
    { 
      id: 'carte-mere', 
      name: 'Carte mère',
      slug: 'carte-mere' 
    }
  ];

  return (
    <div className="w-full bg-white py-6 lg:py-12 font-gotham-book">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4">
        
        {/* HEADER DE LA SECTION */}
        <div className="text-center mb-6 lg:mb-12">
          
          {/* TAG "HURRY UP TO BUY" - Texte orange simple */}
          <div className="mb-4">
            <span className="text-orange-600 text-sm font-bold">
              Hurry up to buy
            </span>
          </div>

          {/* TITRE PRINCIPAL */}
          <h2 className="font-custom text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3">
          <span className="text-orange-600">New</span> Arrivals
          </h2>

          {/* SOUS-TITRE */}
          <p className="text-gray-600 text-sm lg:text-lg max-w-2xl mx-auto">
            Découvrez nos offres PC Gamer haute performance
          </p>
        </div>

        {/* NAVIGATION PAR CATÉGORIES - Style simple avec soulignage */}
        <div className="mb-6 lg:mb-12">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`
                  px-2 py-2 text-sm lg:text-base font-bold transition-all duration-300 relative
                  ${activeCategory === category.name 
                    ? 'text-orange-600' 
                    : 'text-gray-900 hover:text-orange-600'
                  }
                `}
              >
                {category.name}
                
                {/* Soulignage pour la catégorie active */}
                {activeCategory === category.name && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"></div>
                )}
                
                {/* Soulignage au hover pour les catégories inactives */}
                {activeCategory !== category.name && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 hover:scale-x-100"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENU DES PRODUITS */}
        <div className="mb-6">
          {/* Grid de produits PC Gamer */}
          {activeCategory === 'PC Gamer' && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              <ProductCardPCGamer
                product={{
                  id: "pc-gamer-rtx4070-1",
                  name: "PC Gamer RTX 4070 - Configuration Haute Performance",
                  price: 15999,
                  originalPrice: 17999,
                  image: "/images/pcg1.webp",
                  rating: 4.5,
                  reviewCount: 128,
                  inStock: true,
                  components: [
                    { type: 'CPU', name: 'i7-13700F' },
                    { type: 'GPU', name: 'RTX 4070 GIGABYTE' },
                    { type: 'RAM', name: '32GB DDR5-5600' },
                    { type: 'SSD', name: '1TB NVMe SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
                    { type: 'Motherboard', name: 'MSI B760M Pro' },
                    { type: 'PSU', name: '750W Gold+' }
                  ]
                }}
                onAddToCart={(id: string) => console.log('Ajouter au panier:', id)}
                onViewDetails={(id: string) => console.log('Voir détails:', id)}
              />

              <ProductCardPCGamer
                product={{
                  id: "pc-gamer-rtx4080-2",
                  name: "PC Gamer RTX 4080 - Beast Gaming Machine",
                  price: 22999,
                  originalPrice: 24999,
                  image: "/images/pcg2.webp",
                  rating: 4.8,
                  reviewCount: 89,
                  inStock: true,
                  components: [
                    { type: 'CPU', name: 'Intel Core i9-13900F' },
                    { type: 'GPU', name: 'ASROCK RTX 4080 16GB' },
                    { type: 'RAM', name: '32GB DDR5-6000' },
                    { type: 'SSD', name: '2TB NVMe SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
                    { type: 'Motherboard', name: 'ASUS Z790 Pro' },
                    { type: 'PSU', name: '850W Gold+' }
                  ]
                }}
                onAddToCart={(id) => console.log('Ajouter au panier:', id)}
                onViewDetails={(id) => console.log('Voir détails:', id)}
              />

              <ProductCardPCGamer
                product={{
                  id: "pc-gamer-rtx4060-3",
                  name: "PC Gamer RTX 4060 - Gaming Starter",
                  price: 12999,
                  image: "/images/pcg3.webp",
                  rating: 4.2,
                  reviewCount: 156,
                  inStock: true,
                  components: [
                    { type: 'CPU', name: 'AMD Ryzen 5 7600X' },
                    { type: 'GPU', name: 'ASUS RTX 4060 8GB' },
                    { type: 'RAM', name: '16GB DDR5-5200' },
                    { type: 'SSD', name: '500GB NVMe SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
                    { type: 'Motherboard', name: 'MSI B650M Pro' },
                    { type: 'PSU', name: '650W Gold+' }
                  ]
                }}
                onAddToCart={(id) => console.log('Ajouter au panier:', id)}
                onViewDetails={(id) => console.log('Voir détails:', id)}
              />

              <ProductCardPCGamer
                product={{
                  id: "pc-gamer-rtx4090-4",
                  name: "PC Gamer RTX 4090 - Ultimate Gaming",
                  price: 35999,
                  image: "/images/pcg2.webp",
                  rating: 4.9,
                  reviewCount: 45,
                  inStock: false,
                  components: [
                    { type: 'CPU', name: 'Intel Core i9-13900KS' },
                    { type: 'GPU', name: 'MSI RTX 4090 24GB' },
                    { type: 'RAM', name: '64GB DDR5-6400' },
                    { type: 'SSD', name: '4TB NVMe SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
                    { type: 'Motherboard', name: 'ASUS ROG Z790 Hero' },
                    { type: 'PSU', name: '1000W Platinum+' }
                  ]
                }}
                onAddToCart={(id) => console.log('Ajouter au panier:', id)}
                onViewDetails={(id) => console.log('Voir détails:', id)}
              />
            </div>
          )}

          {/* Placeholder pour les autres catégories */}
          {activeCategory !== 'PC Gamer' && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-gray-500">
                <h3 className="text-xl font-semibold mb-2">Catégorie sélectionnée : {activeCategory}</h3>
                <p className="text-sm">Les produits pour cette catégorie seront ajoutés prochainement</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;