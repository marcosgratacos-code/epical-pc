import { NextRequest } from "next/server";

/**
 * Verifica que la petición proviene del mismo origen
 * Previene ataques CSRF
 */
export function assertSameOrigin(req: NextRequest): boolean {
  const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "";
  
  if (!allowedOrigin) {
    // En desarrollo, permitir todas las peticiones
    if (process.env.NODE_ENV === "development") {
      return true;
    }
  }

  const origin = req.headers.get("origin") || "";
  const referer = req.headers.get("referer") || "";
  
  // Verificar origin
  if (origin && !origin.startsWith(allowedOrigin)) {
    console.warn(`CSRF: Invalid origin ${origin}, expected ${allowedOrigin}`);
    return false;
  }

  // Verificar referer como fallback
  if (!origin && referer && !referer.startsWith(allowedOrigin)) {
    console.warn(`CSRF: Invalid referer ${referer}, expected ${allowedOrigin}`);
    return false;
  }

  return true;
}

/**
 * Normaliza y obtiene el IP del cliente
 */
export function getClientIp(req: NextRequest): string {
  // Intentar obtener IP de headers proxy
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map(ip => ip.trim());
    return ips[0];
  }

  // Intentar otros headers comunes
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;

  // En Next.js, usar req.ip
  return req.ip || "unknown";
}

/**
 * Genera un token aleatorio seguro
 */
export function generateSecureToken(length: number = 32): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  
  // Usar crypto.getRandomValues si está disponible
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      token += chars[array[i] % chars.length];
    }
  } else {
    // Fallback (menos seguro)
    for (let i = 0; i < length; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  
  return token;
}

/**
 * Sanitiza una string para prevenir XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Valida que una URL es segura (mismo dominio o permitido)
 */
export function isSecureUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // Permitir URLs del mismo dominio
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "";
    if (baseUrl) {
      try {
        const baseUrlObj = new URL(baseUrl);
        if (urlObj.origin === baseUrlObj.origin) {
          return true;
        }
      } catch {}
    }

    // Lista blanca de dominios seguros
    const allowedDomains = [
      "https://titan-pc.vercel.app",
      "https://stripe.com",
      "https://uploads.stripe.com",
      "https://cdn.stripe.com",
    ];

    return allowedDomains.some(domain => url.startsWith(domain));
  } catch {
    return false;
  }
}

