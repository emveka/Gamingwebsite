// src/components/layout/TopHeader.tsx - Version sans sélecteur FR

import React from 'react';

/**
 * TopHeader Component avec police Gotham Rounded Book
 * 
 * Utilise la police Gotham Rounded Book pour un look professionnel
 * Rectangle orange avec effet de découpe
 * Typographie optimisée pour l'e-commerce
 * Centrage vertical parfait et typographie renforcée
 * Version sans sélecteur de langue FR
 */

const TopHeader: React.FC = () => {
  return (
    <div className="w-full bg-black text-white relative overflow-visible font-gotham-book">
      {/* Container principal avec hauteur responsive */}
      <div className="w-full h-8 md:h-8 flex items-center justify-between px-2 sm:px-4 md:px-6 relative">
        
        {/* Layout Desktop (md et plus) */}
        <div className="hidden md:flex w-full items-center justify-between">
          {/* Partie gauche : vide pour équilibrer */}
          <div className="flex-1"></div>
          
          {/* Partie centrale : Message centré */}
          <div className="flex-1 flex justify-center items-center">
            <span className="text-topbar font-semibold tracking-wide uppercase antialiased leading-none">
              Livraison gratuite à partir de 800 DH
            </span>
          </div>

          {/* Partie droite : Rectangle orange uniquement */}
          <div className="flex-1 flex items-center justify-end h-full">
            <button className="bg-orange-600 hover:bg-orange-600 h-8 px-4 text-topbar font-semibold tracking-wide uppercase text-white transition-colors duration-200 relative antialiased flex items-center">
              <span className="relative z-10 leading-none">ACCÈS REVENDEUR</span>     
            </button>
            {/* Espace noir pour maintenir la position */}
            <div className="w-12"></div>
          </div>
        </div>

        {/* Layout Mobile (sm et moins) */}
        <div className="flex md:hidden w-full items-center relative">
          {/* Partie gauche : espace pour équilibrer le bouton */}
          <div className="flex-1"></div>
          
          {/* Message parfaitement centré sur mobile */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase antialiased leading-none">
              Livraison gratuite dès 800 DH
            </span>
          </div>

          {/* Bouton orange positionné à droite */}
          <div className="flex-1 flex items-center justify-end h-full">
            <button className="bg-orange-600 hover:bg-orange-600 h-8 px-2 sm:px-3 text-xs font-semibold tracking-wide uppercase text-white transition-colors duration-200 relative antialiased flex items-center pointer-events-auto">
              <span className="relative z-10 leading-none">REVENDEUR</span>     
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;