import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { buildUpgradeList } from "@/lib/compatEngine";
import { ProductView } from "@/models/ProductView";
import { CatalogProduct } from "@/types/catalog";

export async function GET(req: Request) {
  await connectMongo();
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  try {
    // Traer productos desde la constante PRODUCTS
    const { PRODUCTS } = await import("@/app/lib/products");
    const base = PRODUCTS.find(p => p.slug === slug);
    if (!base) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    // Convertir base a CatalogProduct
    const baseProduct: CatalogProduct = {
      _id: base.id,
      slug: base.slug,
      name: base.name,
      price: base.price,
      image: base.image,
      stock: base.inStock,
      categories: base.categories || [],
      specs: base.specs || {},
    };

    // Obtener todos los productos del catálogo
    const catalog: CatalogProduct[] = PRODUCTS.map(p => ({
      _id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      image: p.image,
      stock: p.inStock,
      categories: p.categories || [],
      specs: p.specs || {},
    }));

    // Opcional: añade co-ocurrencia como bonus de score (últimos 60 días)
    const since = new Date();
    since.setDate(since.getDate() - 60);
    
    const coAgg = await ProductView.aggregate([
      { $match: { viewedAt: { $gte: since }, slug } },
      { $group: { _id: "$sessionId" } },
      {
        $lookup: {
          from: "productviews",
          let: { sid: "$_id" },
          pipeline: [
            { $match: { viewedAt: { $gte: since } } },
            { $match: { $expr: { $eq: ["$sessionId", "$$sid"] } } },
            { $project: { slug: 1, _id: 0 } },
          ],
          as: "views"
        }
      },
      { $unwind: "$views" },
      { $match: { "views.slug": { $ne: slug } } },
      { $group: { _id: "$views.slug", c: { $sum: 1 } } },
    ]).catch(() => []);

    const coMap = new Map<string, number>(coAgg.map((x: any) => [x._id, x.c]));
    const { flat, byBucket } = buildUpgradeList(baseProduct, catalog, coMap);

    return NextResponse.json({ base: slug, results: flat, buckets: byBucket });
  } catch (error) {
    console.error("Error in compat recommendations:", error);
    return NextResponse.json({ results: [], buckets: {} });
  }
}
