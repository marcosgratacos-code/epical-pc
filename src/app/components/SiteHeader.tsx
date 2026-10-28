"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { useCart } from "../context/cart-context";
import { useWishlist } from "../context/wishlist-context";
import GoogleSignInButton from "./GoogleSignInButton";
import NotificationBell from "./NotificationBell";
import MobileMenu from "./MobileMenu";
import GlobalSearch from "./GlobalSearch";
import SafeCount from "./SafeCount";
import { useState } from "react";

const NAV = [
  { href: "/productos", label: "Productos" },
  { href: "/pc-a-medida", label: "Configurar PC" },
  { href: "/ventajas", label: "Ventajas" },
  { href: "/contacto", label: "Contacto" },
  { href: "/faq", label: "FAQ" },
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

  const shell = light
    ? "bg-white border-neutral-200 text-neutral-900"
    : "bg-black/95 border-white/10 text-white";
  const navLink = light
    ? "text-neutral-500 hover:text-neutral-900"
    : "text-white/80 hover:text-white";
  const iconBtn = light
    ? "border-transparent text-neutral-700 hover:bg-neutral-100"
    : "border-white/20 text-white hover:border-white/40 hover:bg-white/5";

  return (
    <>
      <header className={`sticky top-0 z-[100] backdrop-blur-xl border-b ${shell}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${iconBtn}`}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            href="/"
            className="shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight rounded-md px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Ir al inicio"
          >
            TITAN<span className={light ? "text-blue-600" : "text-violet-400"}>-PC</span>
          </Link>

          <nav className={`hidden md:flex gap-6 text-sm font-medium ${navLink}`} aria-label="Navegación principal">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="py-1 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${iconBtn}`}
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
              className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-2.5 text-sm transition-colors sm:px-3 ${iconBtn}`}
              aria-label="Ver favoritos"
            >
              <Heart className="h-[18px] w-[18px]" />
              <SafeCount value={wishlistCount} fallback={0} />
            </Link>

            <Link
              href="/cesta"
              className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-2.5 text-sm transition-colors sm:px-3 ${iconBtn}`}
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
