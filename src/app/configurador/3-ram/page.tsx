'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import PartPicker from '@/app/components/configurator/PartPicker';
import SummarySticky from '@/app/components/configurator/SummarySticky';
import { RAM } from '@/types/parts';
import Link from 'next/link';

export default function RAMPage() {
  const { build, setPart, setStep } = useConfigStore();
  const router = useRouter();

  const handleSelect = (ram: RAM) => {
    setPart('ram', ram);
  };

  const handleNext = () => {
    setStep(4);
    router.push('/configurador/4-gpu');
  };

  const handleBack = () => {
    setStep(2);
    router.push('/configurador/2-placa');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header con navegación */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>

            <div className="flex items-center gap-4">
              <div className="text-sm text-white/60">
                Paso <span className="text-white font-semibold">3</span> de 8
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: '37.5%' }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Contenido principal */}
          <div>
            {/* Título y descripción */}
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold mb-3">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Paso 3: Memoria RAM
                </span>
              </h1>
              <p className="text-lg text-white/70">
                La RAM determina la velocidad y capacidad multitarea de tu PC. Más GB = más aplicaciones simultáneas, más MHz = mayor velocidad.
              </p>

              {/* Compatibilidad automática */}
              {build.mb && (
                <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                  <div className="font-semibold text-green-400 mb-2">✓ Compatibilidad automática</div>
                  <p className="text-sm text-green-300">
                    Solo se muestra RAM {build.mb.ramGen} compatible con tu placa base
                  </p>
                </div>
              )}

              {/* Tips */}
              <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="font-semibold text-blue-400 mb-2">💡 Consejos</div>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• Gaming: 32GB DDR5 6000MHz (equilibrio perfecto)</li>
                  <li>• Edición/Render: 64GB DDR5 6400MHz+ (más capacidad)</li>
                  <li>• Oficina: 16GB DDR4/DDR5 3200MHz+ (suficiente)</li>
                  <li>• DDR5 es más rápido pero DDR4 es más económico</li>
                  <li>• EXPO/XMP permite velocidades altas automáticamente</li>
                </ul>
              </div>
            </div>

            {/* Picker */}
            <PartPicker
              category="ram"
              selectedId={build.ram?.id}
              onSelect={handleSelect}
            />
          </div>

          {/* Resumen sticky */}
          <div>
            <SummarySticky
              onNext={handleNext}
              canProceed={!!build.ram}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

