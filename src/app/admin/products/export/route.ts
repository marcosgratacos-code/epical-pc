import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  const tag = searchParams.get("tag") ?? "";
  const stock = searchParams.get("stock") ?? "";

  const sort = (searchParams.get("sort") ?? "createdAt") as "createdAt" | "price" | "name";
  const dir = (searchParams.get("dir") ?? "desc") as "asc" | "desc";

  const where: any = { AND: [] as any[] };
  if (q) {
    where.AND.push({
      OR: [
        { name: { contains: q } },
        { sku: { contains: q } },
        { slug: { contains: q } },
      ],
    });
  }
  if (tag) where.AND.push({ tag });
  if (stock === "in") where.AND.push({ inStock: true });
  if (stock === "out") where.AND.push({ inStock: false });
  if (!where.AND.length) delete where.AND;

  const orderBy = { [sort]: dir } as any;

  const rows = await prisma.product.findMany({
    where,
    orderBy,
  });

  const header = ["name", "slug", "sku", "shortName", "priceEUR", "inStock", "tag", "imageUrl", "createdAt", "updatedAt"];
  const csv = [
    header.join(","),
    ...rows.map((r) =>
      [
        escapeCSV(r.name),
        escapeCSV(r.slug),
        escapeCSV(r.sku),
        escapeCSV(r.shortName ?? ""),
        (r.price / 100).toFixed(2),
        r.inStock ? "1" : "0",
        r.tag ?? "",
        escapeCSV(r.imageUrl ?? ""),
        r.createdAt.toISOString(),
        r.updatedAt.toISOString(),
      ].join(",")
    ),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="productos.csv"`,
    },
  });
}

function escapeCSV(s: string) {
  if (s.includes('"') || s.includes(",") || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
