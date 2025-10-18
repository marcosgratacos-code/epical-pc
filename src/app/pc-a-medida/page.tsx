'use client';

import { useConfigStore } from '@/store/configurator';
import { UserProfile } from '@/types/parts';
import { getProfileCriteria } from '@/lib/recommend';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';

function ConfiguradorContent() {
  const { setProfile, setStep, reset } = useConfigStore();
  const router = useRouter();

  const profiles: { name: UserProfile; desc: string; icon: string; color: string }[] = [
    {
      name: 'Esports 1080p',
      desc: 'Máximo FPS en competitivos. CPU rápido y GPU eficiente.',
      icon: '🎯',
      color: 'from-green-400 to-emerald-500',
    },
    {
      name: '4K Ultra',
      desc: 'Gaming en 4K con Ray Tracing. GPU flagship y PSU potente.',
      icon: '🎮',
      color: 'from-violet-500 to-purple-600',
    },
    {
      name: 'Edición Vídeo',
      desc: 'CPU multi-core, RAM abundante y NVMe rápido.',
      icon: '🎬',
      color: 'from-pink-500 to-rose-600',
    },
    {
      name: 'IA/LLM',
      desc: 'VRAM máxima, RAM 96GB+ para modelos grandes.',
      icon: '🤖',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      name: 'Ofimática Silenciosa',
      desc: 'Silencio absoluto, eficiencia energética, bajo consumo.',
      icon: '💼',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  const handleSelectProfile = (profile: UserProfile) => {
    setProfile(profile);
    setStep(1);
    router.push('/configurador/1-procesador');
  };

  const handleSkipProfile = () => {
    setStep(1);
    router.push('/configurador/1-procesador');
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Configurador de PCs
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-3xl">
            Crea tu PC gaming perfecto en 8 pasos. Sistema guiado con validación de compatibilidad en tiempo real, 
            recomendaciones inteligentes y precio actualizado.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Características */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: '✓', label: 'Compatibilidad automática' },
            { icon: '€', label: 'Precio en tiempo real' },
            { icon: '🔍', label: 'Comparador integrado' },
            { icon: '3️⃣', label: '3 años de garantía' },
          ].map((feat, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <div className="text-3xl mb-2">{feat.icon}</div>
              <div className="text-sm text-white/80">{feat.label}</div>
            </div>
          ))}
        </div>

        {/* Selección de perfil */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Paso 1: Elige tu perfil de uso</h2>
          <p className="text-white/60 mb-6">
            (Opcional) Selecciona un perfil para recibir recomendaciones personalizadas y límites de presupuesto optimizados.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => {
              const criteria = getProfileCriteria(profile.name);
              return (
                <button
                  key={profile.name}
                  onClick={() => handleSelectProfile(profile.name)}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Icono */}
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {profile.icon}
                  </div>

                  {/* Nombre */}
                  <h3 className="text-xl font-bold mb-2">{profile.name}</h3>

                  {/* Descripción */}
                  <p className="text-sm text-white/60 mb-4">{profile.desc}</p>

                  {/* Prioridades */}
                  <div className="space-y-1 text-xs text-white/40">
                    {criteria.priorities.slice(0, 2).map((priority, i) => (
                      <div key={i}>• {priority}</div>
                    ))}
                  </div>

                  {/* Gradiente decorativo */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                </button>
              );
            })}
          </div>

          {/* Botón omitir */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSkipProfile}
              className="px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-white/80 hover:text-white"
            >
              Omitir y configurar libremente
            </button>
          </div>
        </div>

        {/* Pasos del proceso */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h3 className="text-xl font-bold mb-6">Pasos del configurador</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: 1, label: 'Procesador', icon: '⚙️' },
              { num: 2, label: 'Placa Base', icon: '🔌' },
              { num: 3, label: 'Memoria RAM', icon: '💾' },
              { num: 4, label: 'Tarjeta Gráfica', icon: '🎨' },
              { num: 5, label: 'Almacenamiento', icon: '💿' },
              { num: 6, label: 'Refrigeración', icon: '❄️' },
              { num: 7, label: 'Fuente', icon: '⚡' },
              { num: 8, label: 'Caja', icon: '📦' },
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <div className="text-2xl">{step.icon}</div>
                  <div className="text-sm text-white/80">{step.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón reiniciar */}
        <div className="mt-8 text-center">
          <button
            onClick={handleReset}
            className="text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            Reiniciar configuración
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PCMedidaPage() {
  return (
    <ConfiguratorProvider>
      <ConfiguradorContent />
    </ConfiguratorProvider>
  );
}