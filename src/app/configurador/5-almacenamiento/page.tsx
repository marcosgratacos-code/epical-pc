'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import PartPicker from '@/app/components/configurator/PartPicker';
import SummarySticky from '@/app/components/configurator/SummarySticky';
import { Storage } from '@/types/parts';
import Link from 'next/link';

export default function AlmacenamientoPage() {
  const { build, addStorage, removeStorage, setStep } = useConfigStore();
  const router = useRouter();

  const handleSelect = (storage: Storage) => {
    addStorage(storage);
  };

  const handleRemove = (id: string) => {
    removeStorage(id);
  };

  const handleNext = () => {
    setStep(6);
    router.push('/configurador/6-refrigeracion');
  };

  const handleBack = () => {
    setStep(4);
    router.push('/configurador/4-gpu');
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
                Paso <span className="text-white font-semibold">5</span> de 8
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: '62.5%' }}
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
                  Paso 5: Almacenamiento
                </span>
              </h1>
              <p className="text-lg text-white/70">
                Puedes añadir múltiples unidades de almacenamiento. Recomendamos al menos un SSD NVMe para el sistema operativo.
              </p>

              {/* Almacenamiento seleccionado */}
              {build.storage && build.storage.length > 0 && (
                <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                  <div className="font-semibold text-green-400 mb-2">✓ Almacenamiento seleccionado</div>
                  <div className="space-y-2">
                    {build.storage.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-green-300">{item.name}</span>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="font-semibold text-blue-400 mb-2">💡 Configuraciones recomendadas</div>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• Gaming: 1TB NVMe Gen4 (sistema + juegos)</li>
                  <li>• Edición: 2TB NVMe Gen5 + 4TB HDD (scratch + archivo)</li>
                  <li>• Oficina: 500GB NVMe + 2TB HDD (sistema + datos)</li>
                  <li>• NVMe Gen5: Máxima velocidad (hasta 12GB/s)</li>
                  <li>• HDD externo: Backup y almacenamiento masivo</li>
                </ul>
              </div>
            </div>

            {/* Picker */}
            <PartPicker
              category="storage"
              selectedId={undefined} // Múltiples selecciones
              onSelect={handleSelect}
            />
          </div>

          {/* Resumen sticky */}
          <div>
            <SummarySticky
              onNext={handleNext}
              canProceed={build.storage && build.storage.length > 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

