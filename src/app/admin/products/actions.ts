"use server";

export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  sku: z.string().min(2),
  shortName: z.string().optional().nullable(),
  price: z.number().int().nonnegative(),
  inStock: z.boolean(),
  tag: z.enum(["OFERTA", "NUEVO", "TOP_VENTAS"]).nullable(),
  imageUrl: z.string().url().optional().nullable(),
});

export async function createProductAction(_prev: any, form: FormData) {
  const euro = Number((form.get("price") ?? "0").toString().replace(",", "."));
  const data = {
    name: (form.get("name") ?? "").toString().trim(),
    slug: (form.get("slug") ?? "").toString().trim(),
    sku: (form.get("sku") ?? "").toString().trim(),
    shortName: (form.get("shortName") ?? "").toString().trim() || null,
    price: Math.round((isNaN(euro) ? 0 : euro) * 100),
    inStock: form.get("inStock") === "on",
    tag: (() => {
      const v = (form.get("tag") ?? "").toString();
      return v === "" ? null : (v as "OFERTA" | "NUEVO" | "TOP_VENTAS");
    })(),
    imageUrl: ((form.get("imageUrl") ?? "").toString().trim() || null),
  };
  const parsed = ProductSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: "Datos inválidos" };

  try {
    await prisma.product.create({ data: parsed.data });
  } catch (e: any) {
    const msg = e?.code === "P2002" ? "Slug o SKU ya existen" : "Error creando producto";
    return { ok: false, error: msg };
  }
  revalidatePath("/admin/products");
  revalidatePath("/productos");
  return { ok: true };
}

export async function updateProductAction(_prev: any, form: FormData) {
  const id = (form.get("id") ?? "").toString();
  if (!id) return { ok: false, error: "ID faltante" };

  const euro = Number((form.get("price") ?? "0").toString().replace(",", "."));
  const data = {
    name: (form.get("name") ?? "").toString().trim(),
    slug: (form.get("slug") ?? "").toString().trim(),
    sku: (form.get("sku") ?? "").toString().trim(),
    shortName: (form.get("shortName") ?? "").toString().trim() || null,
    price: Math.round((isNaN(euro) ? 0 : euro) * 100),
    inStock: form.get("inStock") === "on",
    tag: (() => {
      const v = (form.get("tag") ?? "").toString();
      return v === "" ? null : (v as "OFERTA" | "NUEVO" | "TOP_VENTAS");
    })(),
    imageUrl: ((form.get("imageUrl") ?? "").toString().trim() || null),
  };
  const parsed = ProductSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: "Datos inválidos" };

  try {
    await prisma.product.update({ where: { id }, data: parsed.data });
  } catch (e: any) {
    const msg = e?.code === "P2002" ? "Slug o SKU ya existen" : "Error actualizando producto";
    return { ok: false, error: msg };
  }
  revalidatePath("/admin/products");
  revalidatePath("/productos");
  return { ok: true };
}

export async function duplicateProductAction(_prev: any, form: FormData) {
  const id = (form.get("id") ?? "").toString();
  if (!id) return { ok: false, error: "ID faltante" };
  const src = await prisma.product.findUnique({ where: { id } });
  if (!src) return { ok: false, error: "No encontrado" };

  const ts = Date.now().toString().slice(-5);
  const slug = `${src.slug}-copy-${ts}`;
  const sku = `${src.sku}-C${ts}`;

  await prisma.product.create({
    data: {
      ...src,
      id: undefined as any,
      slug,
      sku,
      name: `${src.name} (Copia)`,
      createdAt: undefined as any,
      updatedAt: undefined as any,
    },
  });

  revalidatePath("/admin/products");
  return { ok: true };
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    revalidatePath("/productos");
    return { ok: true };
  } catch (e: any) {
    throw new Error("Error eliminando producto");
  }
}
