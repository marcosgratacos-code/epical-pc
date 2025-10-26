'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';
import { useState } from 'react';

function PlacaBaseContent() {
  const { profile, processor, setStep, setMotherboard } = useConfigStore();
  const router = useRouter();
  const [selectedMotherboard, setSelectedMotherboard] = useState<string | null>(null);

  const motherboards = [
    {
      id: 'b650-aorus',
      name: 'Gigabyte B650 AORUS Elite AX',
      price: '199€',
      chipset: 'B650',
      socket: 'AM5',
      formFactor: 'ATX',
      ramSlots: '4x DDR5',
      maxRam: '128GB',
      m2Slots: '3x M.2',
      wifi: 'WiFi 6E',
      description: 'Excelente relación calidad-precio para gaming',
      image: '/mobo-b650-aorus.jpg',
      compatible: processor?.includes('amd'),
      recommended: profile === 'Esports 1080p' || profile === 'Ofimática Silenciosa'
    },
    {
      id: 'x670e-tuf',
      name: 'ASUS X670E TUF Gaming',
      price: '299€',
      chipset: 'X670E',
      socket: 'AM5',
      formFactor: 'ATX',
      ramSlots: '4x DDR5',
      maxRam: '128GB',
      m2Slots: '4x M.2',
      wifi: 'WiFi 6E',
      description: 'Perfecta para overclocking y gaming de alta gama',
      image: '/mobo-x670e-tuf.jpg',
      compatible: processor?.includes('amd'),
      recommended: profile === '4K Ultra' || profile === 'Edición Vídeo'
    },
    {
      id: 'z790-aorus',
      name: 'Gigabyte Z790 AORUS Elite AX',
      price: '249€',
      chipset: 'Z790',
      socket: 'LGA1700',
      formFactor: 'ATX',
      ramSlots: '4x DDR5',
      maxRam: '128GB',
      m2Slots: '4x M.2',
      wifi: 'WiFi 6E',
      description: 'Ideal para Intel con overclocking avanzado',
      image: '/mobo-z790-aorus.jpg',
      compatible: processor?.includes('intel'),
      recommended: profile === 'Esports 1080p' || profile === '4K Ultra'
    },
    {
      id: 'b760-msi',
      name: 'MSI B760 Tomahawk WiFi',
      price: '179€',
      chipset: 'B760',
      socket: 'LGA1700',
      formFactor: 'ATX',
      ramSlots: '4x DDR5',
      maxRam: '128GB',
      m2Slots: '3x M.2',
      wifi: 'WiFi 6E',
      description: 'Excelente para Intel sin overclocking extremo',
      image: '/mobo-b760-msi.jpg',
      compatible: processor?.includes('intel'),
      recommended: profile === 'Ofimática Silenciosa'
    },
    {
      id: 'x670e-hero',
      name: 'ASUS ROG X670E Hero',
      price: '499€',
      chipset: 'X670E',
      socket: 'AM5',
      formFactor: 'ATX',
      ramSlots: '4x DDR5',
      maxRam: '128GB',
      m2Slots: '5x M.2',
      wifi: 'WiFi 6E',
      description: 'Flagship para AMD con todas las características premium',
      image: '/mobo-x670e-hero.jpg',
      compatible: processor?.includes('amd'),
      recommended: profile === 'IA/LLM' || profile === 'Edición Vídeo'
    },
    {
      id: 'z790-maximus',
      name: 'ASUS ROG Maximus Z790 Hero',
      price: '599€',
      chipset: 'Z790',
      socket: 'LGA1700',
      formFactor: 'ATX',
      ramSlots: '4x DDR5',
      maxRam: '128GB',
      m2Slots: '5x M.2',
      wifi: 'WiFi 6E',
      description: 'Flagship para Intel con overclocking extremo',
      image: '/mobo-z790-maximus.jpg',
      compatible: processor?.includes('intel'),
      recommended: profile === 'IA/LLM' || profile === 'Edición Vídeo'
    }
  ];

  const handleSelectMotherboard = (motherboardId: string) => {
    setSelectedMotherboard(motherboardId);
    setMotherboard(motherboardId);
  };

  const handleNext = () => {
    if (selectedMotherboard) {
      setStep(3);
      router.push('/pc-a-medida/3-memoria');
    }
  };

  const handleBack = () => {
    router.push('/pc-a-medida/1-procesador');
  };

  // Filtrar placas compatibles
  const compatibleMotherboards = motherboards.filter(mb => mb.compatible);

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
            Volver a procesador
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Selecciona tu Placa Base
                </span>
              </h1>
              <p className="text-lg text-white/70">
                Compatible con tu procesador seleccionado
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-violet-500 h-2 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Información de compatibilidad */}
        <div className="mb-8 rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6">
          <h2 className="text-xl font-bold mb-2">✅ Compatibilidad verificada</h2>
          <p className="text-white/80">
            Solo mostramos placas base compatibles con tu procesador. 
            Los marcados con ⭐ son especialmente recomendados para tu perfil <strong>{profile}</strong>.
          </p>
        </div>

        {/* Grid de placas base */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {compatibleMotherboards.map((motherboard) => (
            <button
              key={motherboard.id}
              onClick={() => handleSelectMotherboard(motherboard.id)}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-105 ${
                selectedMotherboard === motherboard.id 
                  ? 'border-cyan-500 bg-cyan-500/10' 
                  : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
              }`}
            >
              {/* Badge recomendado */}
              {motherboard.recommended && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Recomendado
                </div>
              )}

              {/* Imagen de la placa */}
              <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 mb-4 flex items-center justify-center">
                <div className="text-4xl">🔌</div>
              </div>

              {/* Nombre y precio */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{motherboard.name}</h3>
                <span className="text-cyan-400 font-bold">{motherboard.price}</span>
              </div>

              {/* Especificaciones */}
              <div className="space-y-1 mb-3">
                <div className="text-sm text-white/60">• Chipset: {motherboard.chipset}</div>
                <div className="text-sm text-white/60">• Socket: {motherboard.socket}</div>
                <div className="text-sm text-white/60">• Formato: {motherboard.formFactor}</div>
                <div className="text-sm text-white/60">• RAM: {motherboard.ramSlots}</div>
                <div className="text-sm text-white/60">• M.2: {motherboard.m2Slots}</div>
                <div className="text-sm text-white/60">• WiFi: {motherboard.wifi}</div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-white/70 mb-4">{motherboard.description}</p>

              {/* Botón de selección */}
              <div className="mt-4">
                <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedMotherboard === motherboard.id
                    ? 'bg-cyan-500 text-black'
                    : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                }`}>
                  {selectedMotherboard === motherboard.id ? 'Seleccionado' : 'Seleccionar'}
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
            disabled={!selectedMotherboard}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedMotherboard
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:from-cyan-600 hover:to-violet-600 hover-lift hover-glow'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-lg font-bold mb-4">💡 ¿Qué placa elegir?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Por chipset:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong>B650/B760:</strong> Gaming básico, sin overclocking extremo</li>
                <li>• <strong>X670E/Z790:</strong> Gaming avanzado, overclocking completo</li>
                <li>• <strong>ROG/Hero:</strong> Máximas características y calidad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Características incluidas:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• WiFi 6E y Bluetooth integrados</li>
                <li>• RGB headers para iluminación</li>
                <li>• Múltiples slots M.2 para almacenamiento</li>
                <li>• Audio premium integrado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlacaBasePage() {
  return (
    <ConfiguratorProvider>
      <PlacaBaseContent />
    </ConfiguratorProvider>
  );
}












