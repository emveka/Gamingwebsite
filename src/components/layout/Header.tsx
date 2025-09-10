"use client";

// src/components/layout/Header.tsx - Header principal e-commerce

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Header Component - Navigation principale
 * 
 * Structure complète pour e-commerce avec :
 * - Logo responsive
 * - Menu de navigation principal
 * - Barre de recherche
 * - Icônes utilisateur/panier
 * - Menu mobile avec hamburger
 * - Design cohérent avec le TopHeader
 */

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 font-gotham-book relative z-40">
      {/* Container principal */}
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Layout Mobile - Logo parfaitement centré */}
          <div className="flex lg:hidden w-full items-center relative">
            {/* Menu hamburger à gauche */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
              aria-label="Menu principal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo parfaitement centré */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <Link href="/" className="flex items-center pointer-events-auto">
                <div className="w-32 h-8 bg-gradient-to-r from-orange-600 to-orange-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg uppercase tracking-wider">
                    LOGO
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Layout Desktop - Logo + Barre de recherche en haut */}
          <div className="hidden lg:flex w-full items-center justify-between">
            {/* Logo Desktop */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="w-40 h-10 bg-gradient-to-r from-orange-600 to-orange-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xl uppercase tracking-wider">
                    LOGO
                  </span>
                </div>
              </Link>
            </div>

            {/* Barre de recherche desktop centrée */}
            <div className="flex-1 flex justify-center px-8">
              <div className="relative max-w-lg w-full">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Section droite - Icônes utilisateur/panier */}
            <div className="flex items-center space-x-4">
              {/* Icône utilisateur - Gaming Avatar SVG */}
              <button className="p-2 hover:opacity-80 transition-opacity relative" aria-label="Mon compte">
                <Image
                  src="/images/gaming-avatar.svg"
                  alt="Mon compte"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>

              {/* Icône panier - Gaming Cart SVG */}
              <button className="p-2 hover:opacity-80 transition-opacity relative" aria-label="Panier">
                <Image
                  src="/images/gaming-cart.svg"
                  alt="Panier"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                
                {/* Badge compteur */}
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche globale sous le header - Mobile uniquement */}
      <div className="lg:hidden w-full bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-1.5">
          <div className="relative max-w-xl mx-auto">
            <div className="relative">
              <svg className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Manchette Gaming..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-xs placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/produits"
              className="block text-gray-700 hover:text-orange-600 font-medium text-base uppercase tracking-wide transition-colors py-2"
            >
              Produits
            </Link>
            <Link
              href="/categories"
              className="block text-gray-700 hover:text-orange-600 font-medium text-base uppercase tracking-wide transition-colors py-2"
            >
              Catégories
            </Link>
            <Link
              href="/promotions"
              className="block text-gray-700 hover:text-orange-600 font-medium text-base uppercase tracking-wide transition-colors py-2"
            >
              Promotions
            </Link>
            <Link
              href="/marques"
              className="block text-gray-700 hover:text-orange-600 font-medium text-base uppercase tracking-wide transition-colors py-2"
            >
              Marques
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-orange-600 font-medium text-base uppercase tracking-wide transition-colors py-2"
            >
              Contact
            </Link>
            
            {/* Section utilisateur mobile */}
            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/compte"
                className="block text-gray-700 hover:text-orange-600 font-medium text-base transition-colors py-2"
              >
                Mon Compte
              </Link>
              <Link
                href="/commandes"
                className="block text-gray-700 hover:text-orange-600 font-medium text-base transition-colors py-2"
              >
                Mes Commandes
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;