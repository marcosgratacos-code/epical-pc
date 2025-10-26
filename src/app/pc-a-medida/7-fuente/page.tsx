'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';
import { useState } from 'react';

function FuenteContent() {
  const { profile, setStep, setPowerSupply } = useConfigStore();
  const router = useRouter();
  const [selectedPowerSupply, setSelectedPowerSupply] = useState<string | null>(null);

  const powerSupplies = [
    {
      id: 'psu-750w-gold',
      name: 'Corsair RM750x Gold',
      price: '129€',
      wattage: '750W',
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      warranty: '10 años',
      description: 'Perfecta para gaming de gama media',
      image: '/psu-corsair-rm750x.jpg',
      recommended: profile === 'Esports 1080p' || profile === 'Ofimática Silenciosa'
    },
    {
      id: 'psu-850w-gold',
      name: 'Seasonic Focus GX-850',
      price: '149€',
      wattage: '850W',
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      warranty: '10 años',
      description: 'Ideal para gaming de alta gama',
      image: '/psu-seasonic-focus.jpg',
      recommended: profile === '4K Ultra' || profile === 'Edición Vídeo'
    },
    {
      id: 'psu-1000w-platinum',
      name: 'ASUS ROG Thor 1000W',
      price: '249€',
      wattage: '1000W',
      efficiency: '80+ Platinum',
      modular: 'Fully Modular',
      warranty: '10 años',
      description: 'Flagship para overclocking extremo',
      image: '/psu-asus-thor.jpg',
      recommended: profile === 'IA/LLM' || profile === 'Edición Vídeo'
    },
    {
      id: 'psu-1200w-platinum',
      name: 'Corsair HX1200i Platinum',
      price: '299€',
      wattage: '1200W',
      efficiency: '80+ Platinum',
      modular: 'Fully Modular',
      warranty: '10 años',
      description: 'Máxima potencia para configuraciones extremas',
      image: '/psu-corsair-hx1200i.jpg',
      recommended: profile === 'IA/LLM'
    },
    {
      id: 'psu-650w-gold',
      name: 'EVGA SuperNOVA 650 G5',
      price: '99€',
      wattage: '650W',
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      warranty: '10 años',
      description: 'Excelente para configuraciones básicas',
      image: '/psu-evga-supernova.jpg',
      recommended: profile === 'Ofimática Silenciosa'
    },
    {
      id: 'psu-1600w-titanium',
      name: 'Corsair AX1600i Titanium',
      price: '599€',
      wattage: '1600W',
      efficiency: '80+ Titanium',
      modular: 'Fully Modular',
      warranty: '10 años',
      description: 'Máxima eficiencia para workstations',
      image: '/psu-corsair-ax1600i.jpg',
      recommended: profile === 'IA/LLM'
    }
  ];

  const handleSelectPowerSupply = (psuId: string) => {
    setSelectedPowerSupply(psuId);
    setPowerSupply(psuId);
  };

  const handleNext = () => {
    if (selectedPowerSupply) {
      setStep(8);
      router.push('/pc-a-medida/8-caja');
    }
  };

  const handleBack = () => {
    router.push('/pc-a-medida/6-refrigeracion');
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
            Volver a refrigeración
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-bold text-lg">
              7
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Selecciona tu Fuente de Alimentación
                </span>
              </h1>
              <p className="text-lg text-white/70">
                El corazón que alimenta tu PC
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-violet-500 h-2 rounded-full" style={{ width: '87.5%' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Información del perfil */}
        <div className="mb-8 rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6">
          <h2 className="text-xl font-bold mb-2">⚡ Recomendaciones de fuente</h2>
          <p className="text-white/80">
            Basándonos en tu perfil <strong>{profile}</strong>, hemos seleccionado las fuentes de alimentación más adecuadas. 
            Los marcados con ⭐ son especialmente recomendados para ti.
          </p>
        </div>

        {/* Grid de fuentes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {powerSupplies.map((psu) => (
            <button
              key={psu.id}
              onClick={() => handleSelectPowerSupply(psu.id)}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-105 ${
                selectedPowerSupply === psu.id 
                  ? 'border-cyan-500 bg-cyan-500/10' 
                  : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
              }`}
            >
              {/* Badge recomendado */}
              {psu.recommended && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Recomendado
                </div>
              )}

              {/* Imagen de la fuente */}
              <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 mb-4 flex items-center justify-center">
                <div className="text-4xl">⚡</div>
              </div>

              {/* Nombre y precio */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{psu.name}</h3>
                <span className="text-cyan-400 font-bold">{psu.price}</span>
              </div>

              {/* Especificaciones */}
              <div className="space-y-1 mb-3">
                <div className="text-sm text-white/60">• Potencia: {psu.wattage}</div>
                <div className="text-sm text-white/60">• Eficiencia: {psu.efficiency}</div>
                <div className="text-sm text-white/60">• Modular: {psu.modular}</div>
                <div className="text-sm text-white/60">• Garantía: {psu.warranty}</div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-white/70 mb-4">{psu.description}</p>

              {/* Botón de selección */}
              <div className="mt-4">
                <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedPowerSupply === psu.id
                    ? 'bg-cyan-500 text-black'
                    : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                }`}>
                  {selectedPowerSupply === psu.id ? 'Seleccionado' : 'Seleccionar'}
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
            disabled={!selectedPowerSupply}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedPowerSupply
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:from-cyan-600 hover:to-violet-600 hover-lift hover-glow'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-lg font-bold mb-4">💡 ¿Qué fuente elegir?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Por potencia:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong>650W:</strong> Configuraciones básicas</li>
                <li>• <strong>750W:</strong> Gaming de gama media</li>
                <li>• <strong>850W:</strong> Gaming de alta gama</li>
                <li>• <strong>1000W+:</strong> Overclocking extremo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Características incluidas:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Cables modulares premium</li>
                <li>• Protecciones completas (OVP, UVP, OCP)</li>
                <li>• Ventilador silencioso</li>
                <li>• Garantía de 10 años</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FuentePage() {
  return (
    <ConfiguratorProvider>
      <FuenteContent />
    </ConfiguratorProvider>
  );
}












