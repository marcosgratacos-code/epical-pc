'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Gauge, Rainbow, Thermometer, Wrench,
  Gem, CheckCircle2, Rocket, Cpu, Monitor, HardDrive, Fan,
  BatteryCharging, Box, Star, Zap, Camera, Computer, Cpu as Cpu2, Palette, Shield,
  Cable, Package, Activity
} from 'lucide-react';

type Props = {
  onSelectPreset?: (id: string) => void;
  onStartWizard?: () => void;
  onStepChange?: (step: number) => void;
};

const container = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.165, 0.84, 0.44, 1] as const, staggerChildren: 0.06 } },
};
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function ConfiguratorEpic({ onSelectPreset, onStartWizard, onStepChange }: Props) {
  return (
    <section className="relative">
      {/* fondo suave coherente con el hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[8rem] h-[36rem] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Título */}
        <header className="mb-6 mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Configurador de PCs <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Personalizados</span>
          </h1>
          <p className="mt-2 max-w-2xl text-white/80">
            Crea tu PC perfecto con <span className="font-semibold text-sky-300">personalización extrema</span>. Validación térmica, overclocking seguro,
            RGB sincronizado y <span className="font-semibold">3 años de garantía</span>.
          </p>
        </header>

        {/* Feature bar */}
        <FeaturesBar />

        <div className="mt-10 grid grid-cols-12 gap-8">
          {/* Columna principal */}
          <div className="col-span-12 lg:col-span-8 space-y-10">
            <FullyCustom onStartWizard={onStartWizard} />
            <Presets onSelectPreset={onSelectPreset} />
            <PersonaWizard onStartWizard={onStartWizard} />
            <ProcessStepper onStepChange={onStepChange} />
            <Examples />
            <Addons />
          </div>

          {/* Resumen sticky */}
          <aside className="col-span-12 lg:col-span-4">
            <SummaryDrawer />
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ======================= SUB-COMPONENTES ======================= */

function FeaturesBar() {
  const items = [
    { icon: Gauge, title: 'Overclocking automático', desc: 'Perfiles seguros' },
    { icon: Rainbow, title: 'RGB personalizable', desc: '16M colores' },
    { icon: Thermometer, title: 'Validación térmica', desc: 'Test completo' },
    { icon: Wrench, title: 'Montaje profesional', desc: 'Cableado perfecto' },
  ];

  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
      className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((it) => (
        <motion.div key={it.title} variants={item}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:bg-white/7 transition">
          <div className="flex items-center gap-3">
            <it.icon className="h-5 w-5 text-sky-300" />
            <div>
              <p className="text-sm font-semibold text-white">{it.title}</p>
              <p className="text-xs text-white/60">{it.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function FullyCustom({ onStartWizard }: { onStartWizard?: () => void }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/70 to-slate-900/30 p-6">
      <div className="mb-5 flex items-center gap-3">
        <Gem className="h-6 w-6 text-sky-300" />
        <h2 className="text-xl font-bold text-white">PCs 100% Personalizados</h2>
      </div>

      <p className="max-w-3xl text-white/85">
        ¿Quieres componentes específicos que no ves en la guía? Montamos PCs con <b>CUALQUIER</b> componente que necesites.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white/4 p-4 border border-white/10">
          <h3 className="mb-2 flex items-center gap-2 text-white font-semibold">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Componentes a tu elección
          </h3>
          <ul className="list-disc pl-5 text-white/80 text-sm space-y-1">
            <li>Refrigeración líquida custom (360/420, doble loop)</li>
            <li>Cualquier GPU, CPU, placa que encuentres</li>
            <li>Tubing rígido o blando; colores personalizados</li>
            <li>Watercooling para GPU, CPU, RAM y VRM</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white/4 p-4 border border-white/10">
          <h3 className="mb-2 flex items-center gap-2 text-white font-semibold">
            <Star className="h-4 w-4 text-blue-300" /> Estética extrema
          </h3>
          <ul className="list-disc pl-5 text-white/80 text-sm space-y-1">
            <li>Cableado sleeved en cualquier color</li>
            <li>RGB sincronizado (ARGb, iCUE, Aura Sync)</li>
            <li>Cajas custom o modificadas</li>
            <li>Pintura y acabados premium</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/contacto"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-white hover:scale-[1.03] transition">
          <Rocket className="h-4 w-4" /> Cuéntanos tu proyecto
        </a>
        <button
          onClick={onStartWizard}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-white/90 hover:bg-white/10 transition">
          Usa el configurador guiado <Zap className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const PRESETS = [
  {
    id: 'gaming-pro',
    title: 'Gaming Pro',
    bullets: ['RTX 4070 Ti', 'AMD 7600X', '32GB DDR5', 'AIO 240mm'],
  },
  { id: 'workstation', title: 'Workstation', bullets: ['RTX 4080', 'AMD 7700X', '64GB DDR5', 'NVMe 2TB'] },
  { id: 'streaming', title: 'Streaming Setup', bullets: ['RTX 4070', 'AMD 7600X', '32GB DDR5', 'Capture Card'] },
  { id: 'silent-pro', title: 'Silent Pro', bullets: ['RTX 4060', 'AMD 7600', '16GB DDR5', 'Noctua Cooler'] },
];

function Presets({ onSelectPreset }: { onSelectPreset?: (id: string) => void }) {
  return (
    <section>
      <h3 className="mb-3 text-xl font-bold text-white">Configuraciones Profesionales</h3>
      <p className="mb-5 text-white/75">
        Presets optimizados por nuestros expertos (puedes cambiar cualquier componente). Incluyen validación térmica y garantía extendida.
      </p>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
        className="grid gap-5 md:grid-cols-2">
        {PRESETS.map((p) => (
          <motion.div key={p.id} variants={item}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:bg-white/7 transition">
            <div className="flex items-center gap-3 mb-3">
              <Monitor className="h-5 w-5 text-blue-300" />
              <h4 className="text-white font-semibold">{p.title}</h4>
            </div>
            <ul className="mt-3 text-sm text-white/80 space-y-1 list-disc pl-5">
              {p.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>

            <button
              onClick={() => onSelectPreset?.(p.id)}
              className="mt-4 w-full rounded-xl bg-white/10 py-2 text-white/90 hover:bg-white/15 transition">
              Seleccionar
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

const PERSONAS = [
  { icon: Activity, title: 'Esports 1080p', tips: ['240+ FPS', 'CPU rápida', 'Estable'] },
  { icon: GamepadIcon, title: '4K Ultra', tips: ['Ray Tracing', 'VR Ready', 'GPU flagship'] },
  { icon: Camera, title: 'Edición Video', tips: ['Render rápido', 'Color accuracy', 'RAM 64GB+'] },
  { icon: Cpu2, title: 'IA / LLM', tips: ['VRAM máxima', 'RAM 96GB+', 'HPC Ready'] },
  { icon: BriefcaseIcon, title: 'Ofimática Silenciosa', tips: ['<20dB', 'Eficiente', 'Profesional'] },
];

function PersonaWizard({ onStartWizard }: { onStartWizard?: () => void }) {
  return (
    <section>
      <h3 className="mb-3 text-xl font-bold text-white">Asistente Guiado (Para Resolver Dudas)</h3>
      <p className="mb-5 text-white/75">
        Elige tu perfil de uso. Te sugerimos una configuración y luego <b>puedes cambiar cualquier componente</b>.
      </p>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PERSONAS.map((p) => (
          <motion.div key={p.title} variants={item}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:bg-white/7 transition">
            <div className="flex items-center gap-3 mb-3">
              <p.icon className="h-5 w-5 text-violet-300" />
              <h4 className="text-white font-semibold">{p.title}</h4>
            </div>
            <ul className="mt-3 text-sm text-white/80 space-y-1 list-disc pl-5">
              {p.tips.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-5 flex justify-center gap-3">
        <button
          onClick={onStartWizard}
          className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-white/90 hover:bg-white/10 transition">
          Omitir y configurar con guía
        </button>
        <a
          href="/configurador-libre"
          className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-white/90 hover:bg-blue-500/20 transition">
          Configurar libremente
        </a>
      </div>
    </section>
  );
}

function ProcessStepper({ onStepChange }: { onStepChange?: (n: number) => void }) {
  const steps = [
    { n: 1, label: 'Procesador', icon: Cpu },
    { n: 2, label: 'Placa Base', icon: MotherboardIcon },
    { n: 3, label: 'Memoria RAM', icon: MemoryIcon },
    { n: 4, label: 'Tarjeta Gráfica', icon: Palette },
    { n: 5, label: 'Almacenamiento', icon: HardDrive },
    { n: 6, label: 'Refrigeración', icon: Fan },
    { n: 7, label: 'Fuente', icon: BatteryCharging },
    { n: 8, label: 'Caja', icon: Box },
  ];
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-4 text-xl font-bold text-white">Proceso de Configuración</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {steps.map((s) => (
          <button key={s.n}
            onClick={() => onStepChange?.(s.n)}
            className="flex items-center gap-3 rounded-2xl bg-black/20 px-4 py-3 text-left text-white/85 hover:bg-white/10 border border-white/10">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white text-sm">{s.n}</span>
            <div className="flex items-center gap-2">
              <s.icon className="h-4 w-4 text-blue-300" />
              <span className="text-sm">{s.label}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function Examples() {
  const cards = [
    {
      title: 'Custom Loop Extremo',
      lines: ['RTX 5090', 'AMD 9950X', 'DDR5 192GB', 'Tubing rígido PETG'],
      icon: SnowIcon,
    },
    { title: 'Silent Workstation', lines: ['RTX 4080', 'Intel 14900K', 'DDR5 128GB', 'Case insonorizado'], icon: MuteIcon },
    { title: 'RGB Show Build', lines: ['RTX 4090', 'AMD 7950X3D', 'DDR5 64GB RGB', 'Cables sleeved'], icon: Rainbow },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-900/30 p-6">
      <h3 className="mb-3 text-xl font-bold text-white">Ejemplos de Proyectos Personalizados</h3>
      <p className="mb-6 text-white/75">Algunos builds reales que hemos montado.</p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3 mb-3">
              <c.icon className="h-5 w-5 text-sky-300" />
              <h4 className="text-white font-semibold">{c.title}</h4>
            </div>
            <ul className="mt-3 text-sm text-white/80 space-y-1 list-disc pl-5">
              {c.lines.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Addons() {
  const items = [
    { icon: Palette, title: 'RGB Personalizado', desc: 'Configuración de iluminación' },
    { icon: Zap, title: 'Overclocking Pro', desc: 'Optimización de rendimiento' },
    { icon: Thermometer, title: 'Test Térmico', desc: 'Validación de temperaturas' },
    { icon: Cable, title: 'Cableado Premium', desc: 'Cables personalizados' },
    { icon: Shield, title: 'Garantía 5 años', desc: 'Extensión de garantía' },
    { icon: Package, title: 'Embalaje Premium', desc: 'Packaging especial' },
  ];
  return (
    <section className="">
      <h3 className="mb-4 text-xl font-bold text-white">Servicios Adicionales</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:bg-white/7 transition">
            <div className="flex items-center gap-3">
              <it.icon className="h-5 w-5 text-blue-300" />
              <div>
                <p className="text-white font-semibold">{it.title}</p>
                <p className="text-xs text-white/60">{it.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SummaryDrawer() {
  const tags = ['Silencio', 'Estable', 'TOP Gaming', '3 años garantía'];
  return (
    <div className="sticky top-20 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <h4 className="text-white text-xl font-bold mb-4">Tu Configuración</h4>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">{t}</span>
        ))}
      </div>

      <button className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-white font-semibold shadow-[0_0_30px_-10px_rgba(16,185,129,0.6)] hover:scale-[1.02] transition">
        Enviar Configuración
      </button>
      <button className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white/85 hover:bg-white/10 transition">
        Nueva configuración
      </button>
    </div>
  );
}

/* --------- Mini íconos placeholders (para evitar dependencias extra) --------- */
function GamepadIcon(props: any) { return <span {...props}>🎮</span>; }
function MotherboardIcon(props: any) { return <span {...props}>🧩</span>; }
function MemoryIcon(props: any) { return <span {...props}>💾</span>; }
function SnowIcon(props: any) { return <span {...props}>❄️</span>; }
function MuteIcon(props: any) { return <span {...props}>🔇</span>; }
function BriefcaseIcon(props: any) { return <span {...props}>💼</span>; }