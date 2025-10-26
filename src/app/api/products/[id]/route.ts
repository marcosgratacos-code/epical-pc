import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const body = await req.json();
    const data = {
      name: String(body.name ?? "").trim(),
      slug: String(body.slug ?? "").trim(),
      sku: String(body.sku ?? "").trim(),
      shortName: body.shortName ? String(body.shortName).trim() : null,
      price: Math.round(Number(body.price) * 100) || 0,
      inStock: Boolean(body.inStock),
      tag: body.tag || null,
      imageUrl: body.imageUrl ? String(body.imageUrl).trim() : null,
    };

    const updated = await prisma.product.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json({ error: "Slug o SKU ya existen" }, { status: 409 });
    }
    return NextResponse.json({ error: "Error actualizando producto" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error eliminando producto" }, { status: 500 });
  }
}
