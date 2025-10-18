'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import PartPicker from '@/app/components/configurator/PartPicker';
import SummarySticky from '@/app/components/configurator/SummarySticky';
import { PSU } from '@/types/parts';
import Link from 'next/link';

export default function FuentePage() {
  const { build, setPart, setStep } = useConfigStore();
  const router = useRouter();

  const handleSelect = (psu: PSU) => {
    setPart('psu', psu);
  };

  const handleNext = () => {
    setStep(8);
    router.push('/configurador/8-caja');
  };

  const handleBack = () => {
    setStep(6);
    router.push('/configurador/6-refrigeracion');
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
                Paso <span className="text-white font-semibold">7</span> de 8
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: '87.5%' }}
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
                  Paso 7: Fuente de Alimentación
                </span>
              </h1>
              <p className="text-lg text-white/70">
                La PSU alimenta todos los componentes. Debe tener suficiente potencia y ser de calidad para estabilidad y eficiencia.
              </p>

              {/* Cálculo de potencia */}
              {build.cpu && build.gpu && (
                <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                  <div className="font-semibold text-amber-400 mb-2">⚡ Consumo estimado del sistema</div>
                  <div className="text-sm text-amber-300 space-y-1">
                    <div>• CPU: {build.cpu.tdpW}W</div>
                    <div>• GPU: {build.gpu.tgpW || 'N/A'}W</div>
                    <div>• Otros: ~100W</div>
                    <div className="font-semibold">• Total estimado: ~{(build.cpu.tdpW + (build.gpu.tgpW || 0) + 100)}W</div>
                    <div className="text-xs text-amber-200 mt-2">
                      Recomendamos PSU con 1.5x el consumo estimado para estabilidad
                    </div>
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="font-semibold text-blue-400 mb-2">💡 Características importantes</div>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• ATX 3.1: Estándar más reciente, mejor para GPUs modernas</li>
                  <li>• PCIe 5.0 12VHPWR: Conector para RTX 40/50-series</li>
                  <li>• 80+ Gold/Platinum: Mayor eficiencia = menos calor y ruido</li>
                  <li>• Modular: Cables desmontables para mejor gestión</li>
                  <li>• Potencia: 1.5x el consumo estimado para estabilidad</li>
                </ul>
              </div>

              {/* Recomendación por GPU */}
              {build.gpu && build.gpu.tgpW && (
                <div className="mt-4 rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
                  <div className="font-semibold text-violet-400 mb-2">🎯 Recomendación para tu GPU</div>
                  <div className="text-sm text-violet-300">
                    {build.gpu.tgpW >= 300 ? (
                      <>Tu GPU consume {build.gpu.tgpW}W. Necesitas PSU ≥850W con conector PCIe 5.0 12VHPWR.</>
                    ) : build.gpu.tgpW >= 200 ? (
                      <>Tu GPU consume {build.gpu.tgpW}W. Recomendamos PSU ≥750W con conector PCIe 5.0.</>
                    ) : (
                      <>Tu GPU consume {build.gpu.tgpW}W. PSU ≥650W será suficiente.</>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Picker */}
            <PartPicker
              category="psu"
              selectedId={build.psu?.id}
              onSelect={handleSelect}
            />
          </div>

          {/* Resumen sticky */}
          <div>
            <SummarySticky
              onNext={handleNext}
              canProceed={!!build.psu}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

