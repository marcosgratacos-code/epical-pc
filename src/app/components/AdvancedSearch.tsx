"use client";

// Componente de búsqueda avanzada con filtros múltiples

import { useState, useMemo, useEffect } from 'react';
import { Product } from '../lib/products';

interface AdvancedSearchProps {
  products: Product[];
  onFilteredProducts: (products: Product[]) => void;
}

interface FilterState {
  search: string;
  priceRange: [number, number];
  gpu: string;
  ram: string;
  storage: string;
  inStock: boolean | null;
  sortBy: 'name' | 'price' | 'rating';
  sortOrder: 'asc' | 'desc';
}

export default function AdvancedSearch({ products, onFilteredProducts }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: [0, 3000],
    gpu: 'all',
    ram: 'all',
    storage: 'all',
    inStock: null,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const [showFilters, setShowFilters] = useState(false);

  // Opciones de filtros extraídas de los productos
  const filterOptions = useMemo(() => {
    const gpus = new Set<string>();
    const rams = new Set<string>();
    const storages = new Set<string>();

    products.forEach(product => {
      product.specs.forEach(spec => {
        const specLower = spec.toLowerCase();
        
        // Detectar GPUs
        if (specLower.includes('rtx') || specLower.includes('gtx')) {
          const gpuMatch = specLower.match(/(rtx|gtx)\s*(\d+)/);
          if (gpuMatch) {
            gpus.add(`${gpuMatch[1].toUpperCase()} ${gpuMatch[2]}`);
          }
        }
        
        // Detectar RAM
        if (specLower.includes('gb') && (specLower.includes('ddr') || specLower.includes('ram'))) {
          const ramMatch = specLower.match(/(\d+)\s*gb/i);
          if (ramMatch) {
            rams.add(`${ramMatch[1]}GB`);
          }
        }
        
        // Detectar almacenamiento
        if (specLower.includes('ssd') || specLower.includes('hdd') || specLower.includes('nvme')) {
          const storageMatch = specLower.match(/(\d+)\s*(gb|tb)/i);
          if (storageMatch) {
            storages.add(`${storageMatch[1]}${storageMatch[2].toUpperCase()}`);
          }
        }
      });
    });

    return {
      gpus: Array.from(gpus).sort(),
      rams: Array.from(rams).sort((a, b) => parseInt(a) - parseInt(b)),
      storages: Array.from(storages).sort((a, b) => {
        const aNum = parseInt(a);
        const bNum = parseInt(b);
        const aUnit = a.includes('TB') ? 1000 : 1;
        const bUnit = b.includes('TB') ? 1000 : 1;
        return (aNum * aUnit) - (bNum * bUnit);
      })
    };
  }, [products]);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Búsqueda por texto
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(searchLower) ||
          product.specs.some(spec => spec.toLowerCase().includes(searchLower)) ||
          (product.desc && product.desc.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Filtro de precio
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Filtro de GPU
      if (filters.gpu !== 'all') {
        const hasGpu = product.specs.some(spec => 
          spec.toLowerCase().includes(filters.gpu.toLowerCase())
        );
        if (!hasGpu) return false;
      }

      // Filtro de RAM
      if (filters.ram !== 'all') {
        const hasRam = product.specs.some(spec => 
          spec.toLowerCase().includes(filters.ram.toLowerCase())
        );
        if (!hasRam) return false;
      }

      // Filtro de almacenamiento
      if (filters.storage !== 'all') {
        const hasStorage = product.specs.some(spec => 
          spec.toLowerCase().includes(filters.storage.toLowerCase())
        );
        if (!hasStorage) return false;
      }

      // Filtro de stock
      if (filters.inStock !== null) {
        if (product.inStock !== filters.inStock) return false;
      }

      return true;
    });

    // Ordenar productos
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [products, filters]);

  // Notificar productos filtrados al componente padre
  useEffect(() => {
    onFilteredProducts(filteredProducts);
  }, [filteredProducts, onFilteredProducts]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      priceRange: [0, 3000],
      gpu: 'all',
      ram: 'all',
      storage: 'all',
      inStock: null,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const activeFiltersCount = [
    filters.search,
    filters.gpu !== 'all',
    filters.ram !== 'all',
    filters.storage !== 'all',
    filters.inStock !== null,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 3000
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda principal */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar productos por nombre, especificaciones..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
          <svg className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-xl border transition-all ${
            showFilters || activeFiltersCount > 0
              ? 'bg-blue-100 text-blue-600 border-blue-300'
              : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
          }`}
        >
          🔧 Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </button>
      </div>

      {/* Panel de filtros avanzados */}
      {showFilters && (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 space-y-6 animate-fade-in-scale">
          {/* Filtros de precio */}
          <div>
            <label className="block text-sm font-medium text-neutral-500 mb-3">
              Rango de Precio: {filters.priceRange[0]}€ - {filters.priceRange[1]}€
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={filters.priceRange[0]}
                onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={filters.priceRange[1]}
                onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Filtros de especificaciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* GPU */}
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-2">GPU</label>
              <select
                value={filters.gpu}
                onChange={(e) => updateFilter('gpu', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Todas las GPUs</option>
                {filterOptions.gpus.map(gpu => (
                  <option key={gpu} value={gpu}>{gpu}</option>
                ))}
              </select>
            </div>

            {/* RAM */}
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-2">RAM</label>
              <select
                value={filters.ram}
                onChange={(e) => updateFilter('ram', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Toda la RAM</option>
                {filterOptions.rams.map(ram => (
                  <option key={ram} value={ram}>{ram}</option>
                ))}
              </select>
            </div>

            {/* Almacenamiento */}
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-2">Almacenamiento</label>
              <select
                value={filters.storage}
                onChange={(e) => updateFilter('storage', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Todo el almacenamiento</option>
                {filterOptions.storages.map(storage => (
                  <option key={storage} value={storage}>{storage}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtro de stock */}
          <div>
            <label className="block text-sm font-medium text-neutral-500 mb-2">Disponibilidad</label>
            <div className="flex gap-2">
              <button
                onClick={() => updateFilter('inStock', null)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  filters.inStock === null
                    ? 'bg-blue-100 text-blue-600 border border-blue-300'
                    : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => updateFilter('inStock', true)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  filters.inStock === true
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                En Stock
              </button>
              <button
                onClick={() => updateFilter('inStock', false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  filters.inStock === false
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                Sin Stock
              </button>
            </div>
          </div>

          {/* Ordenamiento */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-neutral-500">Ordenar por:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
              <option value="rating">Valoración</option>
            </select>
            <button
              onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 hover:bg-neutral-100 transition-all"
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4 border-t border-neutral-200">
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-all text-sm font-medium"
            >
              Limpiar Filtros
            </button>
            <div className="flex-1 text-right text-sm text-neutral-500">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
