import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Protección de rutas admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // La verificación real de sesión se hace en el server component/page
    // Este middleware solo redirige a login si no hay cookie de sesión
    const sessionCookie = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
