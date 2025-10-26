import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { ProductView } from "@/models/ProductView";

export async function POST(req: Request) {
  await connectMongo();
  const { slugs = [], days = 90, lambda = 0.03, limit = 12 } = await req.json();

  if (!Array.isArray(slugs) || slugs.length === 0) {
    return NextResponse.json({ base: [], results: [] });
  }

  const since = new Date();
  since.setDate(since.getDate() - Number(days));

  try {
    // ===== Señal 1: co-ocurrencia en la MISMA SESIÓN =====
    const sameSession = await ProductView.aggregate([
      { $match: { viewedAt: { $gte: since }, slug: { $in: slugs } } },
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
          as: "views"
        }
      },
      { $unwind: "$views" },
      { $match: { "views.slug": { $nin: slugs } } },
      {
        $addFields: {
          weight: {
            $exp: {
              $multiply: [
                -Number(lambda),
                {
                  $divide: [
                    { $subtract: [new Date(), "$views.viewedAt"] },
                    1000 * 60 * 60 * 24
                  ]
                }
              ]
            }
          }
        }
      },
      { $group: { _id: "$views.slug", score: { $sum: "$weight" } } },
    ]);

    // ===== Señal 2: co-ocurrencia por el MISMO USUARIO =====
    const sameUser = await ProductView.aggregate([
      { $match: { viewedAt: { $gte: since }, slug: { $in: slugs } } },
      { $group: { _id: "$userId" } },
      { $match: { _id: { $ne: null } } },
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
      { $match: { "views.slug": { $nin: slugs } } },
      {
        $addFields: {
          weight: {
            $exp: {
              $multiply: [
                -Number(lambda),
                {
                  $divide: [
                    { $subtract: [new Date(), "$views.viewedAt"] },
                    1000 * 60 * 60 * 24
                  ]
                }
              ]
            }
          }
        }
      },
      { $group: { _id: "$views.slug", score: { $sum: "$weight" } } },
    ]);

    // ===== Fusión de señales =====
    const map = new Map<string, number>();
    for (const r of sameSession) map.set(r._id, (map.get(r._id) || 0) + r.score * 1.0);
    for (const r of sameUser) map.set(r._id, (map.get(r._id) || 0) + r.score * 0.5);

    const ranked = [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, Number(limit));

    const recSlugs = ranked.map(([s]) => s);
    if (recSlugs.length === 0) return NextResponse.json({ base: slugs, results: [] });

    // Traer datos de catálogo desde PRODUCTS constante
    const { PRODUCTS } = await import("@/app/lib/products");
    const products = PRODUCTS.filter(p => recSlugs.includes(p.slug) && p.inStock)
      .map(p => ({
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.image,
        stock: p.inStock,
        categories: p.categories || [],
      }));

    const pmap = new Map(products.map((p: any) => [p.slug, p]));
    const results = ranked
      .map(([s, score]) => ({ ...pmap.get(s), score }))
      .filter(Boolean);

    return NextResponse.json({ base: slugs, windowDays: days, lambda, results });
  } catch (error) {
    console.error("Error in cart recommendations:", error);
    return NextResponse.json({ results: [] });
  }
}
