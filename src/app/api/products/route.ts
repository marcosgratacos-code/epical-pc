import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json({ error: "Error leyendo productos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
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

    const created = await prisma.product.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json({ error: "Slug o SKU ya existen" }, { status: 409 });
    }
    return NextResponse.json({ error: "Error creando producto" }, { status: 500 });
  }
}
