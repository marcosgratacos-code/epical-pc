"use client";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { validateCoupon } from "../lib/coupons";
import { PRODUCTS } from "../lib/products";

export type CartState = Record<string, number>;

type CartContextValue = {
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
  add: (id: string, qty?: number) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  clearCart: () => void; // Alias para mayor claridad

  open: boolean;
  openCart: () => void;
  closeCart: () => void;

  hydrated: boolean; // para evitar parpadeos SSR/CSR
  
  // Sistema de cupones
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discount: number;
  couponMessage: string;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({});
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
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
  const inc = (id: string) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  const dec = (id: string) =>
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return prev;
      next[id] = Math.max(0, next[id] - 1);
      if (next[id] === 0) delete next[id];
      return next;
    });
  const setQty = (id: string, qty: number) =>
    setCart((prev) => {
      const next = { ...prev };
      const newQty = Math.max(1, Math.floor(qty || 1));
      if (newQty === 0) {
        delete next[id];
      } else {
        next[id] = newQty;
      }
      return next;
    });
  const remove = (id: string) =>
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  const clear = () => {
    setCart({});
    setCouponCode("");
    setDiscount(0);
    setCouponMessage("");
  };

  // Funciones de cupones
  const applyCoupon = (code: string): boolean => {
    if (!code.trim()) {
      setCouponMessage("Por favor, ingresa un código de cupón");
      return false;
    }

    // Calcular total del carrito
    const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
      const product = PRODUCTS.find(p => p.id === id);
      return total + (product?.price || 0) * qty;
    }, 0);

    // Obtener IDs de productos en el carrito
    const productIds = Object.keys(cart);

    // Validar cupón
    const validation = validateCoupon(code, cartTotal, productIds);

    if (validation.valid && validation.discount) {
      setCouponCode(code);
      setDiscount(validation.discount);
      setCouponMessage(validation.message);
      return true;
    } else {
      setCouponCode("");
      setDiscount(0);
      setCouponMessage(validation.message);
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setCouponMessage("");
  };

  const value = useMemo(
    () => ({
      cart,
      setCart,
      add,
      inc,
      dec,
      setQty,
      remove,
      clear,
      clearCart: clear, // Alias para mayor claridad
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      hydrated,
      // Cupones
      couponCode,
      applyCoupon,
      removeCoupon,
      discount,
      couponMessage,
    }),
    [cart, open, hydrated, couponCode, discount, couponMessage]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
