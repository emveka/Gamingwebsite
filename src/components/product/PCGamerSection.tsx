// src/components/product/PCGamerSection.tsx - Version corrigée
'use client'
import React from 'react';
import Image from 'next/image';
import { ComponentProduct } from '@/types/product';

interface PCGamerSectionProps {
  product: ComponentProduct;
}

/**
 * Composant PCGamerSection - Section spécialisée pour les PC Gamer
 * 
 * FONCTIONNALITÉS :
 * - Affichage des composants avec icônes PNG
 * - Performances gaming par résolution
 * - Métriques FPS par jeu
 * - Design coloré et moderne
 * - Section séparée pour PC Gamer uniquement
 */
const PCGamerSection: React.FC<PCGamerSectionProps> = ({ product }) => {
  // Ne s'affiche que pour la catégorie PCGamer
  if (product.category !== 'PCGamer') {
    return null;
  }

  return (
    <div className="p-6 lg:p-8 mb-8 border-b border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* COLONNE GAUCHE - Composants avec images PNG */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Image
                src="/images/icons/cpu-icon.png"
                alt="Composants PC"
                width={24}
                height={24}
                className="filter brightness-0 invert"
                unoptimized
              />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
              Composants PC GAMER
            </h3>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                type: 'CPU', 
                name: 'Intel Core i9-14900KF', 
                iconPath: '/images/icons/processor.png',
                color: 'bg-blue-50 border-blue-200' 
              },
              { 
                type: 'GPU', 
                name: 'NVIDIA RTX 4080 16GB MSI', 
                iconPath: '/images/icons/graphics-card.png',
                color: 'bg-green-50 border-green-200' 
              },
              { 
                type: 'RAM', 
                name: '32GB DDR5-6000 Corsair', 
                iconPath: '/images/icons/memory.png',
                color: 'bg-purple-50 border-purple-200' 
              },
              { 
                type: 'Storage', 
                name: '2TB NVMe Samsung 980 PRO', 
                iconPath: '/images/icons/ssd.png',
                color: 'bg-yellow-50 border-yellow-200' 
              },
              { 
                type: 'Motherboard', 
                name: 'ASUS ROG Z790 Gaming', 
                iconPath: '/images/icons/motherboard.png',
                color: 'bg-red-50 border-red-200' 
              },
              { 
                type: 'PSU', 
                name: '850W Gold+ Modular', 
                iconPath: '/images/icons/power-supply.png',
                color: 'bg-gray-50 border-gray-200' 
              }
            ].map((component, index) => (
              <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg border-2 ${component.color} transition-all duration-300 hover:shadow-md`}>
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border shadow-sm">
                  <Image
                    src={component.iconPath}
                    alt={`Icône ${component.type}`}
                    width={28}
                    height={28}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {component.type}
                  </div>
                  <div className="font-semibold text-gray-900 text-sm lg:text-base">
                    {component.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLONNE DROITE - Performances avec couleurs neutres */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Image
                src="/images/icons/performance.png"
                alt="Performances Gaming"
                width={24}
                height={24}
                className="filter brightness-0 invert"
                unoptimized
              />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
              Performances Gaming
            </h3>
          </div>

          <div className="space-y-6">
            {[
              { 
                resolution: '4K Ultra Settings',
                iconPath: '/images/icons/4k-gaming.png',
                bgColor: 'bg-red-50',
                textColor: 'text-red-800',
                borderColor: 'border-red-200',
                games: [
                  { name: 'Cyberpunk 2077', fps: '75', quality: 'RTX Ultra + DLSS 3' },
                  { name: 'Call of Duty MW3', fps: '95', quality: 'Ultra + RTX' },
                  { name: 'Fortnite', fps: '120+', quality: 'Epic + RTX' }
                ]
              },
              { 
                resolution: '1440p Ultra Settings',
                iconPath: '/images/icons/1440p-gaming.png',
                bgColor: 'bg-green-50',
                textColor: 'text-green-800',
                borderColor: 'border-green-200',
                games: [
                  { name: 'Cyberpunk 2077', fps: '110', quality: 'RTX Ultra + DLSS 3' },
                  { name: 'Call of Duty MW3', fps: '140', quality: 'Ultra + RTX' },
                  { name: 'Fortnite', fps: '180+', quality: 'Epic + RTX' }
                ]
              }
            ].map((resolutionGroup, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                <div className={`${resolutionGroup.bgColor} ${resolutionGroup.borderColor} rounded-lg p-3 border`}>
                  <h4 className={`font-bold ${resolutionGroup.textColor} text-sm uppercase tracking-wide flex items-center space-x-2`}>
                    <Image
                      src={resolutionGroup.iconPath}
                      alt={resolutionGroup.resolution}
                      width={20}
                      height={20}
                      className="object-contain"
                      unoptimized
                    />
                    <span>{resolutionGroup.resolution}</span>
                  </h4>
                </div>
                
                <div className="space-y-2">
                  {resolutionGroup.games.map((game, gameIndex) => (
                    <div key={gameIndex} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                          <Image
                            src="/images/icons/gaming-controller.png"
                            alt="Gaming"
                            width={20}
                            height={20}
                            className="filter brightness-0 invert"
                            unoptimized
                          />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{game.name}</div>
                          <div className="text-xs text-gray-600">{game.quality}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">{game.fps}</div>
                        <div className="text-xs text-gray-500 font-medium">FPS</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Badge performances avec couleurs neutres */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Image
                src="/images/icons/verified.png"
                alt="Certifié"
                width={20}
                height={20}
                className="object-contain"
                unoptimized
              />
              <span className="text-green-800 font-bold text-sm">Performances certifiées</span>
            </div>
            <p className="text-green-700 text-sm">
              Tests en laboratoire • Derniers drivers • Optimisations gaming activées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCGamerSection;