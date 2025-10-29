"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [isVentajasOpen, setIsVentajasOpen] = useState(false);

  // Prevenir scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const menuItems = [
    { href: "/productos", label: "Productos", icon: "🖥️" },
    { href: "/pc-a-medida", label: "Configurar PC", icon: "⚙️" },
    { href: "/contacto", label: "Contacto", icon: "💬" },
    { href: "/faq", label: "FAQ", icon: "❓" },
  ];

  const ventajasItems = [
    { href: "/ventajas", label: "Ventajas TITAN", icon: "✨" },
    { href: "/comparador", label: "Comparador", icon: "⚖️" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 z-[1000] w-[85vw] max-w-sm bg-black border-l border-white/10 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-black/95 backdrop-blur border-b border-white/10 p-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="text-white">TITAN</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">-PC</span>
          </Link>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Cerrar menú"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4" aria-label="Menú móvil">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 border border-white/20 text-white font-semibold"
                      : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-transparent"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            
            {/* Ventajas con submenú */}
            <li>
              <button
                onClick={() => setIsVentajasOpen(!isVentajasOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-transparent transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <span>Ventajas</span>
                </div>
                <svg 
                  className={`h-5 w-5 transition-transform duration-200 ${isVentajasOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Submenú de Ventajas */}
              <div className={`overflow-hidden transition-all duration-300 ${isVentajasOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="mt-2 space-y-1 pl-4">
                  {ventajasItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                          pathname === item.href
                            ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 border border-white/20 text-white font-semibold"
                            : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-transparent"
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <div className="rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-white/10 p-4 text-center">
            <p className="text-sm text-white/80 mb-3">
              ¿Necesitas ayuda? Contáctanos por WhatsApp
            </p>
            <a
              href="https://wa.me/34XXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
              <span>📱</span>
              WhatsApp
            </a>
          </div>

          <div className="mt-4 text-center text-xs text-white/40">
            © 2025 TITAN-PC
          </div>
        </div>
      </div>
    </>
  );
}