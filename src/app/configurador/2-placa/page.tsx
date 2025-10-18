'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import PartPicker from '@/app/components/configurator/PartPicker';
import SummarySticky from '@/app/components/configurator/SummarySticky';
import { Motherboard } from '@/types/parts';
import Link from 'next/link';

export default function PlacaBasePage() {
  const { build, setPart, setStep } = useConfigStore();
  const router = useRouter();

  const handleSelect = (mb: Motherboard) => {
    setPart('mb', mb);
  };

  const handleNext = () => {
    setStep(3);
    router.push('/configurador/3-ram');
  };

  const handleBack = () => {
    setStep(1);
    router.push('/configurador/1-procesador');
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
                Paso <span className="text-white font-semibold">2</span> de 8
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: '25%' }}
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
                  Paso 2: Placa Base
                </span>
              </h1>
              <p className="text-lg text-white/70">
                La placa base conecta todos los componentes. Debe ser compatible con tu procesador y tener las características que necesitas.
              </p>

              {/* Compatibilidad automática */}
              {build.cpu && (
                <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                  <div className="font-semibold text-green-400 mb-2">✓ Compatibilidad automática</div>
                  <p className="text-sm text-green-300">
                    Solo se muestran placas compatibles con tu procesador {build.cpu.name} (socket {build.cpu.socket})
                  </p>
                </div>
              )}

              {/* Tips */}
              <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="font-semibold text-blue-400 mb-2">💡 Consejos</div>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• B650/X670: Gaming y uso general (DDR5 hasta 6400MHz)</li>
                  <li>• B850/X870: Nueva generación con PCIe 5.0 y WiFi 7</li>
                  <li>• Z790: Intel con overclocking y características premium</li>
                  <li>• Considera WiFi integrado si no tienes conexión por cable</li>
                </ul>
              </div>
            </div>

            {/* Picker */}
            <PartPicker
              category="mb"
              selectedId={build.mb?.id}
              onSelect={handleSelect}
            />
          </div>

          {/* Resumen sticky */}
          <div>
            <SummarySticky
              onNext={handleNext}
              canProceed={!!build.mb}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

