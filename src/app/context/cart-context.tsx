"use client";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type CartState = Record<string, number>;

type CartContextValue = {
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
  add: (id: string, qty?: number) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;

  open: boolean;
  openCart: () => void;
  closeCart: () => void;

  hydrated: boolean; // para evitar parpadeos SSR/CSR
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({});
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const loaded = useRef(false);

  // Cargar desde localStorage (una vez, en cliente)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("epical-cart");
      if (raw) setCart(JSON.parse(raw));
    } catch {}
    setHydrated(true);
    loaded.current = true;
  }, []);

  // Guardar en localStorage cuando cambie (después de cargar)
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem("epical-cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Sincronizar entre pestañas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "epical-cart" && e.newValue) {
        try {
          setCart(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = (id: string, qty = 1) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + qty }));
  const dec = (id: string) =>
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return prev;
      next[id] = Math.max(0, next[id] - 1);
      if (next[id] === 0) delete next[id];
      return next;
    });
  const remove = (id: string) =>
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  const clear = () => setCart({});

  const value = useMemo(
    () => ({
      cart,
      setCart,
      add,
      dec,
      remove,
      clear,
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      hydrated,
    }),
    [cart, open, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
