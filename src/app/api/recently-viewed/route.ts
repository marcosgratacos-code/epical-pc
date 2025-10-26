import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { RecentlyViewed } from "@/models/RecentlyViewed";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) return NextResponse.json([], { status: 200 });

  try {
    const conn = await connectMongo();
    if (!conn) return NextResponse.json([], { status: 200 });
    
    const record = await RecentlyViewed.findOne({ userId });
    return NextResponse.json(record?.products || []);
  } catch (error) {
    console.error("Error fetching recently viewed:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const conn = await connectMongo();
    if (!conn) {
      return NextResponse.json({ ok: true, message: "MongoDB no configurado" });
    }

    const { userId, product } = await req.json();
    if (!userId || !product?.slug) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    let record = await RecentlyViewed.findOne({ userId });

    if (!record) {
      record = new RecentlyViewed({ userId, products: [product] });
    } else {
      // evita duplicados, ordena por fecha
      const filtered = record.products.filter((p: any) => p.slug !== product.slug);
      record.products = [{ ...product, viewedAt: new Date() }, ...filtered].slice(0, 20);
    }

    await record.save();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
