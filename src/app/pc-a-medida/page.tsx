'use client';

import { useConfigStore } from '@/store/configurator';
import { UserProfile } from '@/types/parts';
import { getProfileCriteria } from '@/lib/recommend';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';
import { useState } from 'react';

function ConfiguradorContent() {
  const { setProfile, setStep, reset } = useConfigStore();
  const router = useRouter();
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const profiles: { name: UserProfile; desc: string; icon: string; color: string; budget: string; features: string[] }[] = [
    {
      name: 'Esports 1080p',
      desc: 'Máximo FPS en competitivos. CPU rápido y GPU eficiente.',
      icon: '🎯',
      color: 'from-green-400 to-emerald-500',
      budget: '800-1200€',
      features: ['240+ FPS', 'Baja latencia', 'Estable']
    },
    {
      name: '4K Ultra',
      desc: 'Gaming en 4K con Ray Tracing. GPU flagship y PSU potente.',
      icon: '🎮',
      color: 'from-violet-500 to-purple-600',
      budget: '2000-3500€',
      features: ['4K 60fps', 'Ray Tracing', 'VR Ready']
    },
    {
      name: 'Edición Vídeo',
      desc: 'CPU multi-core, RAM abundante y NVMe rápido.',
      icon: '🎬',
      color: 'from-pink-500 to-rose-600',
      budget: '1500-2500€',
      features: ['Render rápido', '8K editing', 'Color accuracy']
    },
    {
      name: 'IA/LLM',
      desc: 'VRAM máxima, RAM 96GB+ para modelos grandes.',
      icon: '🤖',
      color: 'from-cyan-500 to-blue-600',
      budget: '3000-8000€',
      features: ['AI Training', 'LLM Local', 'HPC Ready']
    },
    {
      name: 'Ofimática Silenciosa',
      desc: 'Silencio absoluto, eficiencia energética, bajo consumo.',
      icon: '💼',
      color: 'from-amber-500 to-orange-600',
      budget: '600-1000€',
      features: ['<20dB', 'Eficiente', 'Profesional']
    },
  ];

  const presets = [
    {
      id: 'gaming-pro',
      name: 'Gaming Pro',
      price: '1500€',
      desc: 'Configuración gaming profesional con RGB y refrigeración líquida',
      specs: ['RTX 4070 Ti', 'AMD 7600X', '32GB DDR5', 'AIO 240mm'],
      image: '/preset-gaming-pro.jpg'
    },
    {
      id: 'workstation',
      name: 'Workstation',
      price: '2500€',
      desc: 'Estación de trabajo para edición y renderizado profesional',
      specs: ['RTX 4080', 'AMD 7700X', '64GB DDR5', 'NVMe 2TB'],
      image: '/preset-workstation.jpg'
    },
    {
      id: 'streaming',
      name: 'Streaming Setup',
      price: '2000€',
      desc: 'PC optimizado para streaming y contenido en vivo',
      specs: ['RTX 4070', 'AMD 7600X', '32GB DDR5', 'Capture Card'],
      image: '/preset-streaming.jpg'
    },
    {
      id: 'silent-pro',
      name: 'Silent Pro',
      price: '1200€',
      desc: 'Configuración ultra silenciosa para oficina profesional',
      specs: ['RTX 4060', 'AMD 7600', '16GB DDR5', 'Noctua Cooler'],
      image: '/preset-silent.jpg'
    }
  ];

  const handleSelectProfile = (profile: UserProfile) => {
    setProfile(profile);
    setStep(1);
    router.push('/pc-a-medida/1-procesador');
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    // Aquí cargarías la configuración del preset
  };

  const handleSkipProfile = () => {
    setStep(1);
    router.push('/pc-a-medida/1-procesador');
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
              Configurador de PCs Personalizados
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mb-6">
            Crea tu PC perfecto con <strong>personalización extrema</strong>. Sistema guiado con validación térmica, 
            overclocking automático, RGB personalizable y garantía de 3 años.
          </p>

          {/* Características destacadas */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: '⚡', label: 'Overclocking automático', desc: 'Perfiles seguros' },
              { icon: '🌈', label: 'RGB personalizable', desc: '16M colores' },
              { icon: '🌡️', label: 'Validación térmica', desc: 'Test completo' },
              { icon: '🔧', label: 'Montaje profesional', desc: 'Cableado perfecto' },
            ].map((feat, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <div className="text-3xl mb-2">{feat.icon}</div>
                <div className="text-sm text-white/80 font-semibold">{feat.label}</div>
                <div className="text-xs text-white/60">{feat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Banner informativo */}
        <div className="mb-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-8">
          <div className="flex items-start gap-6">
            <div className="text-6xl">💎</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  PCs 100% Personalizados
                </span>
              </h2>
              <p className="text-white/80 mb-4 text-lg">
                <strong>¿Quieres componentes específicos que no ves en la guía?</strong> ¡Perfecto! 
                Montamos PCs con <strong>CUALQUIER</strong> componente que necesites.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl bg-white/[0.03] p-4">
                  <div className="text-sm font-semibold text-white/90 mb-2">✅ Componentes a tu elección</div>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Refrigeración líquida custom (360mm, 420mm, doble loop)</li>
                    <li>• Cualquier GPU, CPU, placa que encuentres</li>
                    <li>• Tubing rígido, soft tubing, colores personalizados</li>
                    <li>• Watercooling para GPU, CPU, RAM, VRM</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-white/[0.03] p-4">
                  <div className="text-sm font-semibold text-white/90 mb-2">🎨 Estética extrema</div>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Cableado sleeved en cualquier color</li>
                    <li>• RGB sincronizado total (ARGB, iCUE, Aura Sync)</li>
                    <li>• Cajas modificadas o custom fabrication</li>
                    <li>• Pintura personalizada y acabados premium</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold text-white hover:from-cyan-600 hover:to-violet-600 transition-all hover-lift hover-glow"
                >
                  💬 Cuéntanos tu proyecto
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="#configurador-guiado"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white/80 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all"
                >
                  O usa el configurador guiado
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separador visual */}
        <div className="mb-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="text-white/40 text-sm font-semibold">O elige una opción guiada</div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Presets profesionales */}
        <div className="mb-12" id="configurador-guiado">
          <h2 className="text-2xl font-bold mb-2">🚀 Configuraciones Profesionales</h2>
          <p className="text-white/60 mb-6">
            Presets optimizados por nuestros expertos. Cada configuración incluye validación térmica, 
            overclocking seguro y garantía extendida. <strong>Estas son solo sugerencias</strong> — podemos cambiar cualquier componente.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-105 ${
                  selectedPreset === preset.id 
                    ? 'border-cyan-500 bg-cyan-500/10' 
                    : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
                }`}
              >
                {/* Imagen del preset */}
                <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 mb-4 flex items-center justify-center">
                  <div className="text-4xl">🖥️</div>
                </div>

                {/* Nombre y precio */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{preset.name}</h3>
                  <span className="text-cyan-400 font-bold">{preset.price}</span>
                </div>

                {/* Descripción */}
                <p className="text-sm text-white/60 mb-4">{preset.desc}</p>

                {/* Especificaciones */}
                <div className="space-y-1">
                  {preset.specs.map((spec, i) => (
                    <div key={i} className="text-xs text-white/40">• {spec}</div>
                  ))}
                </div>

                {/* Botón de selección */}
                <div className="mt-4">
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedPreset === preset.id
                      ? 'bg-cyan-500 text-black'
                      : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                  }`}>
                    {selectedPreset === preset.id ? 'Seleccionado' : 'Seleccionar'}
                  </div>
                </div>

                {/* Gradiente decorativo */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Configurador personalizado */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2">🛠️ Asistente Guiado (Para Resolver Dudas)</h2>
          <p className="text-white/60 mb-6">
            ¿No estás seguro de qué componentes elegir? Este asistente te ayuda a tomar decisiones con 
            recomendaciones personalizadas y validación de compatibilidad. <strong>Recuerda: después puedes 
            cambiar CUALQUIER componente</strong> — esto es solo una guía.
          </p>

          {/* Selección de perfil */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Paso 1: Elige tu perfil de uso</h3>
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

                    {/* Nombre y presupuesto */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{profile.name}</h3>
                      <span className="text-cyan-400 font-bold">{profile.budget}</span>
                    </div>

                    {/* Descripción */}
                    <p className="text-sm text-white/60 mb-4">{profile.desc}</p>

                    {/* Características */}
                    <div className="space-y-1 mb-4">
                      {profile.features.map((feature, i) => (
                        <div key={i} className="text-xs text-white/40">✓ {feature}</div>
                      ))}
                    </div>

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
        </div>

        {/* Pasos del proceso */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h3 className="text-xl font-bold mb-6">Proceso de Configuración</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: 1, label: 'Procesador', icon: '⚙️', desc: 'CPU + Overclocking' },
              { num: 2, label: 'Placa Base', icon: '🔌', desc: 'Chipset + Features' },
              { num: 3, label: 'Memoria RAM', icon: '💾', desc: 'DDR5 + XMP/EXPO' },
              { num: 4, label: 'Tarjeta Gráfica', icon: '🎨', desc: 'GPU + OC Profile' },
              { num: 5, label: 'Almacenamiento', icon: '💿', desc: 'NVMe + RAID' },
              { num: 6, label: 'Refrigeración', icon: '❄️', desc: 'AIO + RGB' },
              { num: 7, label: 'Fuente', icon: '⚡', desc: 'PSU + Cables' },
              { num: 8, label: 'Caja', icon: '📦', desc: 'Case + RGB' },
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <div className="text-2xl">{step.icon}</div>
                  <div className="text-sm text-white/80 font-semibold">{step.label}</div>
                  <div className="text-xs text-white/60">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ejemplos de proyectos personalizados */}
        <div className="mt-12 rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-pink-500/10 p-8">
          <h3 className="text-xl font-bold mb-2">💡 Ejemplos de Proyectos Personalizados</h3>
          <p className="text-white/60 mb-6">
            Estos son algunos builds reales que hemos montado. Si tienes algo en mente, ¡cuéntanoslo!
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Loop Extremo',
                desc: 'Doble loop: uno para CPU+GPU (agua destilada), otro para estética (UV verde)',
                specs: ['RTX 5090', 'AMD 9950X', 'DDR5 192GB', 'Tubing rígido PETG'],
                budget: '8500€',
                icon: '❄️'
              },
              {
                title: 'Silent Workstation',
                desc: 'PC para estudio de grabación. <15dB en idle, ventiladores Noctua industriales',
                specs: ['RTX 4080', 'Intel 14900K', 'DDR5 128GB', 'Case insonorizado'],
                budget: '4200€',
                icon: '🔇'
              },
              {
                title: 'RGB Show Build',
                desc: 'Máximo RGB sincronizado: iCUE + Aura Sync + 12 ventiladores ARGB',
                specs: ['RTX 4090', 'AMD 7950X3D', 'DDR5 64GB RGB', 'Cables sleeved custom'],
                budget: '5800€',
                icon: '🌈'
              }
            ].map((project, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 transition-all">
                <div className="text-4xl mb-3">{project.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
                <p className="text-sm text-white/70 mb-4">{project.desc}</p>
                <div className="space-y-1 mb-4">
                  {project.specs.map((spec, j) => (
                    <div key={j} className="text-xs text-white/50">• {spec}</div>
                  ))}
                </div>
                <div className="text-cyan-400 font-bold">{project.budget}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/20 hover:border-white/40 transition-all"
            >
              📧 Solicitar proyecto personalizado
            </Link>
          </div>
        </div>

        {/* Servicios adicionales */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h3 className="text-xl font-bold mb-6">🔧 Servicios Adicionales</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎨', name: 'RGB Personalizado', desc: 'Configuración de iluminación', price: '+50€' },
              { icon: '⚡', name: 'Overclocking Pro', desc: 'Optimización de rendimiento', price: '+100€' },
              { icon: '🌡️', name: 'Test Térmico', desc: 'Validación de temperaturas', price: '+75€' },
              { icon: '🔧', name: 'Cableado Premium', desc: 'Cables personalizados', price: '+80€' },
              { icon: '🛡️', name: 'Garantía 5 años', desc: 'Extensión de garantía', price: '+200€' },
              { icon: '📦', name: 'Embalaje Premium', desc: 'Packaging especial', price: '+30€' },
            ].map((service, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center hover:border-white/20 transition-all">
                <div className="text-3xl mb-2">{service.icon}</div>
                <div className="text-sm font-semibold text-white/80 mb-1">{service.name}</div>
                <div className="text-xs text-white/60 mb-2">{service.desc}</div>
                <div className="text-cyan-400 font-bold">{service.price}</div>
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