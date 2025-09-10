// src/components/layout/ComponentsSection.tsx - Section pour composants et périphériques (CORRIGÉE)
'use client'
import React, { useState } from 'react';
import ProductCardComponent from '../products/ProductCardComponent';

/**
 * ComponentsSection Component - Section d'affichage des composants et périphériques
 * Version corrigée avec les 6 catégories demandées : GPU, Motherboard, CPU, RAM, SSD, PSU
 * 
 * CORRECTIONS APPORTÉES :
 * - Interface TypeScript mise à jour avec les nouvelles catégories
 * - Catégories réorganisées selon l'ordre demandé
 * - Suppression des anciennes catégories (Storage, Peripherals)
 * - Ajout des nouvelles catégories (SSD, PSU)
 * - Produits adaptés pour chaque catégorie
 */

// Interface pour le produit composant - MISE À JOUR COMPLÈTE
interface ComponentProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  category: 'GPU' | 'Motherboard' | 'CPU' | 'RAM' | 'SSD' | 'PSU';
  specifications: Record<string, string>;
}

const ComponentsSection: React.FC = () => {
  // État pour la catégorie active - commence par GPU
  const [activeCategory, setActiveCategory] = useState('GPU');

  // Catégories finales selon vos spécifications
  const categories = [
    { 
      id: 'gpu', 
      name: 'GPU',
      displayName: 'GPU',
      slug: 'cartes-graphiques'
    },
    { 
      id: 'motherboard', 
      name: 'Motherboard',
      displayName: 'MOBO',
      slug: 'cartes-meres'
    },
    { 
      id: 'cpu', 
      name: 'CPU',
      displayName: 'CPU',
      slug: 'processeurs'
    },
    { 
      id: 'ram', 
      name: 'RAM',
      displayName: 'RAM',
      slug: 'memoires'
    },
    { 
      id: 'ssd', 
      name: 'SSD',
      displayName: 'SSD',
      slug: 'stockage-ssd'
    },
    { 
      id: 'psu', 
      name: 'PSU',
      displayName: 'PSU',
      slug: 'alimentations'
    }
  ];

  // Fonction getProductsByCategory avec toutes les catégories
  const getProductsByCategory = (category: string): ComponentProduct[] => {
    switch (category) {
      case 'GPU':
        return [
          {
            id: "gpu-rtx4090-msi-1",
            name: "GeForce RTX 4090 Gaming X Trio",
            brand: "MSI",
            price: 21999,
            originalPrice: 22999,
            image: "/images/msirtx.webp",
            inStock: true,
            category: 'GPU',
            specifications: {
              'Mémoire': '24GB GDDR6X',
              'Boost Clock': '2610 MHz',
              'Alimentation': '450W recommandé'
            }
          },
          {
            id: "gpu-rtx4080-asus-2",
            name: "GeForce RTX 4080 ROG Strix Gaming",
            brand: "ASUS",
            price: 15999,
            originalPrice: 17999,
            image: "/images/rog.webp",
            inStock: true,
            category: 'GPU',
            specifications: {
              'Mémoire': '16GB GDDR6X',
              'Boost Clock': '2595 MHz',
              'Alimentation': '750W recommandé'
            }
          },
          {
            id: "gpu-rtx4070-gigabyte-3",
            name: "GeForce RTX 4070 Gaming OC",
            brand: "GIGABYTE",
            price: 12499,
            image: "/images/pny.webp",
            inStock: true,
            category: 'GPU',
            specifications: {
              'Mémoire': '12GB GDDR6X',
              'Boost Clock': '2505 MHz',
              'Alimentation': '650W recommandé'
            }
          },
          {
            id: "gpu-rtx4060ti-evga-4",
            name: "GeForce RTX 4060 Ti FTW3 Gaming",
            brand: "EVGA",
            price: 9999,
            originalPrice: 10999,
            image: "/images/1.webp",
            inStock: false,
            category: 'GPU',
            specifications: {
              'Mémoire': '16GB GDDR6',
              'Boost Clock': '2700 MHz',
              'Alimentation': '600W recommandé'
            }
          }
        ];

      case 'Motherboard':
        return [
          {
            id: "mb-asus-rog-z790-1",
            name: "ROG Strix Z790-E Gaming",
            brand: "ASUS",
            price: 5999,
            image: "/images/asus-rog-z790.webp",
            inStock: true,
            category: 'Motherboard',
            specifications: {
              'Socket': 'LGA1700',
              'Chipset': 'Intel Z790',
              'WiFi': 'WiFi 6E'
            }
          },
          {
            id: "mb-msi-x670e-carbon-2",
            name: "MPG X670E Carbon WiFi",
            brand: "MSI",
            price: 4999,
            originalPrice: 5499,
            image: "/images/msi-x670e-carbon.webp",
            inStock: true,
            category: 'Motherboard',
            specifications: {
              'Socket': 'AM5',
              'Chipset': 'AMD X670E',
              'WiFi': 'WiFi 6E'
            }
          },
          {
            id: "mb-gigabyte-b650-aorus-3",
            name: "B650 AORUS Elite AX",
            brand: "GIGABYTE",
            price: 2999,
            image: "/images/gigabyte-b650-aorus.webp",
            inStock: true,
            category: 'Motherboard',
            specifications: {
              'Socket': 'AM5',
              'Chipset': 'AMD B650',
              'WiFi': 'WiFi 6'
            }
          }
        ];

      case 'CPU':
        return [
          {
            id: "cpu-intel-i9-14900k-1",
            name: "Core i9-14900K",
            brand: "Intel",
            price: 8999,
            originalPrice: 9999,
            image: "/images/Intel-Core-i9-14900K.webp",
            inStock: true,
            category: 'CPU',
            specifications: {
              'Cœurs': '24 (8P + 16E)',
              'Fréquence Boost': '6.0 GHz',
              'Socket': 'LGA1700'
            }
          },
          {
            id: "cpu-amd-ryzen9-7900x-2",
            name: "Ryzen 9 7900X",
            brand: "AMD",
            price: 7499,
            image: "/images/Ryzen 9 7900X.webp",
            inStock: true,
            category: 'CPU',
            specifications: {
              'Cœurs': '12',
              'Fréquence Boost': '5.6 GHz',
              'Socket': 'AM5'
            }
          },
          {
            id: "cpu-intel-i7-14700k-3",
            name: "Core i7-14700K",
            brand: "Intel",
            price: 5999,
            originalPrice: 6499,
            image: "/images/intel-i7-14700k.webp",
            inStock: true,
            category: 'CPU',
            specifications: {
              'Cœurs': '20 (8P + 12E)',
              'Fréquence Boost': '5.6 GHz',
              'Socket': 'LGA1700'
            }
          }
        ];

      case 'RAM':
        return [
          {
            id: "ram-corsair-dominator-1",
            name: "Dominator Platinum RGB 32GB",
            brand: "Corsair",
            price: 3499,
            originalPrice: 3999,
            image: "/images/Dominator Platinum RGB 32GB.webp",
            inStock: true,
            category: 'RAM',
            specifications: {
              'Capacité': '32GB (2x16GB)',
              'Fréquence': '6000 MHz',
              'Type': 'DDR5'
            }
          },
          {
            id: "ram-gskill-trident-2",
            name: "Trident Z5 Neo RGB 16GB",
            brand: "G.Skill",
            price: 1899,
            image: "/images/Trident Z5 Neo RGB 16GB.webp",
            inStock: true,
            category: 'RAM',
            specifications: {
              'Capacité': '16GB (2x8GB)',
              'Fréquence': '5600 MHz',
              'Type': 'DDR5'
            }
          },
          {
            id: "ram-kingston-fury-beast-3",
            name: "FURY Beast DDR5 64GB",
            brand: "Kingston",
            price: 5999,
            originalPrice: 6499,
            image: "/images/kingston-fury-beast.webp",
            inStock: true,
            category: 'RAM',
            specifications: {
              'Capacité': '64GB (2x32GB)',
              'Fréquence': '5600 MHz',
              'Type': 'DDR5'
            }
          }
        ];

      case 'SSD':
        return [
          {
            id: "ssd-samsung-980pro-1",
            name: "980 PRO NVMe SSD 2TB",
            brand: "Samsung",
            price: 2999,
            originalPrice: 3499,
            image: "/images/samsung-980-pro.webp",
            inStock: true,
            category: 'SSD',
            specifications: {
              'Capacité': '2TB',
              'Lecture': '7000 MB/s',
              'Interface': 'PCIe 4.0 x4'
            }
          },
          {
            id: "ssd-western-digital-sn850x-2",
            name: "WD Black SN850X NVMe SSD 1TB",
            brand: "Western Digital",
            price: 1599,
            originalPrice: 1799,
            image: "/images/wd-black-sn850x.webp",
            inStock: true,
            category: 'SSD',
            specifications: {
              'Capacité': '1TB',
              'Lecture': '7300 MB/s',
              'Interface': 'PCIe 4.0 x4'
            }
          },
          {
            id: "ssd-crucial-p5-plus-3",
            name: "P5 Plus NVMe SSD 500GB",
            brand: "Crucial",
            price: 899,
            image: "/images/crucial-p5-plus.webp",
            inStock: true,
            category: 'SSD',
            specifications: {
              'Capacité': '500GB',
              'Lecture': '6600 MB/s',
              'Interface': 'PCIe 4.0 x4'
            }
          }
        ];

      case 'PSU':
        return [
          {
            id: "psu-corsair-rm850x-1",
            name: "RM850x 80+ Gold Modular",
            brand: "Corsair",
            price: 1899,
            originalPrice: 2199,
            image: "/images/corsair-rm850x.webp",
            inStock: true,
            category: 'PSU',
            specifications: {
              'Puissance': '850W',
              'Certification': '80+ Gold',
              'Modularité': 'Entièrement modulaire'
            }
          },
          {
            id: "psu-seasonic-focus-gx750-2",
            name: "Focus GX-750 80+ Gold",
            brand: "Seasonic",
            price: 1599,
            image: "/images/seasonic-focus-gx750.webp",
            inStock: true,
            category: 'PSU',
            specifications: {
              'Puissance': '750W',
              'Certification': '80+ Gold',
              'Modularité': 'Entièrement modulaire'
            }
          },
          {
            id: "psu-evga-supernova-850-3",
            name: "SuperNOVA 850 G6 80+ Gold",
            brand: "EVGA",
            price: 1799,
            originalPrice: 1999,
            image: "/images/evga-supernova-850.webp",
            inStock: true,
            category: 'PSU',
            specifications: {
              'Puissance': '850W',
              'Certification': '80+ Gold',
              'Modularité': 'Entièrement modulaire'
            }
          },
          {
            id: "psu-be-quiet-straight-power-11-4",
            name: "Straight Power 11 650W Platinum",
            brand: "be quiet!",
            price: 1399,
            image: "/images/be-quiet-straight-power.webp",
            inStock: false,
            category: 'PSU',
            specifications: {
              'Puissance': '650W',
              'Certification': '80+ Platinum',
              'Modularité': 'Semi-modulaire'
            }
          }
        ];

      default:
        return [];
    }
  };

  const currentProducts = getProductsByCategory(activeCategory);

  return (
    <div className="w-full bg-white py-6 lg:py-12 font-gotham-book">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4">
        
        {/* HEADER DE LA SECTION */}
        <div className="text-center mb-6 lg:mb-12">
          
          {/* TAG "HIGH PERFORMANCE COMPONENTS" - Texte orange simple */}
          <div className="mb-4">
            <span className="text-orange-600 text-sm font-bold">
              High Performance Components
            </span>
          </div>

          {/* TITRE PRINCIPAL */}
          <h2 className="font-custom text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3">
            <span className="text-orange-600">COMPOSANTS</span> & PERIPHERIQUE
          </h2>

          {/* SOUS-TITRE */}
          <p className="text-gray-600 text-sm lg:text-lg max-w-2xl mx-auto">
            Composants haute performance et périphériques gaming professionnels
          </p>
        </div>

        {/* NAVIGATION PAR CATÉGORIES */}
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
                {category.displayName}
                
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
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {currentProducts.map((product) => (
                <ProductCardComponent
                  key={product.id}
                  product={product}
                  onAddToCart={(id: string) => console.log('Ajouter au panier:', id)}
                  onViewDetails={(id: string) => console.log('Voir détails:', id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-gray-500">
                <h3 className="text-xl font-semibold mb-2">Catégorie sélectionnée : {activeCategory}</h3>
                <p className="text-sm">Les produits pour cette catégorie seront ajoutés prochainement</p>
              </div>
            </div>
          )}
        </div>

        {/* DEBUG INFO - À supprimer en production */}
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs text-gray-600">
          <strong>Debug:</strong> Catégorie active: &quot;{activeCategory}&quot; | 
          Produits trouvés: {currentProducts.length} | 
          Catégories disponibles: {categories.map(c => c.name).join(', ')}
        </div>
      </div>
    </div>
  );
};

export default ComponentsSection;