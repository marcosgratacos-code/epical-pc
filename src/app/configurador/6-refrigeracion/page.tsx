'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import PartPicker from '@/app/components/configurator/PartPicker';
import SummarySticky from '@/app/components/configurator/SummarySticky';
import { Cooler } from '@/types/parts';
import Link from 'next/link';

export default function RefrigeracionPage() {
  const { build, setPart, setStep } = useConfigStore();
  const router = useRouter();

  const handleSelect = (cooler: Cooler) => {
    setPart('cooler', cooler);
  };

  const handleNext = () => {
    setStep(7);
    router.push('/configurador/7-fuente');
  };

  const handleBack = () => {
    setStep(5);
    router.push('/configurador/5-almacenamiento');
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
                Paso <span className="text-white font-semibold">6</span> de 8
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: '75%' }}
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
                  Paso 6: Refrigeración
                </span>
              </h1>
              <p className="text-lg text-white/70">
                Mantén tu CPU fresco para máximo rendimiento. AIO líquido para silencio y eficiencia, aire para simplicidad y economía.
              </p>

              {/* Compatibilidad automática */}
              {build.cpu && (
                <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                  <div className="font-semibold text-green-400 mb-2">✓ Compatibilidad automática</div>
                  <p className="text-sm text-green-300">
                    Solo se muestran coolers compatibles con tu procesador {build.cpu.name} (socket {build.cpu.socket})
                  </p>
                </div>
              )}

              {/* Tips */}
              <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="font-semibold text-blue-400 mb-2">💡 Tipos de refrigeración</div>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• AIO 240mm: Equilibrio silencio/rendimiento (hasta 200W TDP)</li>
                  <li>• AIO 360mm: Máximo rendimiento y silencio (hasta 250W+ TDP)</li>
                  <li>• Aire premium: Silencio excelente, fácil mantenimiento</li>
                  <li>• Aire económico: Buena relación precio/rendimiento</li>
                  <li>• RGB: Estética gaming con iluminación personalizable</li>
                </ul>
              </div>

              {/* Recomendación por CPU */}
              {build.cpu && (
                <div className="mt-4 rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
                  <div className="font-semibold text-violet-400 mb-2">🎯 Recomendación para tu CPU</div>
                  <div className="text-sm text-violet-300">
                    {build.cpu.tdpW > 150 ? (
                      <>Tu CPU tiene {build.cpu.tdpW}W TDP. Recomendamos AIO 360mm o cooler de aire premium para máximo rendimiento.</>
                    ) : build.cpu.tdpW > 100 ? (
                      <>Tu CPU tiene {build.cpu.tdpW}W TDP. AIO 240mm o aire premium serían ideales.</>
                    ) : (
                      <>Tu CPU tiene {build.cpu.tdpW}W TDP. Cualquier cooler de aire o AIO 240mm funcionará perfectamente.</>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Picker */}
            <PartPicker
              category="cooler"
              selectedId={build.cooler?.id}
              onSelect={handleSelect}
            />
          </div>

          {/* Resumen sticky */}
          <div>
            <SummarySticky
              onNext={handleNext}
              canProceed={!!build.cooler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

