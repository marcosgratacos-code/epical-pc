'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import PartPicker from '@/app/components/configurator/PartPicker';
import SummarySticky from '@/app/components/configurator/SummarySticky';
import { CPU } from '@/types/parts';
import Link from 'next/link';

export default function ProcesadorPage() {
  const { build, setPart, setStep } = useConfigStore();
  const router = useRouter();

  const handleSelect = (cpu: CPU) => {
    setPart('cpu', cpu);
  };

  const handleNext = () => {
    setStep(2);
    router.push('/configurador/2-placa');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header con navegación */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/configurador"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-sm text-white/60">
                Paso <span className="text-white font-semibold">1</span> de 8
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: '12.5%' }}
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
                  Paso 1: Procesador
                </span>
              </h1>
              <p className="text-lg text-white/70">
                El corazón de tu PC. Elige según tu uso principal: gaming (alta frecuencia y cache), edición (multi-core), u oficina (eficiencia).
              </p>

              {/* Tips */}
              <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="font-semibold text-blue-400 mb-2">💡 Consejos</div>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• Para gaming competitivo: AMD 9800X3D o similar con 3D V-Cache</li>
                  <li>• Para edición/render: AMD 9950X o Intel 14900K (muchos núcleos)</li>
                  <li>• Para oficina: AMD 7600X o Intel i5 (eficiente y económico)</li>
                </ul>
              </div>
            </div>

            {/* Picker */}
            <PartPicker
              category="cpu"
              selectedId={build.cpu?.id}
              onSelect={handleSelect}
            />
          </div>

          {/* Resumen sticky */}
          <div>
            <SummarySticky
              onNext={handleNext}
              canProceed={!!build.cpu}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

