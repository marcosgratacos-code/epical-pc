import { PRODUCTS, type Product } from "../lib/products";

type Row =
  | "GPU"
  | "CPU"
  | "RAM"
  | "Almacenamiento"
  | "Placa base"
  | "Caja"
  | "Fuente"
  | "Precio";

// util: extrae el valor de specs por prefijo (p. ej. "GPU ", "CPU ")
function pick(specs: string[], prefix: string, fallback = "—") {
  const s = specs.find((x) => x.toLowerCase().startsWith(prefix.toLowerCase()));
  if (!s) return fallback;
  return s.slice(prefix.length).trim();
}

function getField(p: Product, row: Row) {
  switch (row) {
    case "GPU":
      return pick(p.specs, "GPU ");
    case "CPU":
      return pick(p.specs, "CPU ");
    case "RAM":
      return pick(p.specs, "RAM ");
    case "Almacenamiento":
      return pick(p.specs, "SSD ", pick(p.specs, "NVMe ", "—"));
    case "Placa base":
      return pick(p.specs, "Placa ");
    case "Caja":
      return pick(p.specs, "Caja ");
    case "Fuente":
      return pick(p.specs, "Fuente ");
    case "Precio":
      return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
        p.price
      );
  }
}

function pickRecommendedSlug(list: Product[]) {
  // Heurística simple: recomendar el precio intermedio (suele ser el “mejor valor”)
  const sorted = [...list].sort((a, b) => a.price - b.price);
  return sorted[Math.floor(sorted.length / 2)]?.slug ?? list[0]?.slug;
}

export default function CompareTable({
  currentSlug,
  recommendedSlug,
}: {
  currentSlug?: string;
  /** si no lo pasas, se calcula automáticamente por precio intermedio */
  recommendedSlug?: string;
}) {
  const list = [...PRODUCTS].sort((a, b) =>
    a.slug === currentSlug ? -1 : b.slug === currentSlug ? 1 : 0
  );

  const recommended = recommendedSlug ?? pickRecommendedSlug(list);

  const rows: Row[] = [
    "GPU",
    "CPU",
    "RAM",
    "Almacenamiento",
    "Placa base",
    "Caja",
    "Fuente",
    "Precio",
  ];

  return (
    <section className="mt-10">
      <h3 className="mb-3 text-lg font-semibold">Comparar configuraciones</h3>

      {/* contenedor con scroll + snap en móvil */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 snap-x snap-mandatory">
        <table className="min-w-[720px] w-full border-separate border-spacing-0 bg-black text-sm">
          <thead className="sticky top-0 z-20">
            <tr className="bg-white/[0.03] text-left">
              <th className="sticky left-0 z-30 bg-white/[0.03] p-3 font-semibold">
                Característica
              </th>
              {list.map((p) => {
                const isCurrent = p.slug === currentSlug;
                const isRec = p.slug === recommended;
                return (
                  <th key={p.id} className="p-3 font-semibold snap-start">
                    <div
                      className={`rounded-xl border px-3 py-2 ${
                        isCurrent
                          ? "border-white/40 bg-white/[0.06]"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <a href={`/products/${p.slug}`} className="truncate">
                          {p.name}
                        </a>
                        {isRec && (
                          <span className="rounded-full bg-white text-black px-2 py-0.5 text-xs font-bold">
                            ⭐ Recomendado
                          </span>
                        )}
                      </div>
                      <div className="mt-2">
                        <a
                          href={`/products/${p.slug}`}
                          className="inline-block rounded-lg border border-white/20 px-2 py-1 text-xs hover:border-white/40"
                        >
                          Ver
                        </a>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r} className={i % 2 ? "bg-white/[0.02]" : ""}>
                <td className="sticky left-0 z-10 bg-black p-3 text-white/80">{r}</td>
                {list.map((p) => (
                  <td key={p.id + r} className="p-3 text-white/80">
                    {getField(p, r)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-white/50">
        * Componentes sujetos a equivalencias por stock, manteniendo gama y rendimiento.
      </p>
    </section>
  );
}
