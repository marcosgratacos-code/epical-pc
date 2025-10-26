import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const count = await prisma.product.count();
    return NextResponse.json({ ok: true, productCount: count });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "db error" }, { status: 500 });
  }
}
