"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Cpu, Fan, HardDrive, MemoryStick, CircuitBoard, Box, Zap, MonitorPlay, AlertTriangle, Info, Ban } from "lucide-react";
import type { Evaluation, Selection } from "@/lib/configurator";
import type { PartCategory } from "@/types/parts";

type Part = {
  id: string; name: string; brand?: string; price: { eur: number }; stock?: string; recommended?: boolean;
  [k: string]: unknown;
};
type Catalog = Record<PartCategory, Part[]>;

const STEPS: { cat: PartCategory; label: string; hint: string; icon: typeof Cpu }[] = [
  { cat: "cpu", label: "Procesador", hint: "Define el socket de la placa y el rendimiento general.", icon: Cpu },
  { cat: "mb", label: "Placa base", hint: "Debe coincidir con el socket del procesador y el tipo de memoria.", icon: CircuitBoard },
  { cat: "ram", label: "Memoria", hint: "La generación (DDR4/DDR5) debe ser la de la placa.", icon: MemoryStick },
  { cat: "gpu", label: "Gráfica", hint: "La que más pesa en los fotogramas por segundo.", icon: MonitorPlay },
  { cat: "storage", label: "Almacenamiento", hint: "Hasta dos unidades.", icon: HardDrive },
  { cat: "cooler", label: "Refrigeración", hint: "Aire o líquida; debe soportar el socket.", icon: Fan },
  { cat: "case", label: "Caja", hint: "Comprueba la longitud de la gráfica y el radiador.", icon: Box },
  { cat: "psu", label: "Fuente", hint: "Debe cubrir el consumo estimado del equipo.", icon: Zap },
];

const eur = (n: number) => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

function chips(cat: PartCategory, p: Part): string[] {
  const v = (k: string) => p[k] as never;
  switch (cat) {
    case "cpu": return [`${v("cores")} núcleos / ${v("threads")} hilos`, `hasta ${v("boostGHz")} GHz`, `Socket ${v("socket")}`, `${v("tdpW")} W`];
    case "mb": return [`Socket ${v("socket")}`, `Chipset ${v("chipset")}`, `${v("ramGen")}`, v("wifi") ? `${v("wifi")}` : ""];
    case "ram": return [`${v("capacityGB")} GB`, `${v("ramGen")} ${v("mhz")} MHz`, `CL${v("cl")}`];
    case "gpu": return [`${v("vramGB")} GB VRAM`, v("tgpW") ? `${v("tgpW")} W` : "", v("lengthMM") ? `${v("lengthMM")} mm` : ""];
    case "storage": return [`${v("capacityTB")} TB`, `${v("type")}`, v("pcieGen") ? `PCIe ${v("pcieGen")}.0` : ""];
    case "cooler": return [v("type") === "AIO" ? `Líquida ${v("radMM")} mm` : "Aire", `${(v("compatibleSockets") as string[]).join(" · ")}`];
    case "case": return [v("maxGpuLenMM") ? `GPU hasta ${v("maxGpuLenMM")} mm` : "", v("supports360Rad") ? "Radiador 360 mm" : "", `${v("fansIncluded") ?? 0} ventiladores`];
    case "psu": return [`${v("watts")} W`, `${v("standard")}`, v("efficiency80") ? `80+ ${v("efficiency80")}` : ""];
  }
}

