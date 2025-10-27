import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATH = /^\/admin(\/|$)/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (ADMIN_PATH.test(pathname)) {
    // Verificar token Bearer
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "");
    const okToken = token && token === process.env.ADMIN_TOKEN;

    // Allowlist IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
           || req.ip
           || "0.0.0.0";
    const allowlist = (process.env.ADMIN_IP_ALLOWLIST || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
    const okIp = allowlist.length === 0 || allowlist.includes(ip);

    if (!okToken || !okIp) {
      // También verificar cookie de sesión NextAuth como fallback
      const sessionCookie = req.cookies.get("next-auth.session-token") || 
                           req.cookies.get("__Secure-next-auth.session-token");
      
      if (!sessionCookie) {
        return new NextResponse("Unauthorized - Admin access required", { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
