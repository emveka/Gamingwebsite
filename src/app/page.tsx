// src/app/page.tsx
'use client'

import TopHeader from '@/components/layout/TopHeader';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import ProductSection from '@/components/layout/ProductSection';
import PCGamerSection from '@/components/layout/PCGamerSection';
import ImageSection from '@/components/layout/ImageSection';
import ComponentsSection from '@/components/layout/ComponentsSection';

/**
 * Page d'accueil principale avec sections ImageSection multiples
 * 
 * STRUCTURE DE LA PAGE :
 * 1. TopHeader - Bande informative
 * 2. Header - Navigation principale
 * 3. NavBar - Menu catégories
 * 4. Banner - Hero image
 * 5. CategorySection - Catégories produits
 * 6. ProductSection - Grille produits
 * 7. ImageSection 1 - Périphériques Gaming (existante)
 * 8. PCGamerSection - Section PC Gaming
 * 9. ImageSection 2 - Nouvelle section (composants)
 * 10. ComponentsSection - Section composants détaillée
 */
export default function Home() {
  
  // PREMIÈRE SECTION D'IMAGES - Périphériques Gaming (existante)
  const peripheriquesImages = [
    {
      id: "gaming-chair",
      src: "/images/chairgaming.webp",
      alt: "Chaise Gaming",
      title: "Chaise Gaming",
      subtitle: "Améliorez votre confort de jeu"
    },
    {
      id: "gaming-desk", 
      src: "/images/desk1.webp",
      alt: "Bureau Gaming",
      title: "Bureau Gaming", 
      subtitle: "Bureaux et tables pour gamers"
    },
    {
      id: "gaming-keyboard",
      src: "/images/keyboard.webp",
      alt: "Clavier Gaming",
      title: "Claviers Gaming",
      subtitle: "Claviers mécaniques Ducky"
    }
  ];

  // DEUXIÈME SECTION D'IMAGES - Composants PC (nouvelle)
  const composantsImages = [
    {
      id: "motherboards",
      src: "/images/motherboards.webp",
      alt: "Carte mère",
      title: "Motherboards",
      subtitle: "Cartes Mères Gaming"
    },
    {
      id: "processor",
      src: "/images/gpu123.webp", 
      alt: "Processeur Intel",
      title: "Cartes Graphiques",
      subtitle: "GPU - Cartes Graphiques"
    },
    {
      id: "memory-ram",
      src: "/images/cpu123.webp",
      alt: "Mémoire RAM Gaming",
      title: "Processurs",
      subtitle: "CPU - Performance Gaming"
    }
  ];

  // TROISIÈME SECTION D'IMAGES - Moniteurs et Audio (optionnelle)
  const moniteursAudioImages = [
    {
      id: "gaming-monitor",
      src: "/images/monitor-4k.webp",
      alt: "Écran Gaming 4K",
      title: "Écrans Gaming",
      subtitle: "Moniteurs 4K 144Hz"
    },
    {
      id: "gaming-headset",
      src: "/images/headset-steelseries.webp",
      alt: "Casque Gaming",
      title: "Casques Audio",
      subtitle: "SteelSeries - Son immersif"
    },
    {
      id: "gaming-speakers",
      src: "/images/speakers-logitech.webp",
      alt: "Haut-parleurs Gaming",
      title: "Haut-parleurs",
      subtitle: "Logitech G - Audio premium"
    }
  ];

  /**
   * Gestionnaire de navigation pour les sections d'images
   * @param imageId - ID de l'image cliquée
   * @param sectionType - Type de section (peripheriques, composants, moniteurs)
   */
  const handleImageClick = (imageId: string, sectionType: string = 'default') => {
    console.log(`Navigation vers: ${imageId} dans la section: ${sectionType}`);
    
    // Logique de navigation basée sur le type de section
    switch (sectionType) {
      case 'peripheriques':
        // Navigation vers les périphériques
        // router.push(`/peripheriques/${imageId}`);
        break;
      case 'composants':
        // Navigation vers les composants
        // router.push(`/composants/${imageId}`);
        break;
      case 'moniteurs-audio':
        // Navigation vers moniteurs et audio
        // router.push(`/audio-video/${imageId}`);
        break;
      default:
        // Navigation générale
        // router.push(`/category/${imageId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HEADER SECTIONS ===== */}
      
      {/* TopHeader - Bande noire avec informations livraison */}
      <TopHeader />
      
      {/* Header principal - Logo, navigation, recherche */}
      <Header />
      
      {/* NavBar - Menu de catégories avec mega menu */}
      <NavBar />
      
      {/* ===== CONTENU PRINCIPAL ===== */}
      
      {/* Banner - Image hero principale */}
      <Banner />

      {/* CategorySection - Grille des catégories principales */}
      <CategorySection />

      {/* ProductSection - Sélection de produits en vedette */}
      <ProductSection />


    
      {/* PCGamerSection - Section spécialisée PC Gaming */}
      <PCGamerSection />

{/* ===== DEUXIÈME SECTION D'IMAGES - COMPOSANTS ===== */}
      <ImageSection
        title="COMPOSANTS HAUTE PERFORMANCE"
        subtitle="Les meilleurs composants pour construire votre PC gaming ultime"
        images={composantsImages}
        onImageClick={(imageId) => handleImageClick(imageId, 'composants')}
      />

      {/* ComponentsSection - Section détaillée des composants */}
      <ComponentsSection />


      {/* ===== PREMIÈRE SECTION D'IMAGES - PÉRIPHÉRIQUES ===== */}
      <ImageSection
        title="PERIPHERIQUES GAMING"
        subtitle="Découvrez notre gamme complète d'équipements gaming professionnels pour améliorer votre setup"
        images={peripheriquesImages}
        onImageClick={(imageId) => handleImageClick(imageId, 'peripheriques')}
      />



      {/* ===== TROISIÈME SECTION D'IMAGES - MONITEURS & AUDIO (OPTIONNELLE) ===== */}
      {/* Décommentez cette section si vous voulez une troisième section d'images */}
      {/*
      <ImageSection
        title="MONITEURS & AUDIO GAMING"
        subtitle="Une expérience visuelle et sonore exceptionnelle pour vos sessions gaming"
        images={moniteursAudioImages}
        onImageClick={(imageId) => handleImageClick(imageId, 'moniteurs-audio')}
      />
      */}
    </div>
  );
}

/**
 * NOTES TECHNIQUES ET BONNES PRATIQUES :
 * 
 * 1. ORGANISATION DES DONNÉES :
 *    - Chaque section a ses propres données d'images
 *    - Noms de variables explicites (peripheriquesImages, composantsImages)
 *    - Structure cohérente pour tous les objets image
 * 
 * 2. GESTION DE LA NAVIGATION :
 *    - Fonction handleImageClick centralisée
 *    - Paramètre sectionType pour différencier les sections
 *    - Logique de navigation modulaire et extensible
 * 
 * 3. STRUCTURE DE LA PAGE :
 *    - Sections clairement séparées par des commentaires
 *    - Ordre logique : Header → Contenu → Sections spécialisées
 *    - Possibilité d'ajouter/retirer des sections facilement
 * 
 * 4. PERFORMANCE :
 *    - Réutilisation du même composant ImageSection
 *    - Pas de duplication de code
 *    - Chargement optimisé des images
 * 
 * 5. MAINTENANCE :
 *    - Code modulaire et lisible
 *    - Commentaires explicites
 *    - Structure extensible pour futures sections
 */