"use client";
import { useEffect, useRef, useState } from "react";

const KEY = "epical_view_session_v1";
const TTL_MIN = 30; // rotación de sesión por inactividad

export function useViewSession() {
  const [sessionId, setSessionId] = useState<string>("");
  const lastTouch = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const stored = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    let parsed: { id: string; ts: number } | null = null;
    if (stored) {
      try { parsed = JSON.parse(stored); } catch {}
    }
    const needNew =
      !parsed ||
      now - parsed.ts > TTL_MIN * 60_000; // expirado por inactividad

    const id = needNew ? crypto.randomUUID() : parsed!.id;
    setSessionId(id);
    localStorage.setItem(KEY, JSON.stringify({ id, ts: now }));

    const onActivity = () => {
      const t = Date.now();
      // evita escribir en cada frame: 5s mínimo
      if (t - lastTouch.current > 5000) {
        lastTouch.current = t;
        localStorage.setItem(KEY, JSON.stringify({ id, ts: t }));
      }
    };
    window.addEventListener("visibilitychange", onActivity);
    window.addEventListener("pointerdown", onActivity);
    window.addEventListener("keydown", onActivity);
    return () => {
      window.removeEventListener("visibilitychange", onActivity);
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("keydown", onActivity);
    };
  }, []);

  return sessionId;
}
