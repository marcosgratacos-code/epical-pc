import Image from "next/image";
import { Product } from "../lib/products";

export default function ProductCard({ p, onAdd, onInfo }: {
  p: Product;
  onAdd: (id: string) => void;
  onInfo?: (p: Product) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
        <Image src={p.image} alt={p.name} fill className="object-contain" sizes="(max-width:1024px) 100vw, 50vw" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate font-semibold">{p.name}</div>
            <div className="text-sm text-white/60">{p.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}</div>
          </div>
          <span className="rounded-lg bg-white/10 px-2 py-1 text-xs">
            {p.inStock ? "En stock" : "Sin stock"}
          </span>
        </div>
        <ul className="mt-2 space-y-1 text-sm text-white/70">
          {p.specs.slice(0, 3).map((s) => (
            <li key={s}>• {s}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onAdd(p.id)}
          className="flex-1 rounded-xl bg-white px-4 py-2 font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400"
          disabled={!p.inStock}
        >
          Añadir
        </button>
        {onInfo && (
          <button
            onClick={() => onInfo(p)}
            className="rounded-xl border border-white/20 px-4 py-2 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            Info
          </button>
        )}
      </div>
    </div>
  );
}
