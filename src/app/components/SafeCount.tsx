'use client';
import { useEffect, useState } from 'react';

export default function SafeCount({ value, fallback = 0 }: { value: number; fallback?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Evita mismatch: suprime la advertencia y no cambia el HTML hasta montar
  return <b suppressHydrationWarning>{mounted ? value : fallback}</b>;
}











