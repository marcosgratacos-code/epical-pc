'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';
import { useState } from 'react';

function CajaContent() {
  const { profile, setStep, setCase } = useConfigStore();
  const router = useRouter();
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const cases = [
    {
      id: 'case-mid-tower-rgb',
      name: 'Corsair iCUE 4000X RGB',
      price: '149€',
      type: 'Mid Tower',
      fans: '3x 120mm RGB',
      rgb: 'RGB',
      glass: 'Tempered Glass',
      description: 'Perfecta para gaming con RGB',
      image: '/case-corsair-4000x.jpg',
      recommended: profile === 'Esports 1080p' || profile === '4K Ultra'
    },
    {
      id: 'case-full-tower-premium',
      name: 'Fractal Design Torrent',
      price: '199€',
      type: 'Full Tower',
      fans: '2x 180mm + 3x 140mm',
      rgb: 'No RGB',
      glass: 'Tempered Glass',
      description: 'Máximo flujo de aire y silencio',
      image: '/case-fractal-torrent.jpg',
      recommended: profile === 'Ofimática Silenciosa' || profile === 'Edición Vídeo'
    },
    {
      id: 'case-mid-tower-premium',
      name: 'Lian Li O11 Dynamic EVO',
      price: '179€',
      type: 'Mid Tower',
      fans: 'Sin ventiladores',
      rgb: 'ARGB',
      glass: 'Tempered Glass',
      description: 'Ideal para custom loops y estética',
      image: '/case-lianli-o11.jpg',
      recommended: profile === 'IA/LLM' || profile === 'Edición Vídeo'
    },
    {
      id: 'case-mini-itx',
      name: 'NZXT H1 V2',
      price: '299€',
      type: 'Mini ITX',
      fans: '1x 140mm AIO',
      rgb: 'RGB',
      glass: 'Tempered Glass',
      description: 'Compacta con refrigeración incluida',
      image: '/case-nzxt-h1.jpg',
      recommended: profile === 'Ofimática Silenciosa'
    },
    {
      id: 'case-mid-tower-budget',
      name: 'Cooler Master MasterBox TD500',
      price: '89€',
      type: 'Mid Tower',
      fans: '3x 120mm RGB',
      rgb: 'RGB',
      glass: 'Tempered Glass',
      description: 'Excelente relación calidad-precio',
      image: '/case-cm-td500.jpg',
      recommended: profile === 'Esports 1080p'
    },
    {
      id: 'case-full-tower-extreme',
      name: 'Corsair Obsidian 1000D',
      price: '499€',
      type: 'Super Tower',
      fans: 'Sin ventiladores',
      rgb: 'ARGB',
      glass: 'Tempered Glass',
      description: 'Máximo espacio para configuraciones extremas',
      image: '/case-corsair-1000d.jpg',
      recommended: profile === 'IA/LLM'
    }
  ];

  const handleSelectCase = (caseId: string) => {
    setSelectedCase(caseId);
    setCase(caseId);
  };

  const handleNext = () => {
    if (selectedCase) {
      setStep(9);
      router.push('/pc-a-medida/resumen');
    }
  };

  const handleBack = () => {
    router.push('/pc-a-medida/7-fuente');
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a fuente
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center font-bold text-lg text-white">
              8
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="text-neutral-900">
                  Selecciona tu Caja
                </span>
              </h1>
              <p className="text-lg text-neutral-600">
                El hogar perfecto para tu PC
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-neutral-100 rounded-full h-2 mb-6">
            <div className="bg-neutral-900 h-2 rounded-full text-white" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Información del perfil */}
        <div className="mb-8 rounded-2xl border border-blue-300 bg-neutral-50 p-6">
          <h2 className="text-xl font-bold mb-2">📦 Recomendaciones de caja</h2>
          <p className="text-neutral-700">
            Basándonos en tu perfil <strong>{profile}</strong>, hemos seleccionado las cajas más adecuadas. 
            Los marcados con ⭐ son especialmente recomendados para ti.
          </p>
        </div>

        {/* Grid de cajas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cases.map((caseItem) => (
            <button
              key={caseItem.id}
              onClick={() => handleSelectCase(caseItem.id)}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-105 ${
                selectedCase === caseItem.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100'
              }`}
            >
              {/* Badge recomendado */}
              {caseItem.recommended && (
                <div className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Recomendado
                </div>
              )}

              {/* Imagen de la caja */}
              <div className="aspect-video w-full rounded-xl bg-neutral-50 mb-4 flex items-center justify-center">
                <div className="text-4xl">📦</div>
              </div>

              {/* Nombre y precio */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{caseItem.name}</h3>
                <span className="text-blue-600 font-bold">{caseItem.price}</span>
              </div>

              {/* Especificaciones */}
              <div className="space-y-1 mb-3">
                <div className="text-sm text-neutral-500">• Tipo: {caseItem.type}</div>
                <div className="text-sm text-neutral-500">• Ventiladores: {caseItem.fans}</div>
                <div className="text-sm text-neutral-500">• RGB: {caseItem.rgb}</div>
                <div className="text-sm text-neutral-500">• Cristal: {caseItem.glass}</div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-neutral-600 mb-4">{caseItem.description}</p>

              {/* Botón de selección */}
              <div className="mt-4">
                <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedCase === caseItem.id
                    ? 'bg-blue-600 text-black'
                    : 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200'
                }`}>
                  {selectedCase === caseItem.id ? 'Seleccionado' : 'Seleccionar'}
                </div>
              </div>

              {/* Gradiente decorativo */}
              <div className="absolute inset-0 rounded-2xl bg-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 transition-all text-neutral-700 hover:text-neutral-900"
          >
            ← Volver
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedCase}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedCase
                ? 'bg-neutral-900 text-white hover:bg-neutral-700 hover-lift hover-glow'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
          >
            Ver Resumen →
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="text-lg font-bold mb-4">💡 ¿Qué caja elegir?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">Por tamaño:</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• <strong>Mini ITX:</strong> Compacta, perfecta para espacios reducidos</li>
                <li>• <strong>Mid Tower:</strong> Equilibrio perfecto, la más popular</li>
                <li>• <strong>Full Tower:</strong> Máximo espacio, refrigeración avanzada</li>
                <li>• <strong>Super Tower:</strong> Configuraciones extremas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">Características incluidas:</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Montaje profesional incluido</li>
                <li>• Cableado perfecto y organizado</li>
                <li>• Configuración RGB completa</li>
                <li>• Garantía de montaje de 3 años</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CajaPage() {
  return (
    <ConfiguratorProvider>
      <CajaContent />
    </ConfiguratorProvider>
  );
}












