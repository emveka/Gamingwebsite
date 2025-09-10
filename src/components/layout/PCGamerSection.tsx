// src/components/layout/PCGamerSection.tsx - Section PC Gamer identique à ProductSection
'use client'
import React, { useState } from 'react';
import ProductCardPCGamer from '../products/ProductCardPCGamer';

/**
 * PCGamerSection Component - Section d'affichage des PC Gamer
 * 
 * STRUCTURE :
 * - Tag "Gaming Experience" avec palette orange
 * - Titre principal "PC Gaming Collection"
 * - Sous-titre descriptif
 * - 3 catégories : PC Bon Budget, PC Performant, PC Extreme
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

const PCGamerSection: React.FC = () => {
  // État pour la catégorie active
  const [activeCategory, setActiveCategory] = useState('PC Bon Budget');

  // Catégories de PC Gamer
  const categories = [
    { 
      id: 'pc-bon-budget', 
      name: 'PC Bon Budget',
      slug: 'pc-bon-budget' 
    },
    { 
      id: 'pc-performant', 
      name: 'PC Performant',
      slug: 'pc-performant' 
    },
    { 
      id: 'pc-extreme', 
      name: 'PC Extreme',
      slug: 'pc-extreme' 
    }
  ];

  return (
    <div className="w-full bg-white py-6 lg:py-12 font-gotham-book">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4">
        
        {/* HEADER DE LA SECTION */}
        <div className="text-center mb-6 lg:mb-12">
          
          {/* TAG "GAMING EXPERIENCE" - Texte orange simple */}
          <div className="mb-4">
            <span className="text-orange-600 text-sm font-bold">
              Gaming Experience
            </span>
          </div>

          {/* TITRE PRINCIPAL */}
          <h2 className="font-custom text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3">
            <span className="text-orange-600">PC GAMERS</span> COLLECTION
          </h2>

          {/* SOUS-TITRE */}
          <p className="text-gray-600 text-sm lg:text-lg max-w-2xl mx-auto">
            Choisissez votre configuration gaming idéale parmi nos trois gammes
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
          {/* Grid de produits PC Bon Budget */}
          {activeCategory === 'PC Bon Budget' && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              <ProductCardPCGamer
                product={{
                  id: "pc-budget-rtx4060-1",
                  name: "PC Gaming Starter RTX 4060",
                  price: 12999,
                  originalPrice: 14999,
                  image: "/images/msi120a.webp",
                  rating: 4.3,
                  reviewCount: 89,
                  inStock: true,
                  components: [
                    { type: 'CPU', name: 'AMD Ryzen 5 7600' },
                    { type: 'GPU', name: 'RTX 4060 8GB' },
                    { type: 'RAM', name: '16GB DDR5-5200' },
                    { type: 'SSD', name: '500GB NVMe SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
                    { type: 'Motherboard', name: 'MSI B650M Pro' },
                    { type: 'PSU', name: '650W Bronze+' }
                  ]
                }}
                onAddToCart={(id: string) => console.log('Ajouter au panier:', id)}
                onViewDetails={(id: string) => console.log('Voir détails:', id)}
              />

              <ProductCardPCGamer
                product={{
                  id: "pc-budget-rtx4060ti-2",
                  name: "PC Gaming Essential RTX 4060 Ti",
                  price: 14499,
                  originalPrice: 15999,
                  image: "/images/1.webp",
                  rating: 4.4,
                  reviewCount: 156,
                  inStock: true,
                  components: [
                    { type: 'CPU', name: 'Intel i5-13400F' },
                    { type: 'GPU', name: 'RTX 4060 Ti 16GB' },
                    { type: 'RAM', name: '16GB DDR5-5600' },
                    { type: 'SSD', name: '1TB NVMe SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
                    { type: 'Motherboard', name: 'MSI B760M Pro' },
                    { type: 'PSU', name: '700W Bronze+' }
                  ]
                }}
                onAddToCart={(id: string) => console.log('Ajouter au panier:', id)}
                onViewDetails={(id: string) => console.log('Voir détails:', id)}
              />
            </div>
          )}

          {/* Grid de produits PC Performant */}
          {activeCategory === 'PC Performant' && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              <ProductCardPCGamer
                product={{
                  id: "pc-perf-rtx4070-1",
                  name: "PC Gaming Pro RTX 4070",
                  price: 18999,
                  originalPrice: 20999,
                  image: "/images/1.webp",
                  rating: 4.6,
                  reviewCount: 234,
                  inStock: true,
                  components: [
                    { type: 'CPU', name: 'AMD Ryzen 7 7700X' },
                    { type: 'GPU', name: 'RTX 4070 12GB GIGABYTE' },
                    { type: 'RAM', name: '32GB DDR5-6000' },
                    { type: 'SSD', name: '1TB NVMe Gen4 SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
                    { type: 'Motherboard', name: 'MSI B650 Tomahawk' },
                    { type: 'PSU', name: '750W Gold+' }
                  ]
                }}
                onAddToCart={(id: string) => console.log('Ajouter au panier:', id)}
                onViewDetails={(id: string) => console.log('Voir détails:', id)}
              />

              <ProductCardPCGamer
                product={{
                  id: "pc-perf-rtx4070super-2",
                  name: "PC Gaming Elite RTX 4070 SUPER",
                  price: 22499,
                  originalPrice: 24999,
                  image: "/images/msi120a.webp",
                  rating: 4.7,
                  reviewCount: 167,
                  inStock: true,
                  components: [
                    { type: 'CPU', name: 'Intel i7-14700F' },
                    { type: 'GPU', name: 'RTX 4070 SUPER 12GB MSI' },
                    { type: 'RAM', name: '32GB DDR5-6400' },
                    { type: 'SSD', name: '2TB NVMe Gen4 SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
                    { type: 'Motherboard', name: 'ASUS Z790 TUF Gaming' },
                    { type: 'PSU', name: '850W Gold+' }
                  ]
                }}
                onAddToCart={(id: string) => console.log('Ajouter au panier:', id)}
                onViewDetails={(id: string) => console.log('Voir détails:', id)}
              />
            </div>
          )}

          {/* Grid de produits PC Extreme */}
          {activeCategory === 'PC Extreme' && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              <ProductCardPCGamer
                product={{
                  id: "pc-extreme-rtx4080-1",
                  name: "PC Gaming Beast RTX 4080",
                  price: 32999,
                  originalPrice: 35999,
                  image: "/images/1.webp",
                  rating: 4.8,
                  reviewCount: 78,
                  inStock: true,
                  components: [
                    { type: 'CPU', name: 'Intel i9-14900F' },
                    { type: 'GPU', name: 'RTX 4080 16GB ASUS ROG' },
                    { type: 'RAM', name: '64GB DDR5-6800' },
                    { type: 'SSD', name: '4TB NVMe Gen4 SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
                    { type: 'Motherboard', name: 'ASUS ROG Z790 Hero' },
                    { type: 'PSU', name: '1000W Platinum+' }
                  ]
                }}
                onAddToCart={(id: string) => console.log('Ajouter au panier:', id)}
                onViewDetails={(id: string) => console.log('Voir détails:', id)}
              />

              <ProductCardPCGamer
                product={{
                  id: "pc-extreme-rtx4090-2",
                  name: "PC Gaming Ultimate RTX 4090",
                  price: 42999,
                  image: "/images/1.webp",
                  rating: 4.9,
                  reviewCount: 45,
                  inStock: false,
                  components: [
                    { type: 'CPU', name: 'Intel i9-14900KS' },
                    { type: 'GPU', name: 'RTX 4090 24GB MSI SUPRIM X' },
                    { type: 'RAM', name: '64GB DDR5-7200' },
                    { type: 'SSD', name: '8TB NVMe Gen5 SSD' }, // ✅ CORRIGÉ : 'SSD' au lieu de 'Storage'
                    { type: 'Motherboard', name: 'ASUS ROG Z790 Maximus Hero' },
                    { type: 'PSU', name: '1200W Titanium+' }
                  ]
                }}
                onAddToCart={(id: string) => console.log('Ajouter au panier:', id)}
                onViewDetails={(id: string) => console.log('Voir détails:', id)}
              />
            </div>
          )}

          {/* Placeholder pour catégories sans produits */}
          {((activeCategory === 'PC Bon Budget' && true) ||
            (activeCategory === 'PC Performant' && true) ||
            (activeCategory === 'PC Extreme' && true)) ? null : (
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

export default PCGamerSection;