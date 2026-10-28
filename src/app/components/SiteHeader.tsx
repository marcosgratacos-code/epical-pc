"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { useCart } from "../context/cart-context";
import { useWishlist } from "../context/wishlist-context";
import GoogleSignInButton from "./GoogleSignInButton";
import NotificationBell from "./NotificationBell";
import MobileMenu from "./MobileMenu";
import GlobalSearch from "./GlobalSearch";
import SafeCount from "./SafeCount";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/ventajas", label: "Descubrir" },
  { href: "/productos", label: "Gaming" },
  { href: "/pc-a-medida", label: "Configurar" },
];

const SUPPORT = [
  { href: "/faq", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
  { href: "/seguimiento", label: "Seguimiento de envío" },
];

export default function SiteHeader() {
  const { cart } = useCart();
  const { wishlistCount } = useWishlist();
  const pathname = usePathname();
  // El panel de administración conserva el tema oscuro
  const light = !pathname.startsWith("/admin");
  const totalItems = Object.values(cart).reduce((a: number, b: number) => a + b, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const supportRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const supportActive = SUPPORT.some((s) => isActive(s.href));

  // Cierra el menú de Soporte con Escape, clic fuera o al salir el foco
  useEffect(() => {
    if (!supportOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSupportOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (supportRef.current && !supportRef.current.contains(e.target as Node)) setSupportOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [supportOpen]);

  useEffect(() => setSupportOpen(false), [pathname]);

  const shell = light
    ? "bg-white/80 border-black/10 text-ink"
    : "bg-black/95 border-white/10 text-white";
  const navLink = (active: boolean) =>
    light
      ? active
        ? "text-ink"
        : "text-ink/70 hover:text-ink"
      : active
        ? "text-white"
        : "text-white/80 hover:text-white";
  const iconBtn = light
    ? "text-ink/80 hover:bg-black/5"
    : "text-white hover:bg-white/10";

  return (
    <>
      <header className={`sticky top-0 z-[100] border-b backdrop-blur-xl ${shell}`}>
        <div className="mx-auto flex h-14 max-w-wide items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden ${iconBtn}`}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              href="/"
              className="shrink-0 whitespace-nowrap rounded-md px-1 text-xl font-semibold tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="TITAN-PC, ir al inicio"
            >
              TITAN<span className={light ? "text-accent" : "text-violet-400"}>-PC</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 text-[0.8125rem] font-medium md:flex" aria-label="Navegación principal">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${navLink(isActive(item.href))}`}
              >
                {item.label}
              </Link>
            ))}

            <div ref={supportRef} className="relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={supportOpen}
                aria-controls="menu-soporte"
                onClick={() => setSupportOpen((v) => !v)}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${navLink(supportActive)}`}
              >
                Soporte
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${supportOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <div
                id="menu-soporte"
                className={`absolute left-1/2 top-full mt-2 w-60 -translate-x-1/2 origin-top rounded-2xl border border-black/10 bg-white p-2 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.25)] transition duration-150 ${
                  supportOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                }`}
                hidden={!supportOpen}
              >
                {SUPPORT.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSupportOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-sm text-ink hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${iconBtn}`}
              aria-label="Buscar productos"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <GoogleSignInButton light={light} />

            <div className="hidden sm:block">
              <NotificationBell light={light} />
            </div>

            <Link
              href="/favoritos"
              className={`inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-sm transition-colors ${iconBtn}`}
              aria-label="Ver favoritos"
            >
              <Heart className="h-[18px] w-[18px]" />
              <SafeCount value={wishlistCount} fallback={0} />
            </Link>

            <Link
              href="/cesta"
              className={`inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-sm transition-colors ${iconBtn}`}
              aria-label="Ver cesta"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <SafeCount value={totalItems} fallback={0} />
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
