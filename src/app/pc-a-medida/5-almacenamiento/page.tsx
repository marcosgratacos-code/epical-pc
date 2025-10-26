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
            Volver a gráfica
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-bold text-lg">
              5
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Selecciona tu Almacenamiento
                </span>
              </h1>
              <p className="text-lg text-white/70">
                Velocidad y capacidad para tus necesidades
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-violet-500 h-2 rounded-full" style={{ width: '62.5%' }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Información del perfil */}
        <div className="mb-8 rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6">
          <h2 className="text-xl font-bold mb-2">💿 Recomendaciones de almacenamiento</h2>
          <p className="text-white/80">
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
                  ? 'border-cyan-500 bg-cyan-500/10' 
                  : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
              }`}
            >
              {/* Badge recomendado */}
              {storage.recommended && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Recomendado
                </div>
              )}

              {/* Imagen del almacenamiento */}
              <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 mb-4 flex items-center justify-center">
                <div className="text-4xl">💿</div>
              </div>

              {/* Nombre y precio */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{storage.name}</h3>
                <span className="text-cyan-400 font-bold">{storage.price}</span>
              </div>

              {/* Especificaciones */}
              <div className="space-y-1 mb-3">
                <div className="text-sm text-white/60">• Capacidad: {storage.capacity}</div>
                <div className="text-sm text-white/60">• Tipo: {storage.type}</div>
                <div className="text-sm text-white/60">• Velocidad: {storage.speed}</div>
                <div className="text-sm text-white/60">• Endurance: {storage.endurance}</div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-white/70 mb-4">{storage.description}</p>

              {/* Botón de selección */}
              <div className="mt-4">
                <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedStorage === storage.id
                    ? 'bg-cyan-500 text-black'
                    : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                }`}>
                  {selectedStorage === storage.id ? 'Seleccionado' : 'Seleccionar'}
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
            disabled={!selectedStorage}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedStorage
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:from-cyan-600 hover:to-violet-600 hover-lift hover-glow'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-lg font-bold mb-4">💡 ¿Qué almacenamiento elegir?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Por uso:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong>Gaming básico:</strong> 1TB NVMe Gen4</li>
                <li>• <strong>Gaming avanzado:</strong> 2TB NVMe Gen4</li>
                <li>• <strong>Edición de video:</strong> 4TB+ NVMe + HDD</li>
                <li>• <strong>IA/Workstation:</strong> 8TB+ NVMe</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Características incluidas:</h4>
              <ul className="text-sm text-white/70 space-y-1">
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












