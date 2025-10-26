"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Product } from "@prisma/client";

import ProductFormModal from "./ProductFormModal";
import toast from "react-hot-toast";

/* Debounce */
function useDebounced<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => { const id = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(id); }, [value, delay]);
  return debounced;
}

type Filters = {
  q?: string;
  tag?: "" | "OFERTA" | "NUEVO" | "TOP_VENTAS";
  stock?: "" | "in" | "out";
  page: number;
  pageSize: number;
  sort: "createdAt" | "price" | "name";
  dir: "asc" | "desc";
};

type Paging = {
  total: number;
  page: number;
  pageSize: number;
  showingFrom: number;
  showingTo: number;
  totalPages: number;
};

function FilterBar({
  initial,
  totals,
  paging,
}: {
  initial: Filters;
  totals: { totalAll: number; inStock: number; out: number };
  paging: Paging;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(initial.q ?? "");
  const [tag, setTag] = useState<Filters["tag"]>(initial.tag ?? "");
  const [stock, setStock] = useState<Filters["stock"]>(initial.stock ?? "");
  const [sort, setSort] = useState<Filters["sort"]>(initial.sort);
  const [dir, setDir] = useState<Filters["dir"]>(initial.dir);
  const [pageSize, setPageSize] = useState<number>(initial.pageSize);

  const qDebounced = useDebounced(q, 350);

  /* Cada cambio de filtro resetea página a 1 */
  function syncURL(extra?: Partial<Filters>) {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const next = {
      q: qDebounced,
      tag,
      stock,
      sort,
      dir,
      pageSize,
      page: 1,
      ...extra,
    };

    next.q ? params.set("q", next.q) : params.delete("q");
    next.tag ? params.set("tag", next.tag) : params.delete("tag");
    next.stock ? params.set("stock", next.stock) : params.delete("stock");
    params.set("sort", next.sort);
    params.set("dir", next.dir);
    params.set("pageSize", String(next.pageSize));
    params.set("page", String(next.page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  useEffect(() => { syncURL(); /* eslint-disable-next-line */ }, [qDebounced, tag, stock, sort, dir, pageSize]);

  return (
    <div className="grid gap-3 rounded-2xl border border-neutral-800 bg-neutral-950/40 p-3 md:grid-cols-2 xl:grid-cols-5">
      <div className="md:col-span-2 flex items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar nombre, SKU o slug…"
          className="w-full rounded-xl bg-neutral-900 px-3 py-2 text-sm text-white outline-none"
        />
        {q && (
          <button onClick={() => setQ("")} className="rounded-lg bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700">
            Limpiar
          </button>
        )}
      </div>

      <select className="rounded-xl bg-neutral-900 px-3 py-2 text-sm text-white" value={tag} onChange={(e) => setTag(e.target.value as Filters["tag"])}>
        <option value="">Tag: Todos</option>
        <option value="OFERTA">Oferta</option>
        <option value="NUEVO">Nuevo</option>
        <option value="TOP_VENTAS">Top Ventas</option>
      </select>

      <select className="rounded-xl bg-neutral-900 px-3 py-2 text-sm text-white" value={stock} onChange={(e) => setStock(e.target.value as Filters["stock"])}>
        <option value="">Stock: Todos</option>
        <option value="in">En stock</option>
        <option value="out">Sin stock</option>
      </select>

      <div className="flex items-center gap-2">
        <select className="w-full rounded-xl bg-neutral-900 px-3 py-2 text-sm text-white" value={`${sort}:${dir}`} onChange={(e) => {
          const [s, d] = e.target.value.split(":") as [Filters["sort"], Filters["dir"]];
          setSort(s); setDir(d);
        }}>
          <option value="createdAt:desc">Fecha · Nuevos primero</option>
          <option value="createdAt:asc">Fecha · Antiguos primero</option>
          <option value="price:asc">Precio · Menor a mayor</option>
          <option value="price:desc">Precio · Mayor a menor</option>
          <option value="name:asc">Nombre · A → Z</option>
          <option value="name:desc">Nombre · Z → A</option>
        </select>
      </div>

      <div className="xl:col-span-5 flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-neutral-400">
        <span>Mostrando {paging.showingFrom}-{paging.showingTo} de {paging.total} resultados · (Total catálogo: {totals.totalAll} · En stock: {totals.inStock} · Sin stock: {totals.out})</span>

        <div className="flex items-center gap-2">
          <label className="hidden sm:block">Por página</label>
          <select className="rounded-lg bg-neutral-900 px-2 py-1 text-xs text-white" value={pageSize}
                  onChange={(e) => setPageSize(parseInt(e.target.value, 10))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function Pagination({ paging }: { paging: Paging }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  if (paging.totalPages <= 1) return null;

  const go = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", String(page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const prev = Math.max(1, paging.page - 1);
  const next = Math.min(paging.totalPages, paging.page + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={() => go(prev)} disabled={paging.page === 1}
              className="rounded-lg bg-neutral-800 px-3 py-1.5 text-sm text-white disabled:opacity-40">← Anterior</button>
      <span className="text-xs text-neutral-400">Página {paging.page} / {paging.totalPages}</span>
      <button onClick={() => go(next)} disabled={paging.page === paging.totalPages}
              className="rounded-lg bg-neutral-800 px-3 py-1.5 text-sm text-white disabled:opacity-40">Siguiente →</button>
    </div>
  );
}

export default function ProductsTable({
  products,
  totals,
  initialFilters,
  paging,
}: {
  products: Product[];
  totals: { totalAll: number; inStock: number; out: number };
  initialFilters: Filters;
  paging: Paging;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [current, setCurrent] = useState<Product | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const openCreate = () => {
    setMode("create");
    setCurrent(null);
    setOpen(true);
  };
  const openEdit = (p: Product) => {
    setMode("edit");
    setCurrent(p);
    setOpen(true);
  };

  const onDelete = async (p: Product) => {
    if (!confirm(`Eliminar "${p.name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${p.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error eliminando");
      toast.success("Producto eliminado");
      router.refresh();
    } catch {
      toast.error("Error eliminando producto");
    }
  };

  // Botón de duplicar
  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}/duplicate`, { method: "POST" });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error duplicando");
      }
      toast.success("Producto duplicado");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Error duplicando producto");
    }
  };

  const exportUrl = `/admin/products/export?${sp?.toString() ?? ""}`;

  return (
    <div className="space-y-4">
      <FilterBar initial={initialFilters} totals={totals} paging={paging} />

      <div className="flex items-center justify-between">
        <button onClick={openCreate} className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
          + Añadir Producto
        </button>
        <a href={exportUrl} className="rounded-xl bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700">
          Exportar CSV
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-950/50">
            <tr className="text-neutral-300">
              <th className="px-4 py-3 text-left">Producto</th>
              <th className="px-4 py-3 text-left">Precio</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Tag</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {products.map((p) => (
              <tr key={p.id} className="text-neutral-200">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imageUrl} alt={p.name} className="h-9 w-9 rounded-lg object-cover" />
                    ) : (<div className="h-9 w-9 rounded-lg bg-neutral-800" />)}
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-neutral-500">{p.shortName ?? p.sku}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(p.price / 100)}
                </td>
                <td className="px-4 py-3">
                  {p.inStock
                    ? <span className="rounded-full bg-emerald-900/60 px-2 py-1 text-xs text-emerald-300">✓ En Stock</span>
                    : <span className="rounded-full bg-rose-900/60 px-2 py-1 text-xs text-rose-300">Sin stock</span>}
                </td>
                <td className="px-4 py-3">
                  {p.tag && (
                    <span className="rounded-full bg-indigo-900/60 px-2 py-1 text-xs text-indigo-300">
                      {p.tag === "OFERTA" ? "Oferta" : p.tag === "NUEVO" ? "Nuevo" : "Top Ventas"}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(p)} className="rounded-lg bg-neutral-800 px-3 py-1.5 hover:bg-neutral-700">Editar</button>
                    <button onClick={() => handleDuplicate(p.id)} className="rounded-lg bg-neutral-800 px-3 py-1.5 hover:bg-neutral-700">Duplicar</button>
                    <button onClick={() => onDelete(p)} className="rounded-lg bg-rose-900/60 px-3 py-1.5 text-rose-100 hover:bg-rose-800">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td className="px-4 py-10 text-center text-neutral-500" colSpan={5}>No hay resultados con esos filtros.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination paging={paging} />

      <ProductFormModal
        open={open}
        mode={mode}
        onClose={() => setOpen(false)}
        productId={current?.id}
        initial={
          current
            ? {
                name: current.name,
                slug: current.slug,
                sku: current.sku,
                shortName: current.shortName ?? "",
                price: current.price / 100,
                inStock: current.inStock,
                tag: (current.tag ?? "") as any,
                imageUrl: current.imageUrl ?? "",
              }
            : undefined
        }
      />
    </div>
  );
}
