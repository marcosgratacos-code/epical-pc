import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { ProductView } from "@/models/ProductView";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  await connectMongo();
  const session = await getServerSession(authOptions);
  try {
    const { slug, sessionId } = await req.json();
    if (!slug || !sessionId) {
      return NextResponse.json({ error: "Missing slug/sessionId" }, { status: 400 });
    }
    await ProductView.create({
      slug,
      sessionId,
      userId: session?.user?.id ?? null,
      viewedAt: new Date(),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
