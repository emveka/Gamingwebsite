'use client'
import React from 'react';

// Interfaces pour les filtres
interface CategoryFilter {
  type: 'brand' | 'price' | 'specs' | 'availability';
  name: string;
  options: FilterOption[];
}

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface FiltersSectionProps {
  filters: CategoryFilter[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, value: string, checked: boolean) => void;
  onClearFilters: (filterType?: string) => void;
  isMobile?: boolean;
  showFilters?: boolean;
  onCloseFilters?: () => void;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  isMobile = false,
  showFilters = false,
  onCloseFilters
}) => {
  // Contenu des filtres (réutilisé pour desktop et mobile)
  const FiltersContent = () => (
    <>
      {/* Header Filtres avec actions */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
        <div className="flex items-center space-x-3">
          {Object.keys(selectedFilters).length > 0 && (
            <button
              onClick={() => onClearFilters()}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Tout effacer
            </button>
          )}
          {/* Bouton fermer pour mobile */}
          {isMobile && onCloseFilters && (
            <button
              onClick={onCloseFilters}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* FILTRES DYNAMIQUES */}
      {filters.map((filter, index) => (
        <div 
          key={filter.type} 
          className={index < filters.length - 1 ? 'border-b border-gray-200' : ''}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900">{filter.name}</h4>
              {selectedFilters[filter.type]?.length > 0 && (
                <button
                  onClick={() => onClearFilters(filter.type)}
                  className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                >
                  Effacer
                </button>
              )}
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filter.options.map((option) => (
                <label 
                  key={option.value} 
                  className="flex items-center cursor-pointer hover:bg-gray-50 rounded px-1 py-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters[filter.type]?.includes(option.value) || false}
                    onChange={(e) => onFilterChange(filter.type, option.value, e.target.checked)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded flex-shrink-0"
                  />
                  <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Footer pour mobile */}
      {isMobile && (
        <>
          {/* Bouton effacer tout mobile */}
          {Object.keys(selectedFilters).length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  onClearFilters();
                  onCloseFilters?.();
                }}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Effacer tous les filtres
              </button>
            </div>
          )}

          {/* Bouton appliquer pour mobile */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onCloseFilters}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Appliquer les filtres
            </button>
          </div>
        </>
      )}
    </>
  );

  // Version desktop (sticky sidebar)
  if (!isMobile) {
    return (
      <div className="w-56 flex-shrink-0 hidden lg:block">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
          <FiltersContent />
        </div>
      </div>
    );
  }

  // Version mobile (overlay)
  if (!showFilters) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onCloseFilters}
      />
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
        <FiltersContent />
      </div>
    </div>
  );
};

export default FiltersSection;