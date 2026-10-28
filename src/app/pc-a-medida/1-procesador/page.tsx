'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';
import { useState } from 'react';

function ProcesadorContent() {
  const { profile, setStep, setProcessor } = useConfigStore();
  const router = useRouter();
  const [selectedProcessor, setSelectedProcessor] = useState<string | null>(null);

  const processors = [
    {
      id: 'amd-7600x',
      name: 'AMD Ryzen 5 7600X',
      price: '299€',
      cores: '6 cores / 12 threads',
      baseClock: '4.7 GHz',
      boostClock: '5.3 GHz',
      tdp: '105W',
      socket: 'AM5',
      description: 'Excelente para gaming y productividad general',
      image: '/cpu-amd-7600x.jpg',
      recommended: profile === 'Esports 1080p' || profile === 'Ofimática Silenciosa'
    },
    {
      id: 'amd-7700x',
      name: 'AMD Ryzen 7 7700X',
      price: '399€',
      cores: '8 cores / 16 threads',
      baseClock: '4.5 GHz',
      boostClock: '5.4 GHz',
      tdp: '105W',
      socket: 'AM5',
      description: 'Perfecto para gaming de alta gama y multitarea',
      image: '/cpu-amd-7700x.jpg',
      recommended: profile === '4K Ultra' || profile === 'Edición Vídeo'
    },
    {
      id: 'amd-7800x3d',
      name: 'AMD Ryzen 7 7800X3D',
      price: '449€',
      cores: '8 cores / 16 threads',
      baseClock: '4.2 GHz',
      boostClock: '5.0 GHz',
      tdp: '120W',
      socket: 'AM5',
      description: 'El mejor para gaming competitivo con cache 3D',
      image: '/cpu-amd-7800x3d.jpg',
      recommended: profile === 'Esports 1080p'
    },
    {
      id: 'amd-7950x',
      name: 'AMD Ryzen 9 7950X',
      price: '699€',
      cores: '16 cores / 32 threads',
      baseClock: '4.5 GHz',
      boostClock: '5.7 GHz',
      tdp: '170W',
      socket: 'AM5',
      description: 'Ideal para edición de video y renderizado',
      image: '/cpu-amd-7950x.jpg',
      recommended: profile === 'Edición Vídeo' || profile === 'IA/LLM'
    },
    {
      id: 'intel-14600k',
      name: 'Intel Core i5-14600K',
      price: '329€',
      cores: '14 cores / 20 threads',
      baseClock: '3.5 GHz',
      boostClock: '5.3 GHz',
      tdp: '125W',
      socket: 'LGA1700',
      description: 'Excelente rendimiento gaming y productividad',
      image: '/cpu-intel-14600k.jpg',
      recommended: profile === 'Esports 1080p'
    },
    {
      id: 'intel-14700k',
      name: 'Intel Core i7-14700K',
      price: '449€',
      cores: '20 cores / 28 threads',
      baseClock: '3.4 GHz',
      boostClock: '5.6 GHz',
      tdp: '125W',
      socket: 'LGA1700',
      description: 'Perfecto para gaming de alta gama y streaming',
      image: '/cpu-intel-14700k.jpg',
      recommended: profile === '4K Ultra' || profile === 'Edición Vídeo'
    }
  ];

  const handleSelectProcessor = (processorId: string) => {
    setSelectedProcessor(processorId);
    setProcessor(processorId);
  };

  const handleNext = () => {
    if (selectedProcessor) {
      setStep(2);
      router.push('/pc-a-medida/2-placa-base');
    }
  };

  const handleBack = () => {
    router.push('/pc-a-medida');
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
            Volver al asistente
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center font-bold text-lg text-white">
              1
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="text-neutral-900">
                  Selecciona tu Procesador
                </span>
              </h1>
              <p className="text-lg text-neutral-600">
                El cerebro de tu PC. Elegimos según tu perfil: <strong>{profile}</strong>
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-neutral-100 rounded-full h-2 mb-6">
            <div className="bg-neutral-900 h-2 rounded-full text-white" style={{ width: '12.5%' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Información del perfil */}
        {profile && (
          <div className="mb-8 rounded-2xl border border-blue-300 bg-neutral-50 p-6">
            <h2 className="text-xl font-bold mb-2">🎯 Recomendaciones para tu perfil</h2>
            <p className="text-neutral-700">
              Basándonos en tu perfil <strong>{profile}</strong>, hemos seleccionado los procesadores más adecuados. 
              Los marcados con ⭐ son especialmente recomendados para ti.
            </p>
          </div>
        )}

        {/* Grid de procesadores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {processors.map((processor) => (
            <button
              key={processor.id}
              onClick={() => handleSelectProcessor(processor.id)}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-105 ${
                selectedProcessor === processor.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100'
              }`}
            >
              {/* Badge recomendado */}
              {processor.recommended && (
                <div className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Recomendado
                </div>
              )}

              {/* Imagen del procesador */}
              <div className="aspect-square w-full rounded-xl bg-neutral-50 mb-4 flex items-center justify-center">
                <div className="text-4xl">⚙️</div>
              </div>

              {/* Nombre y precio */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{processor.name}</h3>
                <span className="text-blue-600 font-bold">{processor.price}</span>
              </div>

              {/* Especificaciones */}
              <div className="space-y-1 mb-3">
                <div className="text-sm text-neutral-500">• {processor.cores}</div>
                <div className="text-sm text-neutral-500">• Base: {processor.baseClock}</div>
                <div className="text-sm text-neutral-500">• Boost: {processor.boostClock}</div>
                <div className="text-sm text-neutral-500">• TDP: {processor.tdp}</div>
                <div className="text-sm text-neutral-500">• Socket: {processor.socket}</div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-neutral-600 mb-4">{processor.description}</p>

              {/* Botón de selección */}
              <div className="mt-4">
                <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedProcessor === processor.id
                    ? 'bg-blue-600 text-black'
                    : 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200'
                }`}>
                  {selectedProcessor === processor.id ? 'Seleccionado' : 'Seleccionar'}
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
            disabled={!selectedProcessor}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedProcessor
                ? 'bg-neutral-900 text-white hover:bg-neutral-700 hover-lift hover-glow'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="text-lg font-bold mb-4">💡 ¿Necesitas ayuda?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">¿Qué procesador elegir?</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• <strong>Gaming:</strong> AMD 7800X3D o Intel 14700K</li>
                <li>• <strong>Productividad:</strong> AMD 7950X o Intel 14700K</li>
                <li>• <strong>Presupuesto:</strong> AMD 7600X o Intel 14600K</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">Overclocking incluido</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Perfiles seguros pre-configurados</li>
                <li>• Validación térmica completa</li>
                <li>• Garantía de estabilidad</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcesadorPage() {
  return (
    <ConfiguratorProvider>
      <ProcesadorContent />
    </ConfiguratorProvider>
  );
}












