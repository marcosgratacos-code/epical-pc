"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cart-context";
import { PRODUCTS } from "../lib/products";
import { ShoppingBag, ArrowLeft, Minus, Plus, Sparkles, Truck, Shield, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import CartRecommendationsClient from "../components/CartRecommendations.client";

const fmt = (n: number) => `${n.toFixed(2)} €`;

export default function CestaPage() {
  const { cart, inc, dec, setQty, remove, clear, hydrated } = useCart();
  const [coupon, setCoupon] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Calcular items
  const items = Object.entries(cart).map(([id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return null;
    return {
      id,
      name: product.name,
      price: product.price,
      image: product.image,
      specs: product.specs,
      qty,
    };
  }).filter(Boolean);

  // Calcular totales
  const subtotal = items.reduce((sum, item) => sum + (item?.price || 0) * (item?.qty || 0), 0);
  
  // Calcular descuento del cupón
  const descuento = useMemo(() => {
    if (coupon.trim().toUpperCase() === "EQW") return subtotal * 0.05 * -1;
    return 0;
  }, [coupon, subtotal]);

  // Envío gratis si total + descuento > 1500
  const envio = subtotal + descuento > 1500 ? 0 : 12.9;
  const iva = (subtotal + descuento + Math.max(envio, 0)) * 0.21;
  const totalFinal = Math.max(0, subtotal + descuento + Math.max(envio, 0) + iva);
  const count = items.reduce((sum, item) => sum + (item?.qty || 0), 0);

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      remove(id);
      setRemovingId(null);
    }, 300);
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 border-4 border-violet-400/30 border-t-violet-400 rounded-full animate-spin"></div>
          <p className="text-white/60">Cargando tu cesta...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Header mejorado */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-white/70 mb-4">
            <Link 
              href="/productos" 
              className="hover:text-white transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Volver a productos
            </Link>
            <span>•</span>
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              {count} artículo{count !== 1 && "s"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Tu Cesta
              </h1>
              <p className="text-white/60 text-sm mt-1">Revisa y finaliza tu pedido</p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-12 text-center max-w-2xl mx-auto">
            <div className="mx-auto mb-6 grid place-items-center w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 backdrop-blur">
              <ShoppingBag className="h-12 w-12 text-white/40" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Tu cesta está vacía</h2>
            <p className="text-white/70 mb-8">Descubre nuestros PCs gaming personalizados</p>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 px-6 py-3 font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              Explorar PCs Gaming
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Lista de productos */}
            <section className="space-y-4">
              {items.map((item, index) => (
                item && (
                  <div
                    key={item.id}
                    className={`rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur p-4 md:p-5 transition-all duration-500 hover:border-white/20 hover:shadow-xl hover:shadow-violet-500/10 ${
                      removingId === item.id ? 'opacity-0 translate-x-4' : 'opacity-100'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                      {/* Imagen con hover effect */}
                      <div className="relative w-full md:w-32 h-32 md:h-24 shrink-0 rounded-xl overflow-hidden bg-white/5 group/image">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                            sizes="(max-width: 768px) 100vw, 128px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-white/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-lg hover:text-violet-400 transition-colors cursor-pointer truncate">
                          {item.name}
                        </h3>
                        {item.specs && (
                          <p className="text-sm text-white/70 mt-1 line-clamp-2">
                            {item.specs.slice(0, 3).join(" • ")}
                          </p>
                        )}
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            En stock
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            <Truck className="h-3 w-3" />
                            Envío 24/48h
                          </span>
                        </div>
                      </div>

                      {/* Precio + Qty */}
                      <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                        <div className="text-left md:text-right">
                          <div className="text-2xl font-bold text-violet-400">{fmt(item.price * item.qty)}</div>
                          <div className="text-sm text-white/60 mt-1">{fmt(item.price)} c/u</div>
                        </div>

                        {/* Controles de cantidad mejorados */}
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => dec(item.id)}
                            className="w-9 h-9 grid place-items-center rounded-lg bg-white/10 hover:bg-violet-500/20 hover:border-violet-400/50 border border-transparent transition-all duration-200 active:scale-95 text-white/80 hover:text-violet-300"
                            aria-label="Reducir cantidad"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => setQty(item.id, Number(e.target.value))}
                            className="w-16 text-center rounded-lg bg-white/5 px-2 py-2 outline-none border border-white/10 focus:border-violet-400 focus:bg-white/10 transition-all duration-200 font-semibold"
                            min="1"
                          />
                          <button
                            onClick={() => inc(item.id)}
                            className="w-9 h-9 grid place-items-center rounded-lg bg-white/10 hover:bg-cyan-500/20 hover:border-cyan-400/50 border border-transparent transition-all duration-200 active:scale-95 text-white/80 hover:text-cyan-300"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-sm text-white/60 hover:text-red-400 transition-all duration-200 hover:underline flex items-center gap-1"
                          aria-label="Eliminar producto"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ))}

              {/* Acciones mejoradas */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={clear}
                  className="flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/10"
                >
                  Vaciar cesta
                </button>
                <Link 
                  href="/productos" 
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors underline"
                >
                  ← Seguir comprando
                </Link>
              </div>
            </section>

            {/* Resumen sticky mejorado */}
            <aside className="lg:sticky lg:top-6 h-fit rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-xl p-6 shadow-2xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-400" />
                Resumen del pedido
              </h2>

              {/* Cupón */}
              <div className="mb-6">
                <label className="text-sm text-white/80 mb-2 block font-medium">Cupón de descuento</label>
                <div className="relative">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="p. ej. EQW"
                    className="w-full rounded-xl bg-white/5 px-4 py-3 outline-none border border-white/10 focus:border-violet-400 focus:bg-white/10 transition-all duration-200 pr-10"
                  />
                  {coupon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {descuento !== 0 && (
                  <p className="mt-2 text-sm text-emerald-400 flex items-center gap-2 animate-fade-in">
                    <span className="text-lg">✓</span>
                    Cupón aplicado: {fmt(Math.abs(descuento))} de descuento
                  </p>
                )}
              </div>

              {/* Costes */}
              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Subtotal</span>
                  <span className="font-semibold text-white">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Descuento</span>
                  <span className={`font-semibold ${descuento < 0 ? "text-emerald-400" : "text-white/40"}`}>
                    {descuento < 0 ? fmt(descuento) : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" />
                    Envío
                  </span>
                  <span className={`font-semibold ${envio === 0 ? "text-emerald-400" : ""}`}>
                    {envio === 0 ? "Gratis 🎉" : fmt(envio)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">IVA (21%)</span>
                  <span className="font-semibold">{fmt(iva)}</span>
                </div>
              </div>

              {/* Total destacado */}
              <div className="mb-6">
                <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {fmt(totalFinal)}
                  </span>
                </div>
              </div>

              {/* CTA destacado */}
              <Link
                href="/checkout"
                className="block w-full text-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 px-6 py-4 font-bold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 group"
              >
                <span className="flex items-center justify-center gap-2">
                  Finalizar compra
                  <Lock className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </span>
              </Link>

              {/* Confianza mejorada */}
              <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-white/5 p-3 text-center border border-white/10 hover:border-violet-400/50 transition-all duration-200 hover:bg-white/5">
                  <Shield className="h-5 w-5 mx-auto mb-1.5 text-emerald-400" />
                  <div className="text-white/70 font-medium">3 años garantía</div>
                </div>
                <div className="rounded-lg bg-white/5 p-3 text-center border border-white/10 hover:border-violet-400/50 transition-all duration-200 hover:bg-white/5">
                  <Lock className="h-5 w-5 mx-auto mb-1.5 text-blue-400" />
                  <div className="text-white/70 font-medium">Pago seguro</div>
                </div>
                <div className="rounded-lg bg-white/5 p-3 text-center border border-white/10 hover:border-violet-400/50 transition-all duration-200 hover:bg-white/5">
                  <Truck className="h-5 w-5 mx-auto mb-1.5 text-cyan-400" />
                  <div className="text-white/70 font-medium">24/48h</div>
                </div>
                <div className="rounded-lg bg-white/5 p-3 text-center border border-white/10 hover:border-violet-400/50 transition-all duration-200 hover:bg-white/5">
                  <Sparkles className="h-5 w-5 mx-auto mb-1.5 text-violet-400" />
                  <div className="text-white/70 font-medium">WhatsApp</div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Recomendaciones de la cesta */}
        {items.length > 0 && (
          <CartRecommendationsClient slugs={items.map(item => PRODUCTS.find(p => p.id === item.id)?.slug || "").filter(Boolean)} />
        )}
      </div>
    </main>
  );
}
