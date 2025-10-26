import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const header = request.headers.get("x-seed-token");
  if (!process.env.ADMIN_SEED_TOKEN || header !== process.env.ADMIN_SEED_TOKEN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const items = [
    {
      slug: "epical-starter",
      sku: "epic1",
      name: "EPICAL STARTER",
      shortName: "epic1",
      price: 90000,
      inStock: true,
      tag: "OFERTA" as const,
      imageUrl: "https://picsum.photos/seed/starter/400/300",
    },
    {
      slug: "epical-advanced",
      sku: "epic2",
      name: "EPICAL ADVANCED",
      shortName: "epic2",
      price: 230000,
      inStock: true,
      tag: "NUEVO" as const,
      imageUrl: "https://picsum.photos/seed/advanced/400/300",
    },
    {
      slug: "epical-ultra",
      sku: "epic3",
      name: "EPICAL ULTRA",
      shortName: "epic3",
      price: 280000,
      inStock: true,
      tag: "TOP_VENTAS" as const,
      imageUrl: "https://picsum.photos/seed/ultra/400/300",
    },
  ];

  for (const it of items) {
    await prisma.product.upsert({
      where: { slug: it.slug },
      update: it,
      create: it,
    });
  }

  return NextResponse.json({ ok: true, count: items.length });
}
