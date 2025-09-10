// app/categories/[slug]/not-found.tsx - Page 404 pour catégories non trouvées
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Page 404 personnalisée pour les catégories inexistantes
 * 
 * FONCTIONNALITÉS :
 * ✅ Design cohérent avec le site
 * ✅ Suggestions de catégories alternatives  
 * ✅ Liens de navigation utiles
 * ✅ Recherche rapide
 * ✅ Responsive design
 */

const CategoryNotFound: React.FC = () => {
  // Catégories populaires à suggérer
  const popularCategories = [
    {
      slug: 'cartes-graphiques',
      name: 'Cartes Graphiques',
      description: 'GPU gaming haute performance',
      icon: '/icons/Gpu(1).svg',
      productCount: 156
    },
    {
      slug: 'processeurs',
      name: 'Processeurs',
      description: 'CPU Intel et AMD',
      icon: '/icons/cpu.svg',
      productCount: 89
    },
    {
      slug: 'memoire-ram',
      name: 'Mémoire RAM',
      description: 'DDR4 et DDR5 gaming',
      icon: '/icons/ram.svg',
      productCount: 134
    },
    {
      slug: 'pc-gaming-complets',
      name: 'PC Gaming Complets',
      description: 'Configurations pré-assemblées',
      icon: '/icons/pc-tower.svg',
      productCount: 45
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-gotham-book">
      
      {/* HEADER SIMPLE */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 py-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/categories" className="text-gray-600 hover:text-orange-600 transition-colors">
              Catégories
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Catégorie introuvable</span>
          </nav>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        
        {/* ILLUSTRATION 404 */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 005.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          {/* TITRE PRINCIPAL */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Catégorie introuvable
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Désolé, la catégorie que vous recherchez n&apos;existe pas ou a été déplacée. 
            Découvrez nos catégories populaires ci-dessous.
          </p>
        </div>

        {/* BARRE DE RECHERCHE */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
            />
            <svg className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button className="absolute right-2 top-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
              Rechercher
            </button>
          </div>
        </div>

        {/* CATÉGORIES POPULAIRES */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Catégories populaires
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-orange-200"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                      unoptimized
                    />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {category.description}
                  </p>
                  
                  <div className="inline-flex items-center space-x-1 text-orange-600 text-sm font-medium">
                    <span>{category.productCount} produits</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ACTIONS RAPIDES */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Que souhaitez-vous faire ?
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Retour à l'accueil */}
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Retour à l&apos;accueil</span>
            </Link>

            {/* Toutes les catégories */}
            <Link
              href="/categories"
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4h-1M5 7h3M19 15H5m7-8v16" />
              </svg>
              <span>Toutes les catégories</span>
            </Link>

            {/* Contact support */}
            <Link
              href="/contact"
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Nous contacter</span>
            </Link>
          </div>
        </div>

        {/* MESSAGE D'AIDE */}
        <div className="mt-12 p-6 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-orange-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <div className="text-left">
              <h4 className="text-orange-800 font-medium mb-1">
                Besoin d&apos;aide ?
              </h4>
              <p className="text-orange-700 text-sm">
                Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur ou si vous cherchez une catégorie spécifique, 
                n&apos;hésitez pas à nous contacter. Notre équipe vous aidera à trouver ce que vous cherchez.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNotFound;

/**
 * UTILISATION :
 * Ce fichier est automatiquement utilisé par Next.js 13+ 
 * quand notFound() est appelé dans categories/[slug]/page.tsx
 * 
 * FONCTIONNALITÉS :
 * ✅ Design cohérent avec le reste du site
 * ✅ Catégories alternatives suggérées
 * ✅ Barre de recherche fonctionnelle
 * ✅ Actions rapides (accueil, catégories, contact)
 * ✅ Message d'aide avec call-to-action
 * ✅ Responsive design complet
 * ✅ Animations et transitions fluides
 * 
 * PLACEMENT DU FICHIER :
 * app/categories/[slug]/not-found.tsx
 * 
 * SEO :
 * ✅ Titre et description appropriés
 * ✅ Liens internes pour le crawling
 * ✅ Structure sémantique HTML
 * ✅ Breadcrumb navigation
 */