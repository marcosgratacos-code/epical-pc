// Sistema de comparación de productos

import { Product } from './products';

export interface Comparison {
  id: string;
  name: string;
  products: string[]; // IDs de productos
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'epical-comparisons';
const MAX_PRODUCTS = 3; // Máximo de productos a comparar

// Guardar comparación en localStorage
export function saveComparison(name: string, productIds: string[]): Comparison {
  if (typeof window === 'undefined') throw new Error('Solo disponible en cliente');
  
  const comparison: Comparison = {
    id: `comp-${Date.now()}`,
    name,
    products: productIds.slice(0, MAX_PRODUCTS),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const comparisons = getComparisons();
  comparisons.unshift(comparison);
  
  // Mantener solo las últimas 10 comparaciones
  const limited = comparisons.slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  
  return comparison;
}

// Obtener todas las comparaciones guardadas
export function getComparisons(): Comparison[] {
  if (typeof window === 'undefined') return [];
  
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

// Obtener una comparación por ID
export function getComparisonById(id: string): Comparison | null {
  const comparisons = getComparisons();
  return comparisons.find(c => c.id === id) || null;
}

// Eliminar una comparación
export function deleteComparison(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const comparisons = getComparisons();
  const filtered = comparisons.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

// Actualizar una comparación
export function updateComparison(id: string, name: string, productIds: string[]): Comparison | null {
  if (typeof window === 'undefined') return null;
  
  const comparisons = getComparisons();
  const index = comparisons.findIndex(c => c.id === id);
  
  if (index === -1) return null;
  
  comparisons[index] = {
    ...comparisons[index],
    name,
    products: productIds.slice(0, MAX_PRODUCTS),
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comparisons));
  return comparisons[index];
}

// Exportar comparación como JSON
export function exportComparison(comparison: Comparison, products: Product[]): string {
  const data = {
    comparison,
    products: products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      specs: p.specs,
      rating: p.rating,
      inStock: p.inStock
    })),
    exportedAt: new Date().toISOString()
  };
  
  return JSON.stringify(data, null, 2);
}

// Descargar comparación como archivo JSON
export function downloadComparisonAsJSON(comparison: Comparison, products: Product[]) {
  const jsonContent = exportComparison(comparison, products);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `comparacion-epical-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Comparar especificaciones entre productos
export interface ComparisonResult {
  category: string;
  products: {
    [productId: string]: {
      value: string;
      isBest: boolean;
    };
  };
}

export function compareSpecs(products: Product[]): ComparisonResult[] {
  if (products.length === 0) return [];
  
  const categories: { [key: string]: { [productId: string]: string } } = {};
  
  // Categorizar especificaciones
  products.forEach(product => {
    product.specs.forEach(spec => {
      const specLower = spec.toLowerCase();
      let category = 'Otras';
      
      if (specLower.includes('rtx') || specLower.includes('gtx') || specLower.includes('gpu')) {
        category = 'Tarjeta Gráfica';
      } else if (specLower.includes('ryzen') || specLower.includes('intel') || specLower.includes('cpu') || specLower.includes('procesador')) {
        category = 'Procesador';
      } else if (specLower.includes('gb') && (specLower.includes('ddr') || specLower.includes('ram'))) {
        category = 'Memoria RAM';
      } else if (specLower.includes('ssd') || specLower.includes('hdd') || specLower.includes('nvme') || specLower.includes('almacenamiento')) {
        category = 'Almacenamiento';
      } else if (specLower.includes('fuente') || specLower.includes('psu') || specLower.includes('w')) {
        category = 'Fuente de Alimentación';
      } else if (specLower.includes('refrigeración') || specLower.includes('cooler')) {
        category = 'Refrigeración';
      }
      
      if (!categories[category]) {
        categories[category] = {};
      }
      
      categories[category][product.id] = spec;
    });
  });
  
  // Convertir a formato de resultado
  const results: ComparisonResult[] = Object.entries(categories).map(([category, productSpecs]) => {
    const result: ComparisonResult = {
      category,
      products: {}
    };
    
    Object.entries(productSpecs).forEach(([productId, value]) => {
      result.products[productId] = {
        value,
        isBest: false // Por ahora, no determinamos cuál es el mejor
      };
    });
    
    return result;
  });
  
  return results;
}

// Determinar el mejor producto en cada categoría
export function determineBestInCategory(products: Product[], category: 'price' | 'performance' | 'value'): string {
  if (products.length === 0) return '';
  
  switch (category) {
    case 'price':
      // Menor precio
      return products.reduce((best, current) => 
        current.price < best.price ? current : best
      ).id;
      
    case 'performance':
      // Mayor rating
      return products.reduce((best, current) => 
        (current.rating || 0) > (best.rating || 0) ? current : best
      ).id;
      
    case 'value':
      // Mejor relación calidad-precio (rating / precio)
      return products.reduce((best, current) => {
        const currentValue = (current.rating || 0) / current.price;
        const bestValue = (best.rating || 0) / best.price;
        return currentValue > bestValue ? current : best;
      }).id;
      
    default:
      return products[0].id;
  }
}

// Calcular puntuación de producto
export function calculateProductScore(product: Product): number {
  let score = 0;
  
  // Precio (invertido - menor es mejor)
  score += Math.max(0, 100 - (product.price / 30));
  
  // Rating
  score += (product.rating || 0) * 20;
  
  // Disponibilidad
  if (product.inStock) score += 10;
  
  // Número de especificaciones (más es mejor)
  score += Math.min(20, product.specs.length * 2);
  
  return Math.round(score);
}

















