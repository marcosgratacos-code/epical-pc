"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Mode = "create" | "edit";

export default function ProductFormModal({
  open,
  mode,
  onClose,
  initial,
  productId,
}: {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  productId?: string;
  initial?: Partial<{
    name: string; slug: string; sku: string; shortName: string;
    price: number; inStock: boolean; tag: "" | "OFERTA" | "NUEVO" | "TOP_VENTAS";
    imageUrl: string;
  }>;
}) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const toSlug = (t: string) =>
    t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {mode === "create" ? "Nuevo Producto" : "Editar Producto"}
          </h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">✕</button>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setPending(true);
            try {
              const formData = new FormData(e.currentTarget);
              const data = {
                name: formData.get("name") as string,
                slug: formData.get("slug") as string,
                sku: formData.get("sku") as string,
                shortName: formData.get("shortName") as string,
                price: Number(formData.get("price")),
                inStock: formData.get("inStock") === "on",
                tag: (formData.get("tag") as string) || null,
                imageUrl: formData.get("imageUrl") as string,
              };

              const url = mode === "create" ? "/api/products" : `/api/products/${productId}`;
              const method = mode === "create" ? "POST" : "PUT";

              const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Error guardando");
              }

              toast.success(mode === "create" ? "Producto creado" : "Producto actualizado");
              router.refresh();
              onClose();
            } catch (err: any) {
              toast.error(err.message || "Error guardando producto");
            } finally {
              setPending(false);
            }
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* id oculto para EDIT */}
          {mode === "edit" && <input type="hidden" name="id" defaultValue={productId} />}

          <label className="flex flex-col gap-1">
            <span className="text-xs text-neutral-400">Nombre</span>
            <input
              name="name"
              required
              defaultValue={initial?.name ?? ""}
              className="rounded-lg bg-neutral-900 px-3 py-2 text-white"
              onBlur={(e) => {
                const slug = toSlug(e.currentTarget.value);
                const slugInput = document.querySelector<HTMLInputElement>('input[name="slug"]');
                if (slugInput && !slugInput.value) slugInput.value = slug;
              }}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-neutral-400">Slug</span>
            <input name="slug" required defaultValue={initial?.slug ?? ""} className="rounded-lg bg-neutral-900 px-3 py-2 text-white" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-neutral-400">SKU</span>
            <input name="sku" required defaultValue={initial?.sku ?? ""} className="rounded-lg bg-neutral-900 px-3 py-2 text-white" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-neutral-400">Alias corto</span>
            <input name="shortName" defaultValue={initial?.shortName ?? ""} className="rounded-lg bg-neutral-900 px-3 py-2 text-white" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-neutral-400">Precio (€)</span>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={initial?.price ?? 0}
              className="rounded-lg bg-neutral-900 px-3 py-2 text-white"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-neutral-400">Imagen (URL)</span>
            <input name="imageUrl" defaultValue={initial?.imageUrl ?? ""} className="rounded-lg bg-neutral-900 px-3 py-2 text-white" />
          </label>

          <label className="flex items-center gap-2">
            <input name="inStock" type="checkbox" defaultChecked={initial?.inStock ?? true} className="h-4 w-4" />
            <span className="text-sm text-neutral-300">En stock</span>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-neutral-400">Tag</span>
            <select name="tag" defaultValue={initial?.tag ?? ""} className="rounded-lg bg-neutral-900 px-3 py-2 text-white">
              <option value="">—</option>
              <option value="OFERTA">Oferta</option>
              <option value="NUEVO">Nuevo</option>
              <option value="TOP_VENTAS">Top Ventas</option>
            </select>
          </label>

          <div className="col-span-full mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg bg-neutral-800 px-4 py-2 hover:bg-neutral-700">
              Cerrar
            </button>
            <button disabled={pending} className="rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2 text-white disabled:opacity-60">
              {pending ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
