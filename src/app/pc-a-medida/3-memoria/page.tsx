'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';
import { useState } from 'react';

function MemoriaContent() {
  const { profile, setStep, setMemory } = useConfigStore();
  const router = useRouter();
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);

  const memoryKits = [
    {
      id: 'ddr5-32gb-6000',
      name: 'Corsair Vengeance DDR5-6000 32GB',
      price: '149€',
      capacity: '32GB (2x16GB)',
      speed: 'DDR5-6000',
      latency: 'CL30',
      voltage: '1.35V',
      description: 'Perfecto para gaming y multitarea general',
      image: '/ram-corsair-vengeance.jpg',
      recommended: profile === 'Esports 1080p' || profile === 'Ofimática Silenciosa'
    },
    {
      id: 'ddr5-64gb-6000',
      name: 'G.Skill Trident Z5 DDR5-6000 64GB',
      price: '299€',
      capacity: '64GB (2x32GB)',
      speed: 'DDR5-6000',
      latency: 'CL30',
      voltage: '1.35V',
      description: 'Ideal para edición de video y trabajo profesional',
      image: '/ram-gskill-trident.jpg',
      recommended: profile === 'Edición Vídeo' || profile === '4K Ultra'
    },
    {
      id: 'ddr5-32gb-7200',
      name: 'Corsair Dominator DDR5-7200 32GB',
      price: '249€',
      capacity: '32GB (2x16GB)',
      speed: 'DDR5-7200',
      latency: 'CL34',
      voltage: '1.4V',
      description: 'Máximo rendimiento para gaming competitivo',
      image: '/ram-corsair-dominator.jpg',
      recommended: profile === 'Esports 1080p'
    },
    {
      id: 'ddr5-96gb-5600',
      name: 'Kingston Fury DDR5-5600 96GB',
      price: '599€',
      capacity: '96GB (2x48GB)',
      speed: 'DDR5-5600',
      latency: 'CL40',
      voltage: '1.1V',
      description: 'Para IA, renderizado y aplicaciones intensivas',
      image: '/ram-kingston-fury.jpg',
      recommended: profile === 'IA/LLM' || profile === 'Edición Vídeo'
    },
    {
      id: 'ddr5-64gb-6400',
      name: 'G.Skill Ripjaws DDR5-6400 64GB',
      price: '399€',
      capacity: '64GB (2x32GB)',
      speed: 'DDR5-6400',
      latency: 'CL32',
      voltage: '1.35V',
      description: 'Excelente para streaming y contenido creativo',
      image: '/ram-gskill-ripjaws.jpg',
      recommended: profile === '4K Ultra' || profile === 'Edición Vídeo'
    },
    {
      id: 'ddr5-16gb-6000',
      name: 'Corsair Vengeance DDR5-6000 16GB',
      price: '89€',
      capacity: '16GB (2x8GB)',
      speed: 'DDR5-6000',
      latency: 'CL30',
      voltage: '1.35V',
      description: 'Presupuesto ajustado, suficiente para gaming básico',
      image: '/ram-corsair-16gb.jpg',
      recommended: profile === 'Ofimática Silenciosa'
    }
  ];

  const handleSelectMemory = (memoryId: string) => {
    setSelectedMemory(memoryId);
    setMemory(memoryId);
  };

  const handleNext = () => {
    if (selectedMemory) {
      setStep(4);
      router.push('/pc-a-medida/4-grafica');
    }
  };

  const handleBack = () => {
    router.push('/pc-a-medida/2-placa-base');
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
            Volver a placa base
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Selecciona tu Memoria RAM
                </span>
              </h1>
              <p className="text-lg text-white/70">
                DDR5 de alta velocidad para máximo rendimiento
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-violet-500 h-2 rounded-full" style={{ width: '37.5%' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Información del perfil */}
        <div className="mb-8 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6">
          <h2 className="text-xl font-bold mb-2">💾 Recomendaciones de memoria</h2>
          <p className="text-white/80">
            Basándonos en tu perfil <strong>{profile}</strong>, hemos seleccionado los kits de memoria más adecuados. 
            Los marcados con ⭐ son especialmente recomendados para ti.
          </p>
        </div>

        {/* Grid de memoria */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {memoryKits.map((memory) => (
            <button
              key={memory.id}
              onClick={() => handleSelectMemory(memory.id)}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-105 ${
                selectedMemory === memory.id 
                  ? 'border-cyan-500 bg-cyan-500/10' 
                  : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
              }`}
            >
              {/* Badge recomendado */}
              {memory.recommended && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Recomendado
                </div>
              )}

              {/* Imagen de la memoria */}
              <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 mb-4 flex items-center justify-center">
                <div className="text-4xl">💾</div>
              </div>

              {/* Nombre y precio */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{memory.name}</h3>
                <span className="text-cyan-400 font-bold">{memory.price}</span>
              </div>

              {/* Especificaciones */}
              <div className="space-y-1 mb-3">
                <div className="text-sm text-white/60">• Capacidad: {memory.capacity}</div>
                <div className="text-sm text-white/60">• Velocidad: {memory.speed}</div>
                <div className="text-sm text-white/60">• Latencia: {memory.latency}</div>
                <div className="text-sm text-white/60">• Voltaje: {memory.voltage}</div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-white/70 mb-4">{memory.description}</p>

              {/* Botón de selección */}
              <div className="mt-4">
                <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedMemory === memory.id
                    ? 'bg-cyan-500 text-black'
                    : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                }`}>
                  {selectedMemory === memory.id ? 'Seleccionado' : 'Seleccionar'}
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
            disabled={!selectedMemory}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedMemory
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:from-cyan-600 hover:to-violet-600 hover-lift hover-glow'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-lg font-bold mb-4">💡 ¿Cuánta memoria necesitas?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Por uso:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong>16GB:</strong> Gaming básico, ofimática</li>
                <li>• <strong>32GB:</strong> Gaming avanzado, streaming</li>
                <li>• <strong>64GB:</strong> Edición de video, renderizado</li>
                <li>• <strong>96GB+:</strong> IA, modelos grandes, HPC</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Características incluidas:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Perfiles XMP/EXPO pre-configurados</li>
                <li>• Overclocking seguro incluido</li>
                <li>• RGB sincronizable (si aplica)</li>
                <li>• Garantía de por vida</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MemoriaPage() {
  return (
    <ConfiguratorProvider>
      <MemoriaContent />
    </ConfiguratorProvider>
  );
}












