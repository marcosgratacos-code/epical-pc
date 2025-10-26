"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Row = {
  userId: string;
  id: string;
  slug: string;
  name: string;
  price?: number;
  image?: string;
  viewedAt?: string;
};

export default function AdminRecentlyViewedClient() {
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [userId, setUserId] = useState("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    if (q) params.set("q", q);
    if (userId) params.set("userId", userId);
    if (from) params.set("from", from);
    if (to) params.set("to", to);

    const res = await fetch(`/api/admin/recently-viewed?${params.toString()}`);
    const data = await res.json();
    setRows(data.data || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]); // buscar bajo demanda con botón

  const onSearch = () => {
    setPage(1);
    fetchData();
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const exportCSV = () => {
    const header = ["userId", "id", "slug", "name", "price", "viewedAt"].join(",");
    const body = rows
      .map(r =>
        [
          r.userId,
          r.id,
          r.slug,
          `"${(r.name || "").replace(/"/g, '""')}"`,
          r.price ?? "",
          r.viewedAt ? new Date(r.viewedAt).toISOString() : "",
        ].join(",")
      )
      .join("\n");
    const csv = header + "\n" + body;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vistos_recientemente_p${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900/70 p-4 md:p-6">
      {/* Filtros */}
      <div className="grid md:grid-cols-5 gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar (nombre o slug)"
          className="rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder:text-white/50"
        />
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Filtrar por userId"
          className="rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder:text-white/50"
        />
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white"
        />
        <button
          onClick={onSearch}
          className="rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 text-black font-semibold px-3 py-2 hover:from-violet-600 hover:to-cyan-500 transition-colors"
        >
          Buscar
        </button>
      </div>

      {/* Barra superior */}
      <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="text-white/70 text-sm">
          {loading ? "Cargando…" : `${total} resultados`}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-white/70">Por página</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
            className="rounded-lg bg-white/10 border border-white/10 px-2 py-1 text-sm text-white"
          >
            {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>

          <button
            onClick={exportCSV}
            className="ml-3 rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm hover:bg-white/20 transition-colors"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-white/70 border-b border-white/10">
              <th className="py-2 pr-3">Usuario</th>
              <th className="py-2 pr-3">Producto</th>
              <th className="py-2 pr-3">Slug</th>
              <th className="py-2 pr-3">Imagen</th>
              <th className="py-2 pr-3">Precio</th>
              <th className="py-2 pr-3">Visto</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={`${r.userId}-${r.slug}-${idx}`} className="border-b border-white/5">
                <td className="py-3 pr-3">{r.userId}</td>
                <td className="py-3 pr-3">{r.name}</td>
                <td className="py-3 pr-3">{r.slug}</td>
                <td className="py-3 pr-3">
                  {r.image ? (
                    <div className="relative w-16 h-12">
                      <Image src={r.image} alt={r.name} fill className="object-contain rounded-md" sizes="64px" />
                    </div>
                  ) : (
                    <span className="text-white/40">—</span>
                  )}
                </td>
                <td className="py-3 pr-3">
                  {typeof r.price === "number"
                    ? r.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })
                    : "—"}
                </td>
                <td className="py-3 pr-3">
                  {r.viewedAt ? new Date(r.viewedAt).toLocaleString("es-ES") : "—"}
                </td>
              </tr>
            ))}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-white/60">Sin resultados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="rounded-lg bg-white/10 px-3 py-2 disabled:opacity-40 hover:bg-white/20 transition-colors"
        >
          ← Anterior
        </button>
        <span className="text-white/70 text-sm">
          Página {page} / {Math.max(1, Math.ceil(total / pageSize))}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page >= Math.ceil(total / pageSize)}
          className="rounded-lg bg-white/10 px-3 py-2 disabled:opacity-40 hover:bg-white/20 transition-colors"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
