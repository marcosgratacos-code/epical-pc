import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const src = await prisma.product.findUnique({ where: { id } });
    if (!src) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    const ts = Date.now().toString().slice(-5);
    const slug = `${src.slug}-copy-${ts}`;
    const sku = `${src.sku}-C${ts}`;

    const duplicated = await prisma.product.create({
      data: {
        name: `${src.name} (Copia)`,
        slug,
        sku,
        shortName: src.shortName,
        price: src.price,
        inStock: src.inStock,
        tag: src.tag,
        imageUrl: src.imageUrl,
      },
    });

    return NextResponse.json(duplicated, { status: 201 });
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json({ error: "Slug o SKU duplicados" }, { status: 409 });
    }
    return NextResponse.json({ error: "Error duplicando producto" }, { status: 500 });
  }
}
