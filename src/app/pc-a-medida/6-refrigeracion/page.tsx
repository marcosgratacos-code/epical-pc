'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';
import { useState } from 'react';

function RefrigeracionContent() {
  const { profile, setStep, setCooling } = useConfigStore();
  const router = useRouter();
  const [selectedCooling, setSelectedCooling] = useState<string | null>(null);

  const coolingOptions = [
    {
      id: 'aio-240mm',
      name: 'Corsair iCUE H100i RGB Elite',
      price: '149€',
      type: 'AIO 240mm',
      fans: '2x 120mm RGB',
      noise: '26 dB',
      rgb: 'RGB',
      description: 'Perfecto para gaming y overclocking moderado',
      image: '/cooling-corsair-h100i.jpg',
      recommended: profile === 'Esports 1080p' || profile === '4K Ultra'
    },
    {
      id: 'aio-280mm',
      name: 'NZXT Kraken X63 RGB',
      price: '179€',
      type: 'AIO 280mm',
      fans: '2x 140mm RGB',
      noise: '24 dB',
      rgb: 'RGB',
      description: 'Excelente para CPUs de alta gama',
      image: '/cooling-nzxt-kraken.jpg',
      recommended: profile === '4K Ultra' || profile === 'Edición Vídeo'
    },
    {
      id: 'aio-360mm',
      name: 'ASUS ROG Ryujin II 360',
      price: '299€',
      type: 'AIO 360mm',
      fans: '3x 120mm RGB',
      noise: '22 dB',
      rgb: 'ARGB',
      description: 'Flagship para overclocking extremo',
      image: '/cooling-asus-ryujin.jpg',
      recommended: profile === 'IA/LLM' || profile === 'Edición Vídeo'
    },
    {
      id: 'air-premium',
      name: 'Noctua NH-D15 Chromax',
      price: '99€',
      type: 'Air Cooler',
      fans: '2x 140mm',
      noise: '19 dB',
      rgb: 'No RGB',
      description: 'Máximo silencio y rendimiento',
      image: '/cooling-noctua-nh-d15.jpg',
      recommended: profile === 'Ofimática Silenciosa'
    },
    {
      id: 'air-rgb',
      name: 'Cooler Master Hyper 212 RGB',
      price: '49€',
      type: 'Air Cooler',
      fans: '1x 120mm RGB',
      noise: '25 dB',
      rgb: 'RGB',
      description: 'Excelente relación calidad-precio',
      image: '/cooling-cm-hyper212.jpg',
      recommended: profile === 'Esports 1080p'
    },
    {
      id: 'custom-loop',
      name: 'Custom Loop Completo',
      price: '599€',
      type: 'Custom Loop',
      fans: '6x 120mm RGB',
      noise: '18 dB',
      rgb: 'ARGB',
      description: 'Máximo rendimiento y estética',
      image: '/cooling-custom-loop.jpg',
      recommended: profile === 'IA/LLM' || profile === 'Edición Vídeo'
    }
  ];

  const handleSelectCooling = (coolingId: string) => {
    setSelectedCooling(coolingId);
    setCooling(coolingId);
  };

  const handleNext = () => {
    if (selectedCooling) {
      setStep(7);
      router.push('/pc-a-medida/7-fuente');
    }
  };

  const handleBack = () => {
    router.push('/pc-a-medida/5-almacenamiento');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a almacenamiento
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-bold text-lg">
              6
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Selecciona tu Refrigeración
                </span>
              </h1>
              <p className="text-lg text-white/70">
                Mantén tu PC fresco y silencioso
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-violet-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Información del perfil */}
        <div className="mb-8 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6">
          <h2 className="text-xl font-bold mb-2">❄️ Recomendaciones de refrigeración</h2>
          <p className="text-white/80">
            Basándonos en tu perfil <strong>{profile}</strong>, hemos seleccionado las opciones de refrigeración más adecuadas. 
            Los marcados con ⭐ son especialmente recomendados para ti.
          </p>
        </div>

        {/* Grid de refrigeración */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {coolingOptions.map((cooling) => (
            <button
              key={cooling.id}
              onClick={() => handleSelectCooling(cooling.id)}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-105 ${
                selectedCooling === cooling.id 
                  ? 'border-cyan-500 bg-cyan-500/10' 
                  : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
              }`}
            >
              {/* Badge recomendado */}
              {cooling.recommended && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Recomendado
                </div>
              )}

              {/* Imagen de la refrigeración */}
              <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 mb-4 flex items-center justify-center">
                <div className="text-4xl">❄️</div>
              </div>

              {/* Nombre y precio */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{cooling.name}</h3>
                <span className="text-cyan-400 font-bold">{cooling.price}</span>
              </div>

              {/* Especificaciones */}
              <div className="space-y-1 mb-3">
                <div className="text-sm text-white/60">• Tipo: {cooling.type}</div>
                <div className="text-sm text-white/60">• Ventiladores: {cooling.fans}</div>
                <div className="text-sm text-white/60">• Ruido: {cooling.noise}</div>
                <div className="text-sm text-white/60">• RGB: {cooling.rgb}</div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-white/70 mb-4">{cooling.description}</p>

              {/* Botón de selección */}
              <div className="mt-4">
                <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedCooling === cooling.id
                    ? 'bg-cyan-500 text-black'
                    : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                }`}>
                  {selectedCooling === cooling.id ? 'Seleccionado' : 'Seleccionar'}
                </div>
              </div>

              {/* Gradiente decorativo */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-white/80 hover:text-white"
          >
            ← Volver
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedCooling}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedCooling
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:from-cyan-600 hover:to-violet-600 hover-lift hover-glow'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-lg font-bold mb-4">💡 ¿Qué refrigeración elegir?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Por tipo:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong>Air Cooler:</strong> Silencio máximo, fácil mantenimiento</li>
                <li>• <strong>AIO 240mm:</strong> Buen rendimiento, estética RGB</li>
                <li>• <strong>AIO 360mm:</strong> Máximo rendimiento, overclocking</li>
                <li>• <strong>Custom Loop:</strong> Estética extrema, máximo rendimiento</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Características incluidas:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Instalación profesional incluida</li>
                <li>• Configuración de curvas PWM</li>
                <li>• Sincronización RGB</li>
                <li>• Garantía extendida de 5 años</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RefrigeracionPage() {
  return (
    <ConfiguratorProvider>
      <RefrigeracionContent />
    </ConfiguratorProvider>
  );
}












