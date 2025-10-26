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
      slug: "titan-starter",
      sku: "titan1",
      name: "TITAN STARTER",
      shortName: "titan1",
      price: 90000,
      inStock: true,
      tag: "OFERTA" as const,
      imageUrl: "https://picsum.photos/seed/starter/400/300",
    },
    {
      slug: "titan-advanced",
      sku: "titan2",
      name: "TITAN ADVANCED",
      shortName: "titan2",
      price: 230000,
      inStock: true,
      tag: "NUEVO" as const,
      imageUrl: "https://picsum.photos/seed/advanced/400/300",
    },
    {
      slug: "titan-ultra",
      sku: "titan3",
      name: "TITAN ULTRA",
      shortName: "titan3",
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
