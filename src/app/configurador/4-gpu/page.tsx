'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import PartPicker from '@/app/components/configurator/PartPicker';
import SummarySticky from '@/app/components/configurator/SummarySticky';
import { GPU } from '@/types/parts';
import Link from 'next/link';

export default function GPUPage() {
  const { build, setPart, setStep } = useConfigStore();
  const router = useRouter();

  const handleSelect = (gpu: GPU) => {
    setPart('gpu', gpu);
  };

  const handleNext = () => {
    setStep(5);
    router.push('/configurador/5-almacenamiento');
  };

  const handleBack = () => {
    setStep(3);
    router.push('/configurador/3-ram');
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
                Paso <span className="text-white font-semibold">4</span> de 8
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: '50%' }}
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
                  Paso 4: Tarjeta Gráfica
                </span>
              </h1>
              <p className="text-lg text-white/70">
                La GPU es crucial para gaming, edición de vídeo y IA. Más VRAM = mejor rendimiento en resoluciones altas y aplicaciones profesionales.
              </p>

              {/* Tips */}
              <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="font-semibold text-blue-400 mb-2">💡 Consejos por resolución</div>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• 1080p Gaming: RTX 5060/5060 Ti (8-16GB VRAM)</li>
                  <li>• 1440p Gaming: RTX 5070/5070 Ti (12-16GB VRAM)</li>
                  <li>• 4K Gaming: RTX 5080/5090 (16-32GB VRAM)</li>
                  <li>• Edición/IA: Mínimo 16GB VRAM recomendado</li>
                  <li>• RTX 50-series: Nueva arquitectura con mejor eficiencia</li>
                </ul>
              </div>

              {/* Consumos RTX 50-series */}
              <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="font-semibold text-amber-400 mb-2">⚡ Consumos RTX 50-series</div>
                <div className="text-sm text-amber-300 space-y-1">
                  <div>• RTX 5060: ~150W</div>
                  <div>• RTX 5070: ~220W</div>
                  <div>• RTX 5070 Ti: ~260W</div>
                  <div>• RTX 5080: ~350W</div>
                  <div>• RTX 5090: ~450W</div>
                </div>
              </div>
            </div>

            {/* Picker */}
            <PartPicker
              category="gpu"
              selectedId={build.gpu?.id}
              onSelect={handleSelect}
            />
          </div>

          {/* Resumen sticky */}
          <div>
            <SummarySticky
              onNext={handleNext}
              canProceed={!!build.gpu}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