export default function TitanConfigurator({ catalog }: { catalog: Catalog }) {
  const [sel, setSel] = useState<Selection>({});
  const [step, setStep] = useState(0);
  const [ev, setEv] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [netError, setNetError] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const reqId = useRef(0);

  // Todo el cálculo de precio y compatibilidad lo hace el servidor
  useEffect(() => {
    const id = ++reqId.current;
    const ctrl = new AbortController();
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const r = await fetch("/api/configurador/validar", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sel), signal: ctrl.signal,
        });
        if (!r.ok) throw new Error(String(r.status));
        const data: Evaluation = await r.json();
        if (id === reqId.current) { setEv(data); setNetError(false); }
      } catch (e) {
        if ((e as Error).name !== "AbortError" && id === reqId.current) setNetError(true);
      } finally {
        if (id === reqId.current) setLoading(false);
      }
    }, 120);
    return () => { clearTimeout(t); ctrl.abort(); };
  }, [sel]);

  const current = STEPS[step];
  const options = useMemo(() => {
    const list = [...catalog[current.cat]];
    return list.sort((a, b) => Number(!!b.recommended) - Number(!!a.recommended) || a.price.eur - b.price.eur);
  }, [catalog, current.cat]);

  const isSelected = (cat: PartCategory, id: string) =>
    cat === "storage" ? !!sel.storage?.includes(id) : sel[cat as keyof Selection] === id;

  const choose = useCallback((cat: PartCategory, id: string) => {
    setSel((s) => {
      if (cat === "storage") {
        const cur = s.storage ?? [];
        const next = cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= 2 ? [...cur.slice(1), id] : [...cur, id];
        return { ...s, storage: next };
      }
      return { ...s, [cat]: s[cat as keyof Selection] === id ? undefined : id };
    });
  }, []);

  const doneCats = new Set<PartCategory>(STEPS.map((s) => s.cat).filter((c) => !(ev?.missing ?? STEPS.map((x) => x.cat)).includes(c)));
  const blocking = ev?.errors ?? [];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-w-0">
        <nav aria-label="Pasos del configurador" className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <ol className="flex min-w-max gap-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = i === step;
              const done = doneCats.has(s.cat);
              return (
                <li key={s.cat}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={active ? "step" : undefined}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      active ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <Icon className="h-4 w-4" aria-hidden="true" />}
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-6">
          <h2 className="text-headline font-semibold tracking-tight text-ink">{current.label}</h2>
          <p className="mt-2 text-muted">{current.hint}</p>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2" aria-label={`Opciones de ${current.label}`}>
          {options.map((p) => {
            const selected = isSelected(current.cat, p.id);
            const reason = !selected ? ev?.incompatible?.[current.cat]?.[p.id] : undefined;
            const oos = p.stock === "oos";
            const disabled = !!reason || oos;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => choose(current.cat, p.id)}
                  disabled={disabled}
                  aria-pressed={selected}
                  className={`flex h-full w-full flex-col rounded-3xl border p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    selected ? "border-neutral-900 bg-white shadow-[0_0_0_1px_#171717]" : "border-neutral-200 bg-white hover:border-neutral-400"
                  } ${disabled ? "cursor-not-allowed opacity-55" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">{p.brand}</span>
                    {selected && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>}
                    {!selected && p.recommended && !disabled && <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-neutral-700">Recomendado</span>}
                  </div>
                  <span className="mt-2 text-base font-semibold leading-snug text-ink">{p.name}</span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {chips(current.cat, p).filter(Boolean).map((c) => (
                      <span key={c} className="rounded-full bg-surface px-2.5 py-1 text-xs text-neutral-700">{c}</span>
                    ))}
                  </span>
                  <span className="mt-auto flex items-end justify-between pt-4">
                    <span className="text-lg font-semibold text-ink">{eur(p.price.eur)}</span>
                    {oos && <span className="text-xs font-medium text-red-700">Sin stock</span>}
                  </span>
                  {reason && (
                    <span className="mt-3 flex items-start gap-1.5 text-xs text-neutral-600">
                      <Ban className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {reason}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex justify-between gap-3">
          <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
            className="btn btn-secondary disabled:opacity-40">Anterior</button>
          <button type="button" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}
            className="btn btn-primary disabled:opacity-40">Siguiente</button>
        </div>
      </div>

      <aside id="resumen" className="lg:sticky lg:top-20 lg:self-start" aria-label="Resumen de la configuración">
        <div className="rounded-3xl border border-neutral-200 bg-surface p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">Tu TITAN</h2>
            <span aria-live="polite" aria-label={`Total de componentes ${eur(ev?.total ?? 0)}`} className={`text-3xl font-semibold tracking-tight text-ink ${loading ? "opacity-50" : ""}`}>
              {eur(ev?.total ?? 0)}
            </span>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {STEPS.map((s) => {
              const lines = ev?.lines.filter((l) => l.category === s.cat) ?? [];
              return (
                <li key={s.cat} className="flex items-start justify-between gap-3">
                  <span className="text-muted">{s.label}</span>
                  <span className="text-right text-ink">
                    {lines.length ? lines.map((l) => <span key={l.id} className="block">{l.name}</span>) : <span className="text-neutral-400">Sin elegir</span>}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 border-t border-neutral-200 pt-4">
            <p className="text-xs leading-relaxed text-muted">
              Precio orientativo de los componentes, calculado en nuestro servidor. El presupuesto final con montaje, pruebas, IVA y envío se confirma por escrito.
            </p>
            {ev && ev.estimatedWatts > 0 && <p className="mt-2 text-xs text-muted">Consumo estimado: {ev.estimatedWatts} W</p>}
          </div>

          <div className="mt-4 space-y-2" role="status" aria-live="polite">
            {netError && <p className="flex gap-2 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />No se pudo validar. Reintenta en unos segundos.</p>}
            {blocking.map((e) => <p key={e} className="flex gap-2 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{e}</p>)}
            {ev?.warnings.map((w) => <p key={w} className="flex gap-2 text-sm text-amber-800"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{w}</p>)}
            {ev && !blocking.length && ev.missing.length === 0 && <p className="flex gap-2 text-sm text-green-800"><Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Configuración completa y compatible.</p>}
            {ev && ev.missing.length > 0 && !blocking.length && <p className="flex gap-2 text-sm text-muted"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Faltan: {ev.missing.map((m) => STEPS.find((s) => s.cat === m)?.label.toLowerCase()).join(", ")}.</p>}
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <button type="button" className="btn btn-primary w-full disabled:opacity-40" disabled={!ev?.ok} onClick={() => setQuoteOpen(true)}>
              Solicitar presupuesto de esta configuración
            </button>
            <button type="button" onClick={() => { setSel({}); setStep(0); setQuoteOpen(false); }} className="btn btn-secondary w-full">Empezar de nuevo</button>
            <Link href="/contacto" className="btn-link mx-auto mt-1 text-sm">Prefiero que me asesoréis</Link>
          </div>
        </div>
        {quoteOpen && ev?.ok && <QuoteForm sel={sel} ev={ev} onClose={() => setQuoteOpen(false)} />}
      </aside>
    </div>
  );
}

function QuoteForm({ sel, ev, onClose }: { sel: Selection; ev: Evaluation; onClose: () => void }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [msg, setMsg] = useState("");
  const [fallback, setFallback] = useState<string | null>(null);
  const [leadId, setLeadId] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      const r = await fetch("/api/configurador/presupuesto", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selection: sel, nombre: f.get("nombre"), email: f.get("email"),
          telefono: f.get("telefono") || undefined, notas: f.get("notas") || undefined,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok) { setLeadId(data.leadId); setState("ok"); return; }
      setMsg(data.error || "No se pudo enviar."); setFallback(data.fallbackEmail ?? null); setState("fail");
    } catch {
      setMsg("No se pudo enviar."); setState("fail");
    }
  }

  const mailto = fallback
    ? `mailto:${fallback}?subject=${encodeURIComponent("Presupuesto TITAN a medida")}&body=${encodeURIComponent(
        ev.lines.map((l) => `${l.name}: ${l.price} €`).join("\n") + `\nTotal componentes (orientativo): ${ev.total} €`
      )}`
    : null;

  if (state === "ok") {
    return (
      <div className="mt-4 rounded-3xl border border-green-200 bg-green-50 p-6 text-sm text-green-900" role="status">
        <p className="font-semibold">Solicitud enviada ({leadId}).</p>
        <p className="mt-1">Te responderemos al correo indicado con la disponibilidad y el precio final.</p>
      </div>
    );
  }

  const input = "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent";
  return (
    <form onSubmit={submit} className="mt-4 space-y-3 rounded-3xl border border-neutral-200 bg-white p-6">
      <h3 className="font-semibold text-ink">Tus datos</h3>
      <div><label htmlFor="q-nombre" className="mb-1 block text-xs text-muted">Nombre</label><input id="q-nombre" name="nombre" required minLength={2} maxLength={100} autoComplete="name" className={input} /></div>
      <div><label htmlFor="q-email" className="mb-1 block text-xs text-muted">Correo electrónico</label><input id="q-email" name="email" type="email" required maxLength={150} autoComplete="email" className={input} /></div>
      <div><label htmlFor="q-tel" className="mb-1 block text-xs text-muted">Teléfono (opcional)</label><input id="q-tel" name="telefono" maxLength={30} autoComplete="tel" className={input} /></div>
      <div><label htmlFor="q-notas" className="mb-1 block text-xs text-muted">Notas (opcional)</label><textarea id="q-notas" name="notas" rows={3} maxLength={1000} className={input} /></div>
      <p className="text-xs text-muted">Usaremos estos datos únicamente para responder a tu solicitud.</p>
      {state === "fail" && (
        <p className="text-sm text-red-700" role="alert">
          {msg} {mailto && <a className="underline" href={mailto}>Envíanos esta configuración por correo</a>}
        </p>
      )}
      <div className="flex gap-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary flex-1 disabled:opacity-50">{state === "sending" ? "Enviando…" : "Enviar solicitud"}</button>
        <button type="button" onClick={onClose} className="btn btn-secondary">Cerrar</button>
      </div>
    </form>
  );
}
