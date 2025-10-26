import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { ProductView } from "@/models/ProductView";

export async function GET(req: Request) {
  await connectMongo();
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  const days = parseInt(url.searchParams.get("days") || "90", 10);
  const lambda = parseFloat(url.searchParams.get("lambda") || "0.03"); // decaimiento

  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const since = new Date();
  since.setDate(since.getDate() - days);

  try {
    // ===== Señal 1: co-ocurrencia en la MISMA SESIÓN =====
    const sameSession = await ProductView.aggregate([
      { $match: { viewedAt: { $gte: since } } },
      { $match: { slug } },
      { $group: { _id: "$sessionId" } }, // sesiones que vieron el base
      { 
        $lookup: {
          from: "productviews",
          let: { sid: "$_id" },
          pipeline: [
            { $match: { viewedAt: { $gte: since } } },
            { $match: { $expr: { $eq: ["$sessionId", "$$sid"] } } },
            { $project: { slug: 1, viewedAt: 1, _id: 0 } },
          ],
          as: "views"
        }
      },
      { $unwind: "$views" },
      { $match: { "views.slug": { $ne: slug } } },
      // peso por recencia
      {
        $addFields: {
          weight: {
            $exp: {
              $multiply: [
                -lambda,
                { $divide: [
                  { $subtract: [new Date(), "$views.viewedAt"] },
                  1000 * 60 * 60 * 24 // ms→días
                ] }
              ]
            }
          }
        }
      },
      { $group: { _id: "$views.slug", score: { $sum: "$weight" } } },
    ]);

    // ===== Señal 2: co-ocurrencia por MISMO USUARIO (fallback) =====
    const sameUser = await ProductView.aggregate([
      { $match: { viewedAt: { $gte: since } } },
      { $match: { slug } },
      { $group: { _id: "$userId" } },
      { $match: { _id: { $ne: null } } }, // solo usuarios logueados
      { 
        $lookup: {
          from: "productviews",
          let: { uid: "$_id" },
          pipeline: [
            { $match: { viewedAt: { $gte: since } } },
            { $match: { $expr: { $eq: ["$userId", "$$uid"] } } },
            { $project: { slug: 1, viewedAt: 1, _id: 0 } },
          ],
          as: "views"
        }
      },
      { $unwind: "$views" },
      { $match: { "views.slug": { $ne: slug } } },
      {
        $addFields: {
          weight: {
            $exp: {
              $multiply: [
                -lambda,
                { $divide: [
                  { $subtract: [new Date(), "$views.viewedAt"] },
                  1000 * 60 * 60 * 24
                ] }
              ]
            }
          }
        }
      },
      { $group: { _id: "$views.slug", score: { $sum: "$weight" } } },
    ]);

    // ===== Fusión de señales =====
    const map = new Map<string, number>();
    for (const r of sameSession) map.set(r._id, (map.get(r._id) || 0) + r.score * 1.0); // peso 1.0
    for (const r of sameUser) map.set(r._id, (map.get(r._id) || 0) + r.score * 0.5);      // peso 0.5

    const ranked = [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);

    const slugs = ranked.map(([s]) => s);
    
    // Traer datos de catálogo desde PRODUCTS constante
    const { PRODUCTS } = await import("@/app/lib/products");
    const products = slugs.length
      ? PRODUCTS.filter(p => slugs.includes(p.slug))
          .map(p => ({
            slug: p.slug,
            name: p.name,
            price: p.price,
            image: p.image,
            stock: p.inStock,
            categories: p.categories || [],
          }))
      : [];

    // Ordenar como en co (por score)
    const productMap = new Map(products.map((p: any) => [p.slug, p]));
    const data = ranked
      .map(([s, score]) => ({ ...productMap.get(s), score }))
      .filter(Boolean);

    return NextResponse.json({ base: slug, windowDays: days, lambda, results: data });
  } catch (error) {
    console.error("Error in product recommendations:", error);
    return NextResponse.json({ results: [] });
  }
}
