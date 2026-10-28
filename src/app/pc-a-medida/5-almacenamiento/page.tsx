'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';
import { useState } from 'react';

function AlmacenamientoContent() {
  const { profile, setStep, setStorage } = useConfigStore();
  const router = useRouter();
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);

  const storageOptions = [
    {
      id: 'nvme-1tb-gen4',
      name: 'Samsung 980 PRO 1TB',
      price: '129€',
      capacity: '1TB',
      type: 'NVMe Gen4',
      speed: '7000 MB/s',
      endurance: '600 TBW',
      description: 'Perfecto para gaming y sistema operativo',
      image: '/ssd-samsung-980-pro.jpg',
      recommended: profile === 'Esports 1080p' || profile === 'Ofimática Silenciosa'
    },
    {
      id: 'nvme-2tb-gen4',
      name: 'WD Black SN850X 2TB',
      price: '199€',
      capacity: '2TB',
      type: 'NVMe Gen4',
      speed: '7300 MB/s',
      endurance: '1200 TBW',
      description: 'Ideal para gaming avanzado y trabajo',
      image: '/ssd-wd-black-sn850x.jpg',
      recommended: profile === '4K Ultra' || profile === 'Edición Vídeo'
    },
    {
      id: 'nvme-4tb-gen4',
      name: 'Corsair MP600 PRO XT 4TB',
      price: '399€',
      capacity: '4TB',
      type: 'NVMe Gen4',
      speed: '7100 MB/s',
      endurance: '3000 TBW',
      description: 'Excelente para edición de video y almacenamiento masivo',
      image: '/ssd-corsair-mp600.jpg',
      recommended: profile === 'Edición Vídeo' || profile === 'IA/LLM'
    },
    {
      id: 'nvme-1tb-gen5',
      name: 'Crucial T700 1TB',
      price: '199€',
      capacity: '1TB',
      type: 'NVMe Gen5',
      speed: '12000 MB/s',
      endurance: '600 TBW',
      description: 'Máxima velocidad para gaming competitivo',
      image: '/ssd-crucial-t700.jpg',
      recommended: profile === 'Esports 1080p'
    },
    {
      id: 'nvme-2tb-gen5',
      name: 'Samsung 990 PRO 2TB',
      price: '299€',
      capacity: '2TB',
      type: 'NVMe Gen5',
      speed: '12500 MB/s',
      endurance: '1200 TBW',
      description: 'Flagship para gaming y trabajo profesional',
      image: '/ssd-samsung-990-pro.jpg',
      recommended: profile === '4K Ultra' || profile === 'IA/LLM'
    },
    {
      id: 'nvme-8tb-gen4',
      name: 'Sabrent Rocket 4 Plus 8TB',
      price: '799€',
      capacity: '8TB',
      type: 'NVMe Gen4',
      speed: '7100 MB/s',
      endurance: '6000 TBW',
      description: 'Almacenamiento masivo para IA y renderizado',
      image: '/ssd-sabrent-rocket.jpg',
      recommended: profile === 'IA/LLM' || profile === 'Edición Vídeo'
    },
    {
      id: 'sata-2tb',
      name: 'Samsung 870 EVO 2TB',
      price: '149€',
      capacity: '2TB',
      type: 'SATA III',
      speed: '560 MB/s',
      endurance: '1200 TBW',
      description: 'Almacenamiento secundario económico',
      image: '/ssd-samsung-870-evo.jpg',
      recommended: profile === 'Ofimática Silenciosa'
    },
    {
      id: 'hdd-8tb',
      name: 'Seagate BarraCuda 8TB',
      price: '149€',
      capacity: '8TB',
      type: 'HDD 7200 RPM',
      speed: '210 MB/s',
      endurance: 'N/A',
      description: 'Almacenamiento masivo para archivos',
      image: '/hdd-seagate-barracuda.jpg',
      recommended: profile === 'Edición Vídeo' || profile === 'IA/LLM'
    }
  ];

  const handleSelectStorage = (storageId: string) => {
    setSelectedStorage(storageId);
    setStorage(storageId);
  };

  const handleNext = () => {
    if (selectedStorage) {
      setStep(6);
      router.push('/pc-a-medida/6-refrigeracion');
    }
  };

  const handleBack = () => {
    router.push('/pc-a-medida/4-grafica');
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a gráfica
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center font-bold text-lg text-white">
              5
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="text-neutral-900">
                  Selecciona tu Almacenamiento
                </span>
              </h1>
              <p className="text-lg text-neutral-600">
                Velocidad y capacidad para tus necesidades
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-neutral-100 rounded-full h-2 mb-6">
            <div className="bg-neutral-900 h-2 rounded-full text-white" style={{ width: '62.5%' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Información del perfil */}
        <div className="mb-8 rounded-2xl border border-green-200 bg-neutral-50 p-6">
          <h2 className="text-xl font-bold mb-2">💿 Recomendaciones de almacenamiento</h2>
          <p className="text-neutral-700">
            Basándonos en tu perfil <strong>{profile}</strong>, hemos seleccionado las opciones de almacenamiento más adecuadas. 
            Los marcados con ⭐ son especialmente recomendados para ti.
          </p>
        </div>

        {/* Grid de almacenamiento */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {storageOptions.map((storage) => (
            <button
              key={storage.id}
              onClick={() => handleSelectStorage(storage.id)}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-105 ${
                selectedStorage === storage.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100'
              }`}
            >
              {/* Badge recomendado */}
              {storage.recommended && (
                <div className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Recomendado
                </div>
              )}

              {/* Imagen del almacenamiento */}
              <div className="aspect-square w-full rounded-xl bg-neutral-50 mb-4 flex items-center justify-center">
                <div className="text-4xl">💿</div>
              </div>

              {/* Nombre y precio */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{storage.name}</h3>
                <span className="text-blue-600 font-bold">{storage.price}</span>
              </div>

              {/* Especificaciones */}
              <div className="space-y-1 mb-3">
                <div className="text-sm text-neutral-500">• Capacidad: {storage.capacity}</div>
                <div className="text-sm text-neutral-500">• Tipo: {storage.type}</div>
                <div className="text-sm text-neutral-500">• Velocidad: {storage.speed}</div>
                <div className="text-sm text-neutral-500">• Endurance: {storage.endurance}</div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-neutral-600 mb-4">{storage.description}</p>

              {/* Botón de selección */}
              <div className="mt-4">
                <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedStorage === storage.id
                    ? 'bg-blue-600 text-black'
                    : 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200'
                }`}>
                  {selectedStorage === storage.id ? 'Seleccionado' : 'Seleccionar'}
                </div>
              </div>

              {/* Gradiente decorativo */}
              <div className="absolute inset-0 rounded-2xl bg-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 transition-all text-neutral-700 hover:text-neutral-900"
          >
            ← Volver
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedStorage}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedStorage
                ? 'bg-neutral-900 text-white hover:bg-neutral-700 hover-lift hover-glow'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="text-lg font-bold mb-4">💡 ¿Qué almacenamiento elegir?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">Por uso:</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• <strong>Gaming básico:</strong> 1TB NVMe Gen4</li>
                <li>• <strong>Gaming avanzado:</strong> 2TB NVMe Gen4</li>
                <li>• <strong>Edición de video:</strong> 4TB+ NVMe + HDD</li>
                <li>• <strong>IA/Workstation:</strong> 8TB+ NVMe</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">Características incluidas:</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Instalación y configuración del SO</li>
                <li>• Optimización de rendimiento</li>
                <li>• Configuración RAID (si aplica)</li>
                <li>• Garantía extendida de 5 años</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AlmacenamientoPage() {
  return (
    <ConfiguratorProvider>
      <AlmacenamientoContent />
    </ConfiguratorProvider>
  );
}












