'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import PartPicker from '@/app/components/configurator/PartPicker';
import SummarySticky from '@/app/components/configurator/SummarySticky';
import { Case } from '@/types/parts';
import Link from 'next/link';

export default function CajaPage() {
  const { build, setPart, setStep } = useConfigStore();
  const router = useRouter();

  const handleSelect = (caseP: Case) => {
    setPart('case', caseP);
  };

  const handleNext = () => {
    setStep(8);
    router.push('/configurador/resumen');
  };

  const handleBack = () => {
    setStep(7);
    router.push('/configurador/7-fuente');
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
                Paso <span className="text-white font-semibold">8</span> de 8
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: '100%' }}
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
                  Paso 8: Caja
                </span>
              </h1>
              <p className="text-lg text-white/70">
                La caja aloja todos los componentes. Debe ser compatible con el tamaño de tu GPU y soportar tu refrigeración elegida.
              </p>

              {/* Compatibilidad automática */}
              {build.gpu && (
                <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                  <div className="font-semibold text-green-400 mb-2">✓ Compatibilidad automática</div>
                  <p className="text-sm text-green-300">
                    Solo se muestran cajas que soportan tu GPU {build.gpu.name} ({build.gpu.lengthMM}mm de largo)
                  </p>
                </div>
              )}

              {/* Compatibilidad AIO */}
              {build.cooler && build.cooler.type === 'AIO' && (
                <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                  <div className="font-semibold text-blue-400 mb-2">❄️ Compatibilidad AIO</div>
                  <p className="text-sm text-blue-300">
                    Tu AIO {build.cooler.radMM}mm necesita una caja que soporte radiadores de {build.cooler.radMM}mm
                  </p>
                </div>
              )}

              {/* Tips */}
              <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="font-semibold text-blue-400 mb-2">💡 Características importantes</div>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• Cristal templado: Muestra el interior con estilo</li>
                  <li>• RGB integrado: Iluminación gaming lista</li>
                  <li>• Ventiladores incluidos: Mejor flujo de aire</li>
                  <li>• USB-C frontal: Conectividad moderna</li>
                  <li>• Gestión de cables: Espacios para organización</li>
                  <li>• Soporte AIO: Para refrigeración líquida</li>
                </ul>
              </div>

              {/* Resumen de compatibilidad */}
              <div className="mt-4 rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
                <div className="font-semibold text-violet-400 mb-2">🎯 Resumen de compatibilidad</div>
                <div className="text-sm text-violet-300 space-y-1">
                  {build.gpu && (
                    <div>• GPU: {build.gpu.lengthMM}mm de largo</div>
                  )}
                  {build.cooler && build.cooler.type === 'AIO' && (
                    <div>• AIO: {build.cooler.radMM}mm radiador</div>
                  )}
                  <div>• Formato: ATX estándar</div>
                </div>
              </div>
            </div>

            {/* Picker */}
            <PartPicker
              category="case"
              selectedId={build.case?.id}
              onSelect={handleSelect}
            />
          </div>

          {/* Resumen sticky */}
          <div>
            <SummarySticky
              onNext={handleNext}
              canProceed={!!build.case}
              isLastStep={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

