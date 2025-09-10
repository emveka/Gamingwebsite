// src/components/product/ProductDescription.tsx
'use client'
import React from 'react';
import Image from 'next/image';
import { ComponentProduct } from '@/types/product';
import PCGamerSection from './PCGamerSection';

interface ProductDescriptionProps {
  product: ComponentProduct;
}

/**
 * Composant ProductDescription - Description détaillée avec sections multiples
 * 
 * FONCTIONNALITÉS :
 * - Section PC Gamer spécialisée (composant séparé)
 * - Titre marketing dynamique par catégorie
 * - Sections avec images et contenu alternés
 * - Vidéo YouTube ou MP4 intégrée
 * - Métriques de performance
 * - Design responsive et moderne
 */
const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  
  // Helper pour extraire l'ID YouTube d'une URL
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      // youtu.be/VIDEO_ID
      if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
      // youtube.com/watch?v=VIDEO_ID
      const v = u.searchParams.get('v');
      if (v) return v;
      // youtube.com/embed/VIDEO_ID
      const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (m) return m[1];
    } catch {}
    return null;
  };

  // Titre marketing dynamique selon la catégorie
  const getMarketingTitle = () => {
    switch (product.category) {
      case 'GPU': return 'Hautes performances graphiques pour les jeux jusqu\'en 4K';
      case 'CPU': return 'Performances exceptionnelles pour gaming et création';
      case 'RAM': return 'Mémoire haute performance pour gaming extrême';
      case 'Storage': return 'Stockage ultra-rapide nouvelle génération';
      case 'Motherboard': return 'Plateforme gaming premium pour enthusiasts';
      case 'Peripherals': return 'Périphérique gaming professionnel';
      case 'PCGamer': return 'Configuration gaming haute performance assemblée';
      default: return 'Performance et qualité exceptionnelles';
    }
  };

  return (
    <div className="bg-gray-50 py-8 lg:py-12">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          
          {/* SECTION PC GAMER - Composant séparé */}
          <PCGamerSection product={product} />
          
          {/* DESCRIPTION PRINCIPALE */}
          <div className="p-6 lg:p-8">
            <div className="space-y-12">
              
              {/* TITRE PRINCIPAL MARKETING */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center bg-gray-50 border border-gray-300 px-10 py-2 shadow-sm">
                  <div className="w-20 h-16 flex items-center justify-center">
                    <Image
                      src={`/images/brands/Marque_MSI.webp`}
                      alt={`Logo ${product.brand}`}
                      width={80}
                      height={64}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {getMarketingTitle()}
                </h1>
              </div>

              {/* DESCRIPTION PRINCIPALE */}
              <div className="bg-gray-50 rounded-xl p-6 lg:p-8">
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="text-base lg:text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* SECTIONS DÉTAILLÉES */}
              <div className="space-y-12 lg:space-y-16">
                
                {/* SECTION 1 - PRÉSENTATION PRODUIT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h2>
                      <h3 className="text-lg text-orange-600 font-medium mb-4">
                        Performance et efficacité réunies
                      </h3>
                      <div className="prose max-w-none text-gray-700">
                        <p className="text-base leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula consectetur sem, 
                          at tempor nulla tincidunt eu. Nullam facilisis augue vel ante congue, sed cursus nulla 
                          ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        "Architecture de nouvelle génération",
                        "Technologies de pointe intégrées", 
                        "Optimisations gaming avancées",
                        "Support des dernières technologies",
                        "Efficacité énergétique améliorée"
                      ].map((highlight, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-3">Spécifications clés</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {Object.entries(product.specifications).slice(0, 4).map(([key, value], i) => (
                          <div key={i} className="flex justify-between py-1">
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/1.webp"
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* SECTION 2 - TECHNOLOGIE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:grid-flow-col-dense">
                  <div className="space-y-6 lg:col-start-2">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        Technologies de pointe
                      </h2>
                      <h3 className="text-lg text-orange-600 font-medium mb-4">
                        Innovation et performance
                      </h3>
                      <div className="prose max-w-none text-gray-700">
                        <p className="text-base leading-relaxed">
                          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                          laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
                          architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas 
                          sit aspernatur aut odit aut fugit.
                        </p>
                      </div>
                    </div>

                    {/* Performances spécifiques GPU */}
                    {product.category === 'GPU' && (
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                        <h4 className="font-bold text-gray-900 mb-3">Performances en jeu</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { name: "Cyberpunk 2077", fps: "85", settings: "Ultra 4K RTX" },
                            { name: "Call of Duty", fps: "120", settings: "High 1440p" },
                            { name: "Fortnite", fps: "165", settings: "Epic 1440p" }
                          ].map((game, i) => (
                            <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">🎮</span>
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{game.name}</div>
                                  <div className="text-sm text-gray-600">{game.settings}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-orange-600">{game.fps}</div>
                                <div className="text-xs text-gray-500">FPS</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-start-1 lg:row-start-1">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src="/images/1.webp"
                        alt="Technologies avancées"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3 - OPTIMISATIONS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        Optimisations avancées
                      </h2>
                      <h3 className="text-lg text-orange-600 font-medium mb-4">
                        Maximum de performances
                      </h3>
                      <div className="prose max-w-none text-gray-700">
                        <p className="text-base leading-relaxed">
                          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium 
                          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati 
                          cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">+35%</div>
                        <div className="text-sm text-gray-600">Performance</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">-20%</div>
                        <div className="text-sm text-gray-600">Consommation</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">85°C</div>
                        <div className="text-sm text-gray-600">Temp. max</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">30dB</div>
                        <div className="text-sm text-gray-600">Silence</div>
                      </div>
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-white">
                    <Image
                      src="/images/1.webp"
                      alt="Optimisations performances"
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50/20 to-transparent"></div>
                  </div>
                </div>

                {/* SECTION 4 - LECTEUR VIDÉO */}
                <div className="p-6 lg:p-2">
                  {(() => {
                    const ytId = getYouTubeId(product.videoUrl);
                    if (ytId) {
                      // Lecture YouTube via iframe
                      return (
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            className="absolute inset-0 w-full h-full rounded-lg bg-black"
                            src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1&controls=1`}
                            title={product.name + ' - vidéo produit'}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                          />
                        </div>
                      );
                    }

                    // Sinon: si c'est un lien direct MP4/HLS, utiliser <video>
                    if (product.videoUrl) {
                      const isMp4 = product.videoUrl.toLowerCase().includes('.mp4');
                      const isWebm = product.videoUrl.toLowerCase().includes('.webm');
                      const mime = isMp4 ? 'video/mp4' : isWebm ? 'video/webm' : 'video/mp4';

                      return (
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <video
                            className="absolute inset-0 w-full h-full rounded-lg object-cover bg-black"
                            controls
                            preload="metadata"
                            poster={product.images?.[0] || '/images/1.webp'}
                          >
                            <source src={product.videoUrl} type={mime} />
                            Votre navigateur ne supporte pas les vidéos HTML5.
                          </video>
                        </div>
                      );
                    }

                    // Fallback si pas de vidéo
                    return (
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg">
                          <div className="text-center">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            <p>Aucune vidéo disponible pour ce produit.</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;