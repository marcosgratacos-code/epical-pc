"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../context/cart-context";
import { PRODUCTS, type Product } from "../lib/products";
import { getStripe } from "../lib/get-stripe";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const eur = (n: number) => new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(n);

export default function CartDrawerGlobal() {
  const { cart, setCart, open, closeCart, hydrated } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

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

  const handleCheckout = async () => {
    // 🔐 VERIFICAR SI HAY SESIÓN ANTES DE PROCEDER AL PAGO
    if (!session) {
      // Mostrar alerta y redirigir a login
      const shouldLogin = confirm(
        "🔐 Inicia sesión para comprar\n\n" +
        "Necesitas una cuenta para realizar compras y gestionar tus pedidos.\n\n" +
        "¿Quieres iniciar sesión ahora?"
      );
      
      if (shouldLogin) {
        // Guardar el carrito antes de ir a login
        localStorage.setItem("cart", JSON.stringify(cart));
        // Redirigir a login y volver al carrito después
        router.push("/auth/signin?callbackUrl=" + encodeURIComponent(window.location.pathname));
        closeCart();
      }
      return;
    }

    // ✅ Usuario autenticado, proceder con el pago
    setIsProcessingPayment(true);
    
    try {
      // Llamar a la API para crear sesión de Stripe
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cart,
        }),
      });

      const data = await response.json();

      // Si el sistema de pagos no está configurado (error 503)
      if (response.status === 503) {
        alert(
          "⚠️ Sistema de pagos en configuración\n\n" +
          "El sistema de pagos con Stripe aún no está configurado.\n\n" +
          "Si eres el administrador, consulta el archivo CONFIGURAR_STRIPE.md para activar los pagos.\n\n" +
          "Por ahora puedes:\n" +
          "✓ Explorar productos\n" +
          "✓ Añadir al carrito\n" +
          "✓ Ver precios y especificaciones\n\n" +
          "Para consultas: epicalpc@gmail.com"
        );
        setIsProcessingPayment(false);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Error al procesar el pago");
      }

      const { url } = data;
      
      // Redirigir a Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert(
        error instanceof Error 
          ? error.message 
          : "Error al procesar el pago. Por favor, inténtalo de nuevo."
      );
      setIsProcessingPayment(false);
    }
  };

  // Productos relacionados/sugeridos que NO están en el carrito
  const suggestedProducts = useMemo(() => {
    const cartIds = Object.keys(cart);
    return PRODUCTS.filter(p => !cartIds.includes(p.id) && p.inStock).slice(0, 3);
  }, [cart]);

  if (!open || !hydrated) return null;

  return (
    <aside
      className="fixed inset-0 z-50 flex animate-fade-in"
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
      <div className="w-full bg-black/60 backdrop-blur-sm" onClick={closeCart} aria-hidden />
      <div ref={panelRef} tabIndex={-1} className="ml-auto h-full w-full max-w-md bg-black border-l border-white/10 p-6 overflow-y-auto outline-none animate-slide-in-right">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Tu carrito</h3>
            {items.length > 0 && (
              <p className="text-sm text-white/60 mt-1">{items.length} {items.length === 1 ? 'producto' : 'productos'}</p>
            )}
          </div>
          <button onClick={closeCart} className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-white/40 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400">Cerrar</button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6">
              <svg className="h-12 w-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="font-semibold text-lg mb-2">Tu carrito está vacío</p>
            <p className="text-sm text-white/60 text-center mb-6 max-w-xs">
              Descubre nuestros PCs gaming personalizados con montaje profesional
            </p>
            <div className="flex flex-col gap-3 w-full">
              <Link href="/#productos" onClick={closeCart} className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 font-semibold text-white text-center hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300">Ver montajes</Link>
              <Link href="/pc-a-medida" onClick={closeCart} className="w-full rounded-xl border border-white/20 px-6 py-3 font-semibold text-center hover:border-white/40 transition-all duration-200">PC a medida</Link>
            </div>

            {/* Sugerencias cuando el carrito está vacío */}
            {suggestedProducts.length > 0 && (
              <div className="mt-8 w-full">
                <h4 className="text-sm font-semibold mb-3 text-white/90">Explora nuestros montajes</h4>
                <div className="space-y-3">
                  {suggestedProducts.map(p => (
                    <Link 
                      key={p.id} 
                      href={`/products/${p.slug}`}
                      onClick={closeCart}
                      className="block rounded-xl border border-white/10 p-3 hover:border-white/20 hover:bg-white/5 transition-all duration-200 group"
                    >
                      <div className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border border-white/10">
                          <Image src={p.image} alt={p.name} fill sizes="64px" className="object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{p.name}</p>
                          <p className="text-xs text-white/60 mt-0.5">{eur(p.price)}</p>
                          <p className="text-xs text-green-400 mt-1">En stock</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <ul className="space-y-3 mb-6">
              {items.map((it, index) => (
                <li 
                  key={it.id} 
                  className="flex gap-3 rounded-xl border border-white/10 p-3 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm hover:border-white/20 transition-all duration-200 group"
                  style={{
                    animation: "fadeInUp 0.3s ease-out forwards",
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <Link href={`/products/${it.slug}`} onClick={closeCart} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 group-hover:border-violet-400/50 transition-colors duration-200">
                    <Image src={it.image} alt={it.name} fill sizes="80px" className="object-contain group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <Link href={`/products/${it.slug}`} onClick={closeCart} className="block hover:text-violet-400 transition-colors">
                          <p className="truncate font-semibold">{it.name}</p>
                        </Link>
                        <p className="text-xs text-white/60 mt-0.5">{eur(it.price)} c/u</p>
                      </div>
                      <button 
                        onClick={() => remove(it.id)} 
                        className="p-1 rounded-md hover:bg-red-500/20 text-red-400 transition-all duration-200"
                        aria-label={`Eliminar ${it.name}`}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => dec(it.id)} className="h-8 w-8 rounded-md border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-200 flex items-center justify-center">−</button>
                        <span className="w-8 text-center font-semibold" aria-live="polite">{it.qty}</span>
                        <button onClick={() => inc(it.id)} className="h-8 w-8 rounded-md border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-200 flex items-center justify-center">+</button>
                      </div>
                      <span className="font-bold">{eur(it.price * it.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Beneficios del pedido */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: "🛡️", text: "3 años garantía" },
                { icon: "🚚", text: envio === 0 ? "Envío gratis" : "Envío 24-48h" },
                { icon: "✅", text: "Montaje Pro" },
              ].map((benefit, i) => (
                <div key={i} className="text-center p-3 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                  <div className="text-2xl mb-1">{benefit.icon}</div>
                  <div className="text-xs text-white/70">{benefit.text}</div>
                </div>
              ))}
            </div>

            {/* Productos sugeridos (cross-sell) */}
            {suggestedProducts.length > 0 && (
              <div className="mb-6 p-4 rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span>💡</span>
                  <span>También te podría interesar</span>
                </h4>
                <div className="space-y-2">
                  {suggestedProducts.slice(0, 2).map(p => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      onClick={closeCart}
                      className="flex gap-2 p-2 rounded-lg hover:bg-white/5 transition-all duration-200 group"
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 rounded overflow-hidden border border-white/10">
                        <Image src={p.image} alt={p.name} fill sizes="48px" className="object-contain group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-xs text-white/60">{eur(p.price)}</p>
                      </div>
                      <svg className="h-4 w-4 text-white/40 group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            )}

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
                <button 
                  onClick={clear} 
                  className="flex-1 rounded-xl border border-white/20 px-4 py-2 font-semibold hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isProcessingPayment}
                >
                  Vaciar
                </button>
                <button 
                  onClick={handleCheckout} 
                  disabled={isProcessingPayment}
                  className="flex-1 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-center font-semibold text-white hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <span>💳</span>
                      <span>Proceder al Pago</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
