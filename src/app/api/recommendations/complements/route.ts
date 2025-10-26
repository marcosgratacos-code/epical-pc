import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { ProductView } from "@/models/ProductView";

export async function GET(req: Request) {
  await connectMongo();

  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  const days = parseInt(url.searchParams.get("days") || "90", 10);
  const lambda = parseFloat(url.searchParams.get("lambda") || "0.03");

  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  try {
    // Traer el producto base desde PRODUCTS constante
    const { PRODUCTS } = await import("@/app/lib/products");
    const base = PRODUCTS.find(p => p.slug === slug);
    if (!base) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const since = new Date();
    since.setDate(since.getDate() - days);

    // === CO-OCURRENCIA REAL (mismo pipeline que recomendaciones por sesión) ===
    const sameSession = await ProductView.aggregate([
      { $match: { viewedAt: { $gte: since }, slug } },
      { $group: { _id: "$sessionId" } },
      {
        $lookup: {
          from: "productviews",
          let: { sid: "$_id" },
          pipeline: [
            { $match: { viewedAt: { $gte: since } } },
            { $match: { $expr: { $eq: ["$sessionId", "$$sid"] } } },
            { $project: { slug: 1, viewedAt: 1, _id: 0 } },
          ],
          as: "views",
        },
      },
      { $unwind: "$views" },
      { $match: { "views.slug": { $ne: slug } } },
      {
        $addFields: {
          weight: {
            $exp: {
              $multiply: [
                -lambda,
                {
                  $divide: [
                    { $subtract: [new Date(), "$views.viewedAt"] },
                    1000 * 60 * 60 * 24,
                  ],
                },
              ],
            },
          },
        },
      },
      { $group: { _id: "$views.slug", score: { $sum: "$weight" } } },
    ]);

    // === FILTRO CATEGÓRICO: periféricos o compatibles ===
    const baseCategories = base.categories || [];
    
    // Productos "compatibles" o "periféricos" - filtro desde la constante PRODUCTS
    const allProducts = PRODUCTS.filter(p => 
      p.slug !== slug && 
      p.inStock &&
      (
        // Es periférico/accesorio
        p.categories?.some(cat => 
          ["Periférico", "Accesorio", "Upgrade", "Complemento", "Monitor", "Teclado", "Ratón"].includes(cat)
        ) ||
        // Tiene categorías en común
        p.categories?.some(cat => baseCategories.includes(cat))
      )
    );

    // === PONDERACIÓN FINAL ===
    const map = new Map<string, number>();
    
    // Co-ocurrencias reales
    for (const r of sameSession) {
      map.set(r._id, (map.get(r._id) || 0) + r.score * 1.0);
    }

    // Bonus por categoría +0.5
    for (const r of allProducts) {
      const overlap = r.categories?.some((c: string) => baseCategories.includes(c));
      if (overlap) {
        map.set(r.slug, (map.get(r.slug) || 0) + 0.5);
      }
    }

    // === ORDEN Y RESULTADO ===
    const ranked = [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const slugs = ranked.map(([s]) => s);
    
    // Obtener productos desde la constante
    const products = slugs
      .map(s => PRODUCTS.find(p => p.slug === s))
      .filter(Boolean)
      .map(p => ({
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.image,
        categories: p.categories || [],
        stock: p.inStock,
      }));

    const pmap = new Map(products.map((p: any) => [p.slug, p]));
    const data = ranked
      .map(([s, score]) => ({ ...pmap.get(s), score }))
      .filter(Boolean);

    return NextResponse.json({ base: slug, results: data });
  } catch (error) {
    console.error("Error in complements recommendations:", error);
    return NextResponse.json({ results: [] });
  }
}
