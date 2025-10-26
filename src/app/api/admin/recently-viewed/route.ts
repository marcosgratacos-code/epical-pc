import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongo } from "@/lib/mongodb";
import { RecentlyViewed } from "@/models/RecentlyViewed";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No auth" }, { status: 401 });
  if ((session.user as any).role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectMongo();
  const url = new URL(req.url);

  const userId = url.searchParams.get("userId") || undefined;
  const q = url.searchParams.get("q") || "";
  const from = url.searchParams.get("from") ? new Date(url.searchParams.get("from")!) : undefined;
  const to = url.searchParams.get("to") ? new Date(url.searchParams.get("to")!) : undefined;

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = Math.min(parseInt(url.searchParams.get("pageSize") || "20", 10), 100);
  const skip = (page - 1) * pageSize;

  const match: any = {};
  if (userId) match.userId = userId;

  const productMatch: any = {};
  if (q) productMatch.$or = [
    { "products.name": { $regex: q, $options: "i" } },
    { "products.slug": { $regex: q, $options: "i" } },
  ];
  if (from || to) {
    productMatch["products.viewedAt"] = {};
    if (from) productMatch["products.viewedAt"].$gte = from;
    if (to) productMatch["products.viewedAt"].$lte = to;
  }

  const pipeline = [
    { $match: match },
    { $unwind: "$products" },
    ...(q || from || to ? [{ $match: productMatch }] : []),
    { $sort: { "products.viewedAt": -1 } },
    {
      $facet: {
        data: [
          { $skip: skip },
          { $limit: pageSize },
          {
            $project: {
              _id: 0,
              userId: 1,
              id: "$products.id",
              slug: "$products.slug",
              name: "$products.name",
              price: "$products.price",
              image: "$products.image",
              viewedAt: "$products.viewedAt",
            },
          },
        ],
        total: [{ $count: "count" }],
      },
    },
    {
      $project: {
        data: 1,
        total: { $ifNull: [{ $arrayElemAt: ["$total.count", 0] }, 0] },
      },
    },
  ];

  const [res] = (await RecentlyViewed.aggregate(pipeline)) as any[];
  return NextResponse.json({
    data: res?.data || [],
    total: res?.total || 0,
    page,
    pageSize,
  });
}
