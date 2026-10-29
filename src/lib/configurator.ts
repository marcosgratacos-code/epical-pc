import {
  CPUS, MOTHERBOARDS, RAMS, GPUS, STORAGES, PSUS, CASES, COOLERS, getPartsByCategory,
} from "@/lib/parts-data";
import { checkCompatibility, estimateSystemWatts } from "@/lib/compat";
import type { Build, PartCategory } from "@/types/parts";

export type Selection = {
  cpu?: string; mb?: string; ram?: string; gpu?: string; storage?: string[];
  psu?: string; case?: string; cooler?: string;
};

type SingleCat = "cpu" | "mb" | "ram" | "gpu" | "psu" | "case" | "cooler";
export const SINGLE_CATEGORIES: SingleCat[] = ["cpu", "mb", "ram", "gpu", "psu", "case", "cooler"];
const MAX_STORAGE = 2;

export const CATEGORY_LABEL: Record<PartCategory, string> = {
  cpu: "Procesador", mb: "Placa base", ram: "Memoria", gpu: "Gráfica",
  storage: "Almacenamiento", cooler: "Refrigeración", case: "Caja", psu: "Fuente",
};

type AnyPart = { id: string; name: string; price: { eur: number }; stock?: string };

const LISTS: Record<SingleCat | "storage", AnyPart[]> = {
  cpu: CPUS, mb: MOTHERBOARDS, ram: RAMS, gpu: GPUS, storage: STORAGES,
  psu: PSUS, case: CASES, cooler: COOLERS,
};

export type Evaluation = {
  ok: boolean;                 // configuración completa y válida
  errors: string[];            // bloqueantes
  warnings: string[];
  tips: string[];
  missing: PartCategory[];     // piezas sin elegir
  lines: { category: PartCategory; id: string; name: string; price: number }[];
  total: number;               // calculado aquí, nunca del cliente
  estimatedWatts: number;
  priceIsOrientative: boolean;
  incompatible: Partial<Record<PartCategory, Record<string, string>>>;
};

function resolve(sel: Selection): { build: Build; unknown: string[] } {
  const unknown: string[] = [];
  const pick = (cat: SingleCat | "storage", id?: string) => {
    if (!id) return undefined;
    const p = LISTS[cat].find((x) => x.id === id);
    if (!p) unknown.push(`${cat}: ${id}`);
    return p;
  };
  const storage = (sel.storage ?? []).slice(0, MAX_STORAGE)
    .map((id) => pick("storage", id)).filter(Boolean);
  const build = {
    cpu: pick("cpu", sel.cpu), mb: pick("mb", sel.mb), ram: pick("ram", sel.ram),
    gpu: pick("gpu", sel.gpu), storage, psu: pick("psu", sel.psu),
    case: pick("case", sel.case), cooler: pick("cooler", sel.cooler),
  } as unknown as Build;
  return { build, unknown };
}

function hardErrors(build: Build) {
  const r = checkCompatibility(build);
  const hard = [...r.errors];
  // Reglas que el motor genérico deja en aviso y aquí bloquean
  const w = estimateSystemWatts(build);
  if (build.psu && w && build.psu.watts < w) {
    hard.push(`La fuente (${build.psu.watts} W) no cubre el consumo estimado (${w} W).`);
  }
  if (build.cooler?.type === "AIO" && build.cooler.radMM === 360 && build.case && !build.case.supports360Rad) {
    hard.push("La caja no admite un radiador de 360 mm.");
  }
  return { hard, warnings: r.warnings, tips: r.tips };
}

export function evaluate(sel: Selection): Evaluation {
  const { build, unknown } = resolve(sel);
  const core = hardErrors(build);
  const errors = [...unknown.map((u) => `Componente no válido (${u}).`), ...core.hard];
  if ((sel.storage?.length ?? 0) > MAX_STORAGE) errors.push(`Máximo ${MAX_STORAGE} unidades de almacenamiento.`);

  const lines: Evaluation["lines"] = [];
  const add = (category: PartCategory, p?: AnyPart) => {
    if (!p) return;
    if (p.stock === "oos") errors.push(`${p.name} no está disponible.`);
    lines.push({ category, id: p.id, name: p.name, price: p.price.eur });
  };
  for (const c of SINGLE_CATEGORIES) add(c, build[c] as unknown as AnyPart | undefined);
  (build.storage ?? []).forEach((s) => add("storage", s as unknown as AnyPart));

  const missing: PartCategory[] = [
    ...SINGLE_CATEGORIES.filter((c) => !build[c]),
    ...(build.storage?.length ? [] : (["storage"] as PartCategory[])),
  ];

  // Piezas que, dada la selección actual, provocarían un error nuevo si se eligieran
  const incompatible: Evaluation["incompatible"] = {};
  for (const cat of SINGLE_CATEGORIES) {
    for (const p of LISTS[cat]) {
      const trial = { ...build, [cat]: p } as unknown as Build;
      const hard = hardErrors(trial).hard.filter((e) => !core.hard.includes(e));
      if (hard.length) (incompatible[cat] ??= {})[p.id] = hard[0];
    }
  }

  return {
    ok: errors.length === 0 && missing.length === 0,
    errors, warnings: core.warnings, tips: core.tips, missing, lines,
    total: lines.reduce((s, l) => s + l.price, 0),
    estimatedWatts: estimateSystemWatts(build),
    priceIsOrientative: true,
    incompatible,
  };
}

export function catalogForClient() {
  return {
    cpu: getPartsByCategory("cpu"), mb: getPartsByCategory("mb"), ram: getPartsByCategory("ram"),
    gpu: getPartsByCategory("gpu"), storage: getPartsByCategory("storage"),
    cooler: getPartsByCategory("cooler"), case: getPartsByCategory("case"), psu: getPartsByCategory("psu"),
  };
}
