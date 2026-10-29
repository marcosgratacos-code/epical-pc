"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cart-context";
import { PRODUCTS } from "../lib/products";
import { POLICIES } from "../lib/policies";
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

  // Envío gratis a partir del umbral definido en lib/policies
  const envio = subtotal + descuento > POLICIES.freeShippingFrom ? 0 : POLICIES.shippingCost;
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
      <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 border-4 border-blue-300 border-t-violet-400 rounded-full animate-spin"></div>
          <p className="text-neutral-500">Cargando tu cesta...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Header mejorado */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-neutral-600 mb-4">
            <Link 
              href="/productos" 
              className="hover:text-neutral-900 transition-colors flex items-center gap-2 group"
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
            <div className="h-10 w-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Tu Cesta
              </h1>
              <p className="text-neutral-500 text-sm mt-1">Revisa y finaliza tu pedido</p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-12 text-center max-w-2xl mx-auto">
            <div className="mx-auto mb-6 grid place-items-center w-24 h-24 rounded-3xl bg-neutral-50 backdrop-blur">
              <ShoppingBag className="h-12 w-12 text-neutral-400" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Tu cesta está vacía</h2>
            <p className="text-neutral-600 mb-8">Descubre nuestros PCs gaming personalizados</p>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-700 px-6 py-3 font-semibold transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/10 hover:scale-105 text-white"
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
                    className={`rounded-2xl border border-neutral-200 bg-neutral-50 backdrop-blur p-4 md:p-5 transition-all duration-500 hover:border-neutral-300 hover:shadow-xl hover:shadow-black/10 ${
                      removingId === item.id ? 'opacity-0 translate-x-4' : 'opacity-100'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                      {/* Imagen con hover effect */}
                      <div className="relative w-full md:w-32 h-32 md:h-24 shrink-0 rounded-xl overflow-hidden bg-neutral-50 group/image">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                            sizes="(max-width: 768px) 100vw, 128px"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-50 flex items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-neutral-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-neutral-900 text-lg hover:text-blue-600 transition-colors cursor-pointer truncate">
                          {item.name}
                        </h3>
                        {item.specs && (
                          <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                            {item.specs.slice(0, 3).join(" • ")}
                          </p>
                        )}
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            En stock
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-100 text-blue-600 border border-blue-300">
                            <Truck className="h-3 w-3" />
                            Envío 24/48h
                          </span>
                        </div>
                      </div>

                      {/* Precio + Qty */}
                      <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                        <div className="text-left md:text-right">
                          <div className="text-2xl font-bold text-blue-600">{fmt(item.price * item.qty)}</div>
                          <div className="text-sm text-neutral-500 mt-1">{fmt(item.price)} c/u</div>
                        </div>

                        {/* Controles de cantidad mejorados */}
                        <div className="flex items-center gap-2 bg-neutral-50 rounded-lg p-1 border border-neutral-200">
                          <button
                            onClick={() => dec(item.id)}
                            className="w-9 h-9 grid place-items-center rounded-lg bg-neutral-100 hover:bg-blue-100 hover:border-blue-300 border border-transparent transition-all duration-200 active:scale-95 text-neutral-700 hover:text-blue-600"
                            aria-label="Reducir cantidad"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => setQty(item.id, Number(e.target.value))}
                            className="w-16 text-center rounded-lg bg-neutral-50 px-2 py-2 outline-none border border-neutral-200 focus:border-blue-600 focus:bg-neutral-100 transition-all duration-200 font-semibold"
                            min="1"
                          />
                          <button
                            onClick={() => inc(item.id)}
                            className="w-9 h-9 grid place-items-center rounded-lg bg-neutral-100 hover:bg-blue-100 hover:border-blue-300 border border-transparent transition-all duration-200 active:scale-95 text-neutral-700 hover:text-blue-600"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-sm text-neutral-500 hover:text-red-700 transition-all duration-200 hover:underline flex items-center gap-1"
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
              <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-6 border-t border-neutral-200">
                <button
                  onClick={clear}
                  className="flex items-center gap-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-red-300 px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/10"
                >
                  Vaciar cesta
                </button>
                <Link 
                  href="/productos" 
                  className="flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900 transition-colors underline"
                >
                  ← Seguir comprando
                </Link>
              </div>
            </section>

            {/* Resumen sticky mejorado */}
            <aside className="lg:sticky lg:top-6 h-fit rounded-2xl border border-neutral-200 bg-neutral-50 backdrop-blur-xl p-6 shadow-2xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Resumen del pedido
              </h2>

              {/* Cupón */}
              <div className="mb-6">
                <label className="text-sm text-neutral-700 mb-2 block font-medium">Cupón de descuento</label>
                <div className="relative">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="p. ej. EQW"
                    className="w-full rounded-xl bg-neutral-50 px-4 py-3 outline-none border border-neutral-200 focus:border-blue-600 focus:bg-neutral-100 transition-all duration-200 pr-10"
                  />
                  {coupon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {descuento !== 0 && (
                  <p className="mt-2 text-sm text-emerald-700 flex items-center gap-2 animate-fade-in">
                    <span className="text-lg">✓</span>
                    Cupón aplicado: {fmt(Math.abs(descuento))} de descuento
                  </p>
                )}
              </div>

              {/* Costes */}
              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-neutral-200">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-semibold text-neutral-900">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Descuento</span>
                  <span className={`font-semibold ${descuento < 0 ? "text-emerald-700" : "text-neutral-400"}`}>
                    {descuento < 0 ? fmt(descuento) : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" />
                    Envío
                  </span>
                  <span className={`font-semibold ${envio === 0 ? "text-emerald-700" : ""}`}>
                    {envio === 0 ? "Gratis 🎉" : fmt(envio)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">IVA (21%)</span>
                  <span className="font-semibold">{fmt(iva)}</span>
                </div>
              </div>

              {/* Total destacado */}
              <div className="mb-6">
                <div className="flex justify-between items-center p-4 rounded-xl bg-neutral-50 border border-blue-200">
                  <span className="text-lg font-bold text-neutral-900">Total</span>
                  <span className="text-2xl font-bold text-neutral-900">
                    {fmt(totalFinal)}
                  </span>
                </div>
              </div>

              {/* CTA destacado */}
              <Link
                href="/checkout"
                className="block w-full text-center rounded-xl bg-neutral-900 hover:bg-neutral-700 px-6 py-4 font-bold transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/10 hover:scale-105 group text-white"
              >
                <span className="flex items-center justify-center gap-2">
                  Finalizar compra
                  <Lock className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </span>
              </Link>

              {/* Confianza mejorada */}
              <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-neutral-50 p-3 text-center border border-neutral-200 hover:border-blue-300 transition-all duration-200 hover:bg-neutral-50">
                  <Shield className="h-5 w-5 mx-auto mb-1.5 text-emerald-700" />
                  <div className="text-neutral-600 font-medium">3 años garantía</div>
                </div>
                <div className="rounded-lg bg-neutral-50 p-3 text-center border border-neutral-200 hover:border-blue-300 transition-all duration-200 hover:bg-neutral-50">
                  <Lock className="h-5 w-5 mx-auto mb-1.5 text-blue-600" />
                  <div className="text-neutral-600 font-medium">Pago seguro</div>
                </div>
                <div className="rounded-lg bg-neutral-50 p-3 text-center border border-neutral-200 hover:border-blue-300 transition-all duration-200 hover:bg-neutral-50">
                  <Truck className="h-5 w-5 mx-auto mb-1.5 text-blue-600" />
                  <div className="text-neutral-600 font-medium">24/48h</div>
                </div>
                <div className="rounded-lg bg-neutral-50 p-3 text-center border border-neutral-200 hover:border-blue-300 transition-all duration-200 hover:bg-neutral-50">
                  <Sparkles className="h-5 w-5 mx-auto mb-1.5 text-blue-600" />
                  <div className="text-neutral-600 font-medium">WhatsApp</div>
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
