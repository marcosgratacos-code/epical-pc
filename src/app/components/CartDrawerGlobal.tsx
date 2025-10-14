"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../context/cart-context";
import { PRODUCTS, type Product } from "../lib/products";

const eur = (n: number) => new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(n);

export default function CartDrawerGlobal() {
  const { cart, setCart, open, closeCart, hydrated } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      panelRef.current?.focus();
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const items = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const p = PRODUCTS.find((x: Product) => x.id === id);
          return p ? { ...p, qty } : null;
        })
        .filter(Boolean) as (Product & { qty: number })[],
    [cart]
  );

  const subtotal = useMemo(() => items.reduce((a, it) => a + it.price * it.qty, 0), [items]);
  const envio = subtotal >= 1000 ? 0 : 14.9;

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState<{ code: string; discount: number } | null>(null);
  const discountPct = couponApplied?.discount ?? 0;
  const discount = subtotal * discountPct;
  const subtotalConDescuento = Math.max(0, subtotal - discount);
  const iva = subtotalConDescuento * 0.21;
  const total = subtotalConDescuento + iva + envio;

  const inc = (id: string) => setCart((p: Record<string, number>) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  const dec = (id: string) =>
    setCart((p: Record<string, number>) => {
      const next = { ...p };
      if (!next[id]) return p;
      next[id] = Math.max(0, next[id] - 1);
      if (next[id] === 0) delete next[id];
      return next;
    });
  const remove = (id: string) =>
    setCart((p: Record<string, number>) => {
      const next = { ...p };
      delete next[id];
      return next;
    });
  const clear = () => setCart({});

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (code === "EQW") setCouponApplied({ code, discount: 0.05 });
    else if (code === "EPICAL10") setCouponApplied({ code, discount: 0.1 });
    else { setCouponApplied(null); alert("Cupón no válido."); }
  };

  if (!open || !hydrated) return null;

  return (
    <aside
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compra"
      onKeyDown={(e) => {
        if (e.key === "Escape") closeCart();
        if (e.key === "Tab" && panelRef.current) {
          const f = panelRef.current.querySelectorAll<HTMLElement>(
            'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
          );
          if (f.length) {
            const first = f[0], last = f[f.length - 1];
            const a = document.activeElement;
            if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
          }
        }
      }}
    >
      <div className="w-full bg-black/60" onClick={closeCart} aria-hidden />
      <div ref={panelRef} tabIndex={-1} className="ml-auto h-full w-full max-w-md bg-black border-l border-white/10 p-4 overflow-y-auto outline-none">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tu carrito</h3>
          <button onClick={closeCart} className="rounded-lg border border-white/20 px-3 py-1 text-sm hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400">Cerrar</button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-white/10 p-4 text-white/80">
            <p className="font-semibold">Tu carrito está vacío.</p>
            <p className="mt-1 text-sm">¿Seguimos viendo opciones?</p>
            <div className="mt-3 flex gap-2">
              <Link href="/#productos" onClick={closeCart} className="rounded-xl bg-white px-4 py-2 font-semibold text-black hover:bg-white/90">Ver montajes</Link>
              <Link href="/pc-a-medida" onClick={closeCart} className="rounded-xl border border-white/20 px-4 py-2 font-semibold hover:border-white/40">PC a medida</Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="flex gap-3 rounded-xl border border-white/10 p-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-white/10">
                    <Image src={it.image} alt={it.name} fill sizes="64px" className="object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{it.name}</p>
                        <p className="text-xs text-white/60">{eur(it.price)}</p>
                      </div>
                      <button onClick={() => remove(it.id)} className="rounded-md border border-white/20 px-2 py-1 text-xs hover:border-white/40">Quitar</button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => dec(it.id)} className="rounded-md border border-white/20 px-2 py-1 hover:border-white/40">−</button>
                      <span className="w-6 text-center" aria-live="polite">{it.qty}</span>
                      <button onClick={() => inc(it.id)} className="rounded-md border border-white/20 px-2 py-1 hover:border-white/40">+</button>
                      <span className="ml-auto text-sm text-white/80">{eur(it.price * it.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <form onSubmit={applyCoupon} className="mt-4 rounded-xl border border-white/10 p-3">
              <label className="block text-xs text-white/60">Cupón de descuento</label>
              <div className="mt-1 flex gap-2">
                <input value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder="EQW o EPICAL10 (demo)" className="flex-1 rounded-xl border border-white/10 bg-black px-3 py-2 outline-none focus:border-violet-400" />
                <button className="rounded-xl bg-white px-3 py-2 font-semibold text-black hover:bg-white/90">Aplicar</button>
              </div>
              {couponApplied && <p className="mt-2 text-xs text-green-400">Cupón <b>{couponApplied.code}</b> aplicado (−{Math.round(couponApplied.discount*100)}%).</p>}
            </form>

            <div className="mt-4 rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between text-sm"><span className="text-white/70">Subtotal (sin IVA)</span><span className="font-semibold">{eur(subtotal)}</span></div>
              {discount>0 && <div className="mt-1 flex items-center justify-between text-sm"><span className="text-white/70">Descuento</span><span className="font-semibold text-green-400">−{eur(discount)}</span></div>}
              <div className="mt-1 flex items-center justify-between text-sm"><span className="text-white/70">IVA (21%)</span><span className="font-semibold">{eur(iva)}</span></div>
              <div className="mt-1 flex items-center justify-between text-sm"><span className="text-white/70">Envío {envio===0?"(Gratis)":""}</span><span className="font-semibold">{eur(envio)}</span></div>
              <div className="mt-3 flex items-center justify-between text-base"><span className="font-semibold">Total (IVA incl.)</span><span className="font-bold">{eur(total)}</span></div>
              <div className="mt-2 text-xs text-white/60">{envio===0 ? "🎉 Envío gratis a partir de 1000€" : `Sube tu pedido a ${eur(1000)} para envío gratis. Te faltan ${eur(Math.max(0, 1000 - subtotal))}.`}</div>
              <div className="mt-4 flex gap-2">
                <button onClick={clear} className="flex-1 rounded-xl border border-white/20 px-4 py-2 font-semibold hover:border-white/40">Vaciar</button>
                <a href="#" onClick={(e)=>{e.preventDefault(); alert('Demo: checkout');}} className="flex-1 rounded-xl bg-white px-4 py-2 text-center font-semibold text-black hover:bg-white/90">Pagar</a>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
