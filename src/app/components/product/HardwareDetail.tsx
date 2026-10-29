import { Cpu, HardDrive, MemoryStick, CircuitBoard, Fan, Box, Zap, MonitorPlay } from "lucide-react";
import type { HardwareItem } from "../../lib/product-details";
import Reveal from "../Reveal";

const ICONS: Record<string, typeof Cpu> = {
  "Gráfica": MonitorPlay,
  "Procesador": Cpu,
  "Placa base": CircuitBoard,
  "Memoria": MemoryStick,
  "Almacenamiento": HardDrive,
  "Refrigeración": Fan,
  "Caja": Box,
  "Fuente": Zap,
};

export default function HardwareDetail({ items }: { items: HardwareItem[] }) {
  return (
    <section aria-labelledby="hardware-titulo" className="mt-16">
      <Reveal>
        <h2 id="hardware-titulo" className="text-headline font-semibold tracking-tight text-ink">
          El hardware, en detalle
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Cada componente con su modelo exacto y los datos que publica el fabricante.
        </p>
      </Reveal>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((it) => {
          const Icon = ICONS[it.part] ?? Cpu;
          return (
            <li key={it.part} className="rounded-3xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">{it.part}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">{it.name}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-neutral-700">
                {it.facts.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden="true" className="text-muted">·</span>
                    {f}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
