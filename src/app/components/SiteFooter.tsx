"use client";

import { COMPANY, whatsappUrl } from "@/lib/company";

import Link from "next/link";
import { usePathname } from "next/navigation";

const COLUMNS = [
  {
    title: "Comprar",
    links: [
      { href: "/productos", label: "Todos los PCs" },
      { href: "/pc-a-medida", label: "Configura tu TITAN" },
      { href: "/comparador", label: "Comparar modelos" },
      { href: "/calculadora-gaming", label: "Calculadora gaming" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { href: "/faq", label: "Preguntas frecuentes" },
      { href: "/contacto", label: "Contacto" },
      { href: "/seguimiento", label: "Seguimiento de envío" },
      { href: "/ventajas", label: "Garantía y servicio" },
    ],
  },
  {
    title: "Tu cuenta",
    links: [
      { href: "/perfil", label: "Perfil" },
      { href: "/pedidos", label: "Pedidos" },
      { href: "/favoritos", label: "Favoritos" },
      { href: "/cesta", label: "Cesta" },
    ],
  },
];

const LEGAL = [
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/condiciones", label: "Condiciones de venta" },
];

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-surface text-ink" aria-label="Pie de página">
      <div className="container-content py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight">
              TITAN<span className="text-accent">-PC</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Ordenadores montados a mano, probados y listos para jugar. Garantía de 3 años.
            </p>
            <p className="mt-4 text-sm text-muted">
              <a href={`mailto:${COMPANY.email}`} className="hover:text-ink transition-colors">
                {COMPANY.email}
              </a>
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">{col.title}</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink/80 hover:text-ink hover:underline underline-offset-4 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-black/10 pt-6 text-xs text-muted">
          <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-2" aria-label="Información legal">
            {LEGAL.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-ink hover:underline underline-offset-4">{l.label}</Link></li>
            ))}
          </ul>
          {COMPANY.legalName && <p className="mb-1">{COMPANY.legalName}{COMPANY.taxId ? ` · ${COMPANY.taxId}` : ""}{COMPANY.address ? ` · ${COMPANY.address}` : ""}</p>}
          © {new Date().getFullYear()} TITAN-PC. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
