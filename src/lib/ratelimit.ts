import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Redis client (solo si está configurado)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Rate limiters configurables
export const rl_anon_10req_1m = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
    })
  : null;

export const rl_anon_100req_1h = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "1 h"),
      analytics: true,
    })
  : null;

export const rl_strict_5req_1m = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      analytics: true,
    })
  : null;

// Helper para obtener IP del request
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0]?.trim() : null;
  return ip || request.headers.get("x-real-ip") || "unknown";
}

// Helper para aplicar rate limit
export async function applyRateLimit(
  key: string,
  limiter: Ratelimit | null
): Promise<{ success: boolean; remaining: number; reset: number }> {
  if (!limiter) {
    // Sin Redis configurado, permitir todas las peticiones
    return { success: true, remaining: 999, reset: Date.now() + 60000 };
  }

  const result = await limiter.limit(key);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}

