'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';
import { useState } from 'react';

function GraficaContent() {
  const { profile, setStep, setGraphics } = useConfigStore();
  const router = useRouter();
  const [selectedGraphics, setSelectedGraphics] = useState<string | null>(null);

  const graphicsCards = [
    {
      id: 'rtx-4060',
      name: 'NVIDIA RTX 4060',
      price: '299€',
      vram: '8GB GDDR6',
      bus: '128-bit',
      cores: '3072 CUDA',
      baseClock: '1830 MHz',
      boostClock: '2460 MHz',
      tdp: '115W',
      description: 'Perfecta para gaming 1080p y streaming',
      image: '/gpu-rtx-4060.jpg',
      recommended: profile === 'Esports 1080p' || profile === 'Ofimática Silenciosa'
    },
    {
      id: 'rtx-4070',
      name: 'NVIDIA RTX 4070',
      price: '599€',
      vram: '12GB GDDR6X',
      bus: '192-bit',
      cores: '5888 CUDA',
      baseClock: '1920 MHz',
      boostClock: '2475 MHz',
      tdp: '200W',
      description: 'Excelente para gaming 1440p y ray tracing',
      image: '/gpu-rtx-4070.jpg',
      recommended: profile === 'Esports 1080p' || profile === '4K Ultra'
    },
    {
      id: 'rtx-4070-ti',
      name: 'NVIDIA RTX 4070 Ti',
      price: '799€',
      vram: '12GB GDDR6X',
      bus: '192-bit',
      cores: '7680 CUDA',
      baseClock: '2310 MHz',
      boostClock: '2610 MHz',
      tdp: '285W',
      description: 'Ideal para gaming 1440p ultra y 4K',
      image: '/gpu-rtx-4070-ti.jpg',
      recommended: profile === '4K Ultra' || profile === 'Edición Vídeo'
    },
    {
      id: 'rtx-4080',
      name: 'NVIDIA RTX 4080',
      price: '1199€',
      vram: '16GB GDDR6X',
      bus: '256-bit',
      cores: '9728 CUDA',
      baseClock: '2210 MHz',
      boostClock: '2505 MHz',
      tdp: '320W',
      description: 'Perfecta para gaming 4K y trabajo profesional',
      image: '/gpu-rtx-4080.jpg',
      recommended: profile === '4K Ultra' || profile === 'Edición Vídeo'
    },
    {
      id: 'rtx-4090',
      name: 'NVIDIA RTX 4090',
      price: '1599€',
      vram: '24GB GDDR6X',
      bus: '384-bit',
      cores: '16384 CUDA',
      baseClock: '2230 MHz',
      boostClock: '2520 MHz',
      tdp: '450W',
      description: 'Flagship para gaming 4K extremo y IA',
      image: '/gpu-rtx-4090.jpg',
      recommended: profile === 'IA/LLM' || profile === 'Edición Vídeo'
    },
    {
      id: 'rtx-5090',
      name: 'NVIDIA RTX 5090',
      price: '1999€',
      vram: '32GB GDDR7',
      bus: '512-bit',
      cores: '21760 CUDA',
      baseClock: '2400 MHz',
      boostClock: '2700 MHz',
      tdp: '500W',
      description: 'La GPU más potente del mercado',
      image: '/gpu-rtx-5090.jpg',
      recommended: profile === 'IA/LLM'
    },
    {
      id: 'rx-7800-xt',
      name: 'AMD RX 7800 XT',
      price: '499€',
      vram: '16GB GDDR6',
      bus: '256-bit',
      cores: '3840 Stream',
      baseClock: '2124 MHz',
      boostClock: '2430 MHz',
      tdp: '263W',
      description: 'Excelente relación calidad-precio para gaming',
      image: '/gpu-rx-7800-xt.jpg',
      recommended: profile === 'Esports 1080p' || profile === '4K Ultra'
    },
    {
      id: 'rx-7900-xtx',
      name: 'AMD RX 7900 XTX',
      price: '999€',
      vram: '24GB GDDR6',
      bus: '384-bit',
      cores: '6144 Stream',
      baseClock: '1900 MHz',
      boostClock: '2500 MHz',
      tdp: '355W',
      description: 'Flagship AMD para gaming 4K y trabajo creativo',
      image: '/gpu-rx-7900-xtx.jpg',
      recommended: profile === 'Edición Vídeo' || profile === 'IA/LLM'
    }
  ];

  const handleSelectGraphics = (graphicsId: string) => {
    setSelectedGraphics(graphicsId);
    setGraphics(graphicsId);
  };

  const handleNext = () => {
    if (selectedGraphics) {
      setStep(5);
      router.push('/pc-a-medida/5-almacenamiento');
    }
  };

  const handleBack = () => {
    router.push('/pc-a-medida/3-memoria');
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
            Volver a memoria
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center font-bold text-lg text-white">
              4
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="text-neutral-900">
                  Selecciona tu Tarjeta Gráfica
                </span>
              </h1>
              <p className="text-lg text-neutral-600">
                El corazón del gaming y el rendimiento visual
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-neutral-100 rounded-full h-2 mb-6">
            <div className="bg-neutral-900 h-2 rounded-full text-white" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Información del perfil */}
        <div className="mb-8 rounded-2xl border border-blue-300 bg-neutral-50 p-6">
          <h2 className="text-xl font-bold mb-2">🎮 Recomendaciones de GPU</h2>
          <p className="text-neutral-700">
            Basándonos en tu perfil <strong>{profile}</strong>, hemos seleccionado las tarjetas gráficas más adecuadas. 
            Los marcados con ⭐ son especialmente recomendados para ti.
          </p>
        </div>

        {/* Grid de tarjetas gráficas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {graphicsCards.map((gpu) => (
            <button
              key={gpu.id}
              onClick={() => handleSelectGraphics(gpu.id)}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-105 ${
                selectedGraphics === gpu.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100'
              }`}
            >
              {/* Badge recomendado */}
              {gpu.recommended && (
                <div className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Recomendado
                </div>
              )}

              {/* Imagen de la GPU */}
              <div className="aspect-video w-full rounded-xl bg-neutral-50 mb-4 flex items-center justify-center">
                <div className="text-4xl">🎨</div>
              </div>

              {/* Nombre y precio */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{gpu.name}</h3>
                <span className="text-blue-600 font-bold">{gpu.price}</span>
              </div>

              {/* Especificaciones */}
              <div className="space-y-1 mb-3">
                <div className="text-sm text-neutral-500">• VRAM: {gpu.vram}</div>
                <div className="text-sm text-neutral-500">• Bus: {gpu.bus}</div>
                <div className="text-sm text-neutral-500">• Cores: {gpu.cores}</div>
                <div className="text-sm text-neutral-500">• Base: {gpu.baseClock}</div>
                <div className="text-sm text-neutral-500">• Boost: {gpu.boostClock}</div>
                <div className="text-sm text-neutral-500">• TDP: {gpu.tdp}</div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-neutral-600 mb-4">{gpu.description}</p>

              {/* Botón de selección */}
              <div className="mt-4">
                <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedGraphics === gpu.id
                    ? 'bg-blue-600 text-black'
                    : 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200'
                }`}>
                  {selectedGraphics === gpu.id ? 'Seleccionado' : 'Seleccionar'}
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
            disabled={!selectedGraphics}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedGraphics
                ? 'bg-neutral-900 text-white hover:bg-neutral-700 hover-lift hover-glow'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="text-lg font-bold mb-4">💡 ¿Qué GPU elegir?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">Por resolución:</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• <strong>1080p:</strong> RTX 4060, RX 7800 XT</li>
                <li>• <strong>1440p:</strong> RTX 4070, RTX 4070 Ti</li>
                <li>• <strong>4K:</strong> RTX 4080, RTX 4090</li>
                <li>• <strong>IA/Workstation:</strong> RTX 4090, RTX 5090</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">Características incluidas:</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Overclocking seguro pre-configurado</li>
                <li>• Ray Tracing y DLSS/FSR</li>
                <li>• RGB personalizable</li>
                <li>• Garantía extendida de 3 años</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GraficaPage() {
  return (
    <ConfiguratorProvider>
      <GraficaContent />
    </ConfiguratorProvider>
  );
}












