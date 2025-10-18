'use client';

import { useState, useEffect, useMemo } from 'react';
import { PartCategory, CPU, Motherboard, RAM, GPU, Storage, PSU, Case, Cooler } from '@/types/parts';
import { getPartsByCategory } from '@/lib/parts-data';
import { useConfigStore } from '@/store/configurator';
import PartCard from './PartCard';
import CompareModal from './CompareModal';

interface PartPickerProps {
  category: PartCategory;
  onSelect: (part: any) => void;
  selectedId?: string;
}

export default function PartPicker({ category, onSelect, selectedId }: PartPickerProps) {
  const [parts, setParts] = useState<any[]>([]);
  const [filteredParts, setFilteredParts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'perf'>('recommended');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [compareList, setCompareList] = useState<any[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  
  const { build } = useConfigStore();

  // Cargar partes
  useEffect(() => {
    const data = getPartsByCategory(category);
    setParts(data);
  }, [category]);

  // Filtrar y ordenar
  useEffect(() => {
    let result = [...parts];

    // Búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query)
      );
    }

    // Filtros específicos por categoría
    if (category === 'cpu' && build.mb) {
      result = result.filter((p: CPU) => p.socket === build.mb!.socket);
    }

    if (category === 'mb' && build.cpu) {
      result = result.filter((p: Motherboard) => p.socket === build.cpu!.socket);
    }

    if (category === 'ram' && build.mb) {
      result = result.filter((p: RAM) => p.ramGen === build.mb!.ramGen);
    }

    if (category === 'cooler' && build.cpu) {
      result = result.filter((p: Cooler) => p.compatibleSockets.includes(build.cpu!.socket));
    }

    // Filtros de precio
    if (filters.priceMin) {
      result = result.filter(p => p.price.eur >= filters.priceMin);
    }
    if (filters.priceMax) {
      result = result.filter(p => p.price.eur <= filters.priceMax);
    }

    // Filtros específicos
    if (filters.ramGen) {
      result = result.filter((p: any) => p.ramGen === filters.ramGen);
    }

    if (filters.wifi) {
      result = result.filter((p: Motherboard) => p.wifi === filters.wifi);
    }

    if (filters.type) {
      result = result.filter((p: any) => p.type === filters.type);
    }

    // Ordenar
    switch (orderBy) {
      case 'recommended':
        result.sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0));
        break;
      case 'price_asc':
        result.sort((a, b) => a.price.eur - b.price.eur);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price.eur - a.price.eur);
        break;
      case 'perf':
        // Heurística simple de rendimiento
        if (category === 'cpu') {
          result.sort((a: CPU, b: CPU) => (b.cores * b.boostGHz) - (a.cores * a.boostGHz));
        } else if (category === 'gpu') {
          result.sort((a: GPU, b: GPU) => b.vramGB - a.vramGB);
        }
        break;
    }

    setFilteredParts(result);
  }, [parts, searchQuery, orderBy, filters, category, build]);

  const handleCompareToggle = (part: any) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === part.id);
      if (exists) {
        return prev.filter(p => p.id !== part.id);
      }
      if (prev.length >= 3) {
        return prev; // Máximo 3
      }
      return [...prev, part];
    });
  };

  // Detalles específicos por tipo
  const renderDetails = (part: any) => {
    switch (category) {
      case 'cpu':
        const cpu = part as CPU;
        return (
          <>
            <div>• {cpu.cores}C / {cpu.threads}T</div>
            <div>• Hasta {cpu.boostGHz} GHz</div>
            <div>• TDP {cpu.tdpW}W</div>
            {cpu.has3DCache && <div>• 3D V-Cache</div>}
          </>
        );
      
      case 'mb':
        const mb = part as Motherboard;
        return (
          <>
            <div>• Chipset {mb.chipset}</div>
            <div>• {mb.ramGen} hasta {mb.ramMaxMHz} MHz</div>
            <div>• PCIe {mb.pcieX16Gen}.0</div>
            {mb.wifi && <div>• {mb.wifi}</div>}
          </>
        );
      
      case 'ram':
        const ram = part as RAM;
        return (
          <>
            <div>• {ram.capacityGB}GB ({ram.kit})</div>
            <div>• {ram.mhz} MHz CL{ram.cl}</div>
            <div>• {ram.expoXmp}</div>
            {ram.rgb && <div>• RGB</div>}
          </>
        );
      
      case 'gpu':
        const gpu = part as GPU;
        return (
          <>
            <div>• {gpu.vramGB}GB VRAM</div>
            {gpu.tgpW && <div>• TGP {gpu.tgpW}W</div>}
            <div>• PCIe {gpu.pcieGen}.0</div>
            {gpu.lengthMM && <div>• {gpu.lengthMM}mm largo</div>}
          </>
        );
      
      case 'storage':
        const storage = part as Storage;
        return (
          <>
            <div>• {storage.capacityTB}TB {storage.type}</div>
            {storage.readMBs && <div>• Lectura {storage.readMBs} MB/s</div>}
            {storage.pcieGen && <div>• Gen{storage.pcieGen}</div>}
          </>
        );
      
      case 'psu':
        const psu = part as PSU;
        return (
          <>
            <div>• {psu.watts}W</div>
            <div>• {psu.standard}</div>
            <div>• 80+ {psu.efficiency80}</div>
            {psu.pcie5_12vhpwr && <div>• PCIe 5.0 12VHPWR</div>}
          </>
        );
      
      case 'case':
        const caseP = part as Case;
        return (
          <>
            {caseP.maxGpuLenMM && <div>• GPU hasta {caseP.maxGpuLenMM}mm</div>}
            {caseP.supports360Rad && <div>• Soporta AIO 360mm</div>}
            <div>• {caseP.fansIncluded} ventiladores incl.</div>
          </>
        );
      
      case 'cooler':
        const cooler = part as Cooler;
        return (
          <>
            <div>• {cooler.type === 'AIO' ? `AIO ${cooler.radMM}mm` : 'Aire'}</div>
            {cooler.tdpSupportW && <div>• Hasta {cooler.tdpSupportW}W TDP</div>}
            <div>• Compatible {cooler.compatibleSockets.join(', ')}</div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Barra de herramientas */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-4">
        {/* Búsqueda */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o marca..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500"
            />
          </div>

          {compareList.length > 0 && (
            <button
              onClick={() => setShowCompare(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold hover:bg-cyan-500/30 transition-colors"
            >
              Comparar ({compareList.length})
            </button>
          )}
        </div>

        {/* Ordenar */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-white/60">Ordenar:</span>
          <div className="flex gap-2">
            {[
              { value: 'recommended', label: 'Recomendado' },
              { value: 'price_asc', label: 'Precio ↑' },
              { value: 'price_desc', label: 'Precio ↓' },
              { value: 'perf', label: 'Rendimiento' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setOrderBy(option.value as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  orderBy === option.value
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtros rápidos (ejemplo simple) */}
        <div className="flex items-center gap-3 text-sm">
          <span className="text-white/60">Precio:</span>
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin || ''}
            onChange={(e) => setFilters({ ...filters, priceMin: e.target.value ? Number(e.target.value) : undefined })}
            className="w-24 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white"
          />
          <span className="text-white/40">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax || ''}
            onChange={(e) => setFilters({ ...filters, priceMax: e.target.value ? Number(e.target.value) : undefined })}
            className="w-24 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white"
          />
        </div>
      </div>

      {/* Resultados */}
      <div className="text-sm text-white/60 mb-4">
        {filteredParts.length} {filteredParts.length === 1 ? 'resultado' : 'resultados'}
      </div>

      {/* Grid de productos */}
      {filteredParts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => (
            <PartCard
              key={part.id}
              part={part}
              selected={selectedId === part.id}
              onSelect={() => onSelect(part)}
              onCompare={() => handleCompareToggle(part)}
              isComparing={compareList.some(p => p.id === part.id)}
              details={renderDetails(part)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-block h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <svg className="h-10 w-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-white/60">No se encontraron productos con estos filtros</p>
        </div>
      )}

      {/* Modal de comparación */}
      {showCompare && (
        <CompareModal
          parts={compareList}
          category={category}
          onClose={() => setShowCompare(false)}
          onSelect={(part) => {
            onSelect(part);
            setShowCompare(false);
            setCompareList([]);
          }}
        />
      )}
    </div>
  );
}

