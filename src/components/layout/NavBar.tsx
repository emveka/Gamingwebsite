"use client";

// src/components/layout/NavBar.tsx - NavBar simplifié sans images

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * NavBar Component simplifié
 * 
 * Fonctionnalités :
 * - Menu horizontal noir avec texte blanc
 * - Hover orange sur les éléments
 * - Mega menu avec sous-catégories et sous-sous-catégories
 * - SANS images - juste du texte
 * - Responsive design
 * - Fermeture automatique du menu
 * - Animations fluides
 */

// Types pour les données du menu
interface SubSubCategory {
  id: string;
  name: string;
  href: string;
}

interface SubCategory {
  id: string;
  name: string;
  href: string;
  subsubcategories?: SubSubCategory[];
}

interface Category {
  id: string;
  name: string;
  href: string;
  hasDropdown: boolean;
  subcategories?: SubCategory[];
}

const NavBar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Configuration des catégories avec sous-catégories et sous-sous-catégories
  const categories: Category[] = [
    {
      id: 'pc-gaming',
      name: 'PC GAMING',
      href: '/pc-gaming',
      hasDropdown: true,
      subcategories: [
        { 
          id: 'pc-intel', 
          name: 'PC Intel', 
          href: '/pc-gaming/pc-intel',
          subsubcategories: [
            { id: 'intel-i3', name: 'PC Intel Core i3', href: '/pc-gaming/pc-intel/i3' },
            { id: 'intel-i5', name: 'PC Intel Core i5', href: '/pc-gaming/pc-intel/i5' },
            { id: 'intel-i7', name: 'PC Intel Core i7', href: '/pc-gaming/pc-intel/i7' },
            { id: 'intel-i9', name: 'PC Intel Core i9', href: '/pc-gaming/pc-intel/i9' }
          ]
        },
        { 
          id: 'pc-amd', 
          name: 'PC AMD', 
          href: '/pc-gaming/pc-amd',
          subsubcategories: [
            { id: 'amd-ryzen-5', name: 'PC AMD Ryzen 5', href: '/pc-gaming/pc-amd/ryzen-5' },
            { id: 'amd-ryzen-7', name: 'PC AMD Ryzen 7', href: '/pc-gaming/pc-amd/ryzen-7' },
            { id: 'amd-ryzen-9', name: 'PC AMD Ryzen 9', href: '/pc-gaming/pc-amd/ryzen-9' }
          ]
        },
        { 
          id: 'pc-complets', 
          name: 'PC par Budget', 
          href: '/pc-gaming/complets',
          subsubcategories: [
            { id: 'pc-entree-gamme', name: 'PC Entrée de Gamme', href: '/pc-gaming/complets/entree-gamme' },
            { id: 'pc-milieu-gamme', name: 'PC Milieu de Gamme', href: '/pc-gaming/complets/milieu-gamme' },
            { id: 'pc-haut-gamme', name: 'PC Haut de Gamme', href: '/pc-gaming/complets/haut-gamme' },
            { id: 'pc-ultra-high-end', name: 'PC Ultra High-End', href: '/pc-gaming/complets/ultra-high-end' }
          ]
        },
        { 
          id: 'pc-sur-mesure', 
          name: 'PC Sur Mesure', 
          href: '/pc-gaming/sur-mesure',
          subsubcategories: [
            { id: 'configurateur', name: 'Configurateur PC', href: '/pc-gaming/sur-mesure/configurateur' },
            { id: 'devis-personnalise', name: 'Devis Personnalisé', href: '/pc-gaming/sur-mesure/devis' }
          ]
        },
        { 
          id: 'mini-pc', 
          name: 'Mini PC Gaming', 
          href: '/pc-gaming/mini-pc',
          subsubcategories: [
            { id: 'mini-itx', name: 'Mini ITX', href: '/pc-gaming/mini-pc/itx' },
            { id: 'micro-atx', name: 'Micro ATX', href: '/pc-gaming/mini-pc/micro-atx' }
          ]
        },
        { 
          id: 'workstation', 
          name: 'Workstation', 
          href: '/pc-gaming/workstation',
          subsubcategories: [
            { id: 'creation-3d', name: 'Création 3D', href: '/pc-gaming/workstation/creation-3d' },
            { id: 'montage-video', name: 'Montage Vidéo', href: '/pc-gaming/workstation/montage-video' },
            { id: 'streaming', name: 'Streaming Pro', href: '/pc-gaming/workstation/streaming' }
          ]
        }
      ]
    },
    {
      id: 'composants',
      name: 'COMPOSANTS',
      href: '/composants',
      hasDropdown: true,
      subcategories: [
        { 
          id: 'processeurs', 
          name: 'Processeurs', 
          href: '/composants/processeurs',
          subsubcategories: [
            { id: 'intel', name: 'Intel', href: '/composants/processeurs/intel' },
            { id: 'amd', name: 'AMD', href: '/composants/processeurs/amd' }
          ]
        },
        { 
          id: 'cartes-graphiques', 
          name: 'Cartes Graphiques', 
          href: '/composants/cartes-graphiques',
          subsubcategories: [
            { id: 'nvidia-rtx-40', name: 'NVIDIA RTX 40', href: '/composants/gpu/nvidia-rtx-40' },
            { id: 'nvidia-rtx-30', name: 'NVIDIA RTX 30', href: '/composants/gpu/nvidia-rtx-30' },
            { id: 'amd-radeon', name: 'AMD Radeon', href: '/composants/gpu/amd-radeon' }
          ]
        },
        { 
          id: 'cartes-meres', 
          name: 'Cartes Mères', 
          href: '/composants/cartes-meres',
          subsubcategories: [
            { id: 'intel-z790', name: 'Intel Z790', href: '/composants/cartes-meres/intel-z790' },
            { id: 'amd-x670', name: 'AMD X670', href: '/composants/cartes-meres/amd-x670' },
            { id: 'amd-b550', name: 'AMD B550', href: '/composants/cartes-meres/amd-b550' }
          ]
        },
        { 
          id: 'memoire-ram', 
          name: 'Mémoire RAM', 
          href: '/composants/memoire-ram',
          subsubcategories: [
            { id: 'ddr5', name: 'DDR5', href: '/composants/ram/ddr5' },
            { id: 'ddr4', name: 'DDR4', href: '/composants/ram/ddr4' }
          ]
        },
        { 
          id: 'stockage', 
          name: 'Stockage', 
          href: '/composants/stockage',
          subsubcategories: [
            { id: 'ssd-nvme', name: 'SSD NVMe', href: '/composants/stockage/ssd-nvme' },
            { id: 'ssd-sata', name: 'SSD SATA', href: '/composants/stockage/ssd-sata' },
            { id: 'hdd', name: 'Disques Durs HDD', href: '/composants/stockage/hdd' }
          ]
        },
        { 
          id: 'alimentation', 
          name: 'Alimentations', 
          href: '/composants/alimentation',
          subsubcategories: [
            { id: 'modulaire', name: 'Modulaires', href: '/composants/psu/modulaire' },
            { id: 'semi-modulaire', name: 'Semi-Modulaires', href: '/composants/psu/semi-modulaire' }
          ]
        },
        { 
          id: 'boitiers', 
          name: 'Boîtiers', 
          href: '/composants/boitiers',
          subsubcategories: [
            { id: 'tower', name: 'Tour (ATX)', href: '/composants/boitiers/tower' },
            { id: 'mid-tower', name: 'Mid Tower', href: '/composants/boitiers/mid-tower' },
            { id: 'mini-itx', name: 'Mini ITX', href: '/composants/boitiers/mini-itx' }
          ]
        },
        { 
          id: 'refroidissement', 
          name: 'Refroidissement', 
          href: '/composants/refroidissement',
          subsubcategories: [
            { id: 'watercooling', name: 'Watercooling', href: '/composants/cooling/watercooling' },
            { id: 'air-cooling', name: 'Air Cooling', href: '/composants/cooling/air' },
            { id: 'ventilateurs', name: 'Ventilateurs', href: '/composants/cooling/ventilateurs' }
          ]
        }
      ]
    },
    {
      id: 'peripheriques',
      name: 'PÉRIPHÉRIQUES',
      href: '/peripheriques',
      hasDropdown: true,
      subcategories: [
        { 
          id: 'claviers', 
          name: 'Claviers Gaming', 
          href: '/peripheriques/claviers',
          subsubcategories: [
            { id: 'mecanique', name: 'Mécaniques', href: '/peripheriques/claviers/mecanique' },
            { id: 'membrane', name: 'Membranes', href: '/peripheriques/claviers/membrane' },
            { id: 'sans-fil', name: 'Sans Fil', href: '/peripheriques/claviers/sans-fil' }
          ]
        },
        { 
          id: 'souris', 
          name: 'Souris Gaming', 
          href: '/peripheriques/souris',
          subsubcategories: [
            { id: 'filaire', name: 'Filaires', href: '/peripheriques/souris/filaire' },
            { id: 'sans-fil', name: 'Sans Fil', href: '/peripheriques/souris/sans-fil' },
            { id: 'esport', name: 'E-Sport', href: '/peripheriques/souris/esport' }
          ]
        },
        { 
          id: 'casques', 
          name: 'Casques Gaming', 
          href: '/peripheriques/casques',
          subsubcategories: [
            { id: 'filaire', name: 'Filaires', href: '/peripheriques/casques/filaire' },
            { id: 'sans-fil', name: 'Sans Fil', href: '/peripheriques/casques/sans-fil' },
            { id: 'pro-gaming', name: 'Pro Gaming', href: '/peripheriques/casques/pro' }
          ]
        },
        { 
          id: 'ecrans', 
          name: 'Écrans Gaming', 
          href: '/peripheriques/ecrans',
          subsubcategories: [
            { id: '144hz', name: '144Hz', href: '/peripheriques/ecrans/144hz' },
            { id: '240hz', name: '240Hz+', href: '/peripheriques/ecrans/240hz' },
            { id: '4k-gaming', name: '4K Gaming', href: '/peripheriques/ecrans/4k' },
            { id: 'ultrawide', name: 'Ultra-wide', href: '/peripheriques/ecrans/ultrawide' }
          ]
        }
      ]
    },
    {
      id: 'chaises-bureaux',
      name: 'CHAISES & BUREAUX',
      href: '/chaises-bureaux',
      hasDropdown: true,
      subcategories: [
        { 
          id: 'chaises-gaming', 
          name: 'Chaises Gaming', 
          href: '/chaises-bureaux/chaises-gaming',
          subsubcategories: [
            { id: 'ergonomiques', name: 'Ergonomiques', href: '/chaises-bureaux/chaises/ergonomiques' },
            { id: 'racing', name: 'Racing Style', href: '/chaises-bureaux/chaises/racing' },
            { id: 'premium', name: 'Premium', href: '/chaises-bureaux/chaises/premium' }
          ]
        },
        { 
          id: 'bureaux-gaming', 
          name: 'Bureaux Gaming', 
          href: '/chaises-bureaux/bureaux-gaming',
          subsubcategories: [
            { id: 'classiques', name: 'Bureaux Classiques', href: '/chaises-bureaux/bureaux/classiques' },
            { id: 'electriques', name: 'Bureaux Électriques', href: '/chaises-bureaux/bureaux/electriques' },
            { id: 'gaming-desk', name: 'Gaming Desk', href: '/chaises-bureaux/bureaux/gaming' }
          ]
        },
        { 
          id: 'accessoires-bureau', 
          name: 'Accessoires Bureau', 
          href: '/chaises-bureaux/accessoires',
          subsubcategories: [
            { id: 'supports-ecran', name: 'Supports Écran', href: '/chaises-bureaux/accessoires/supports-ecran' },
            { id: 'eclairage', name: 'Éclairage Bureau', href: '/chaises-bureaux/accessoires/eclairage' },
            { id: 'rangement', name: 'Rangement', href: '/chaises-bureaux/accessoires/rangement' }
          ]
        }
      ]
    },
    {
      id: 'consoles',
      name: 'CONSOLES',
      href: '/consoles',
      hasDropdown: true,
      subcategories: [
        { 
          id: 'playstation', 
          name: 'PlayStation', 
          href: '/consoles/playstation',
          subsubcategories: [
            { id: 'ps5', name: 'PlayStation 5', href: '/consoles/playstation/ps5' },
            { id: 'ps5-digital', name: 'PS5 Digital', href: '/consoles/playstation/ps5-digital' },
            { id: 'accessoires-ps5', name: 'Accessoires PS5', href: '/consoles/playstation/accessoires' }
          ]
        },
        { 
          id: 'xbox', 
          name: 'Xbox', 
          href: '/consoles/xbox',
          subsubcategories: [
            { id: 'series-x', name: 'Xbox Series X', href: '/consoles/xbox/series-x' },
            { id: 'series-s', name: 'Xbox Series S', href: '/consoles/xbox/series-s' },
            { id: 'accessoires-xbox', name: 'Accessoires Xbox', href: '/consoles/xbox/accessoires' }
          ]
        },
        { 
          id: 'nintendo', 
          name: 'Nintendo', 
          href: '/consoles/nintendo',
          subsubcategories: [
            { id: 'switch', name: 'Nintendo Switch', href: '/consoles/nintendo/switch' },
            { id: 'switch-lite', name: 'Switch Lite', href: '/consoles/nintendo/switch-lite' },
            { id: 'accessoires-switch', name: 'Accessoires Switch', href: '/consoles/nintendo/accessoires' }
          ]
        }
      ]
    },
    {
      id: 'promotions',
      name: 'PROMOTIONS',
      href: '/promotions',
      hasDropdown: false
    }
  ];

  // Gestion de l'ouverture/fermeture du dropdown avec délai
  const handleMouseEnter = (categoryId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(categoryId);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    timeoutRef.current = setTimeout(() => {
      if (!isHovering) {
        setActiveDropdown(null);
      }
    }, 200);
  };

  // Nettoyage du timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Fermeture du menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-black text-white font-gotham-book relative z-30" ref={dropdownRef}>
      {/* Container principal */}
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto">
        
        {/* Menu principal - Desktop uniquement */}
        <div className="hidden lg:flex">
          <ul className="flex w-full">
            {categories.filter(cat => cat.id !== 'promotions').map((category) => (
              <li 
                key={category.id}
                className="relative"
                onMouseEnter={() => category.hasDropdown && handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={category.href}
                  className={`
                    block px-6 py-4 text-sm font-semibold uppercase tracking-wide
                    transition-colors duration-200 hover:bg-orange-600 hover:text-white
                    ${activeDropdown === category.id ? 'bg-orange-600 text-white' : 'text-white'}
                    border-r border-gray-800 last:border-r-0
                  `}
                >
                  {category.name}
                  {category.hasDropdown && (
                    <svg 
                      className="inline-block ml-1 w-3 h-3" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Mega Menu Dropdown - SIMPLIFIÉ */}
                {category.hasDropdown && activeDropdown === category.id && (
                  <div className="absolute left-0 top-full bg-white shadow-2xl border border-gray-200 min-w-[900px] z-50">
                    <div className="p-6">
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.subcategories?.map((subcategory) => (
                          <div key={subcategory.id} className="space-y-3">
                            {/* Titre de sous-catégorie */}
                            <Link
                              href={subcategory.href}
                              className="group block"
                            >
                              <h3 className="text-gray-900 font-bold text-base group-hover:text-orange-600 transition-colors duration-200 border-b border-gray-200 pb-2 mb-3">
                                {subcategory.name}
                              </h3>
                            </Link>

                            {/* Sous-sous-catégories */}
                            {subcategory.subsubcategories && (
                              <ul className="space-y-2">
                                {subcategory.subsubcategories.map((subsubcategory) => (
                                  <li key={subsubcategory.id}>
                                    <Link
                                      href={subsubcategory.href}
                                      className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm block py-1 hover:pl-2 transition-all"
                                    >
                                      {subsubcategory.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            
            {/* PROMOTIONS - Séparé et aligné à droite en orange */}
            <li className="ml-auto">
              <Link
                href="/promotions"
                className="block px-6 py-4 text-sm font-bold uppercase tracking-wide bg-orange-600 text-white hover:bg-orange-700 transition-colors duration-200 relative overflow-hidden group"
              >
                <span className="relative z-10">PROMOTIONS</span>
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Menu mobile - Simplifié */}
        <div className="lg:hidden">
          <div className="px-4 py-3">
            <select 
              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm"
              onChange={(e) => {
                if (e.target.value) {
                  window.location.href = e.target.value;
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>Choisir une catégorie</option>
              {categories.map((category) => (
                <optgroup key={category.id} label={category.name}>
                  <option value={category.href}>Voir tout - {category.name}</option>
                  {category.subcategories?.map((sub) => (
                    <React.Fragment key={sub.id}>
                      <option value={sub.href}>{sub.name}</option>
                      {sub.subsubcategories?.map((subsub) => (
                        <option key={subsub.id} value={subsub.href}>
                          ⮚ {subsub.name}
                        </option>
                      ))}
                    </React.Fragment>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;