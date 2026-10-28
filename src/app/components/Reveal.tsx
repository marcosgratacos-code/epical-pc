"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Aparición suave al entrar en pantalla.
 * Se renderiza visible en el servidor; solo se oculta en el cliente si el
 * elemento queda fuera de la pantalla, así el contenido nunca depende de JS.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "p" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return; // ya visible: no se anima

    el.classList.add("reveal-hidden");
    el.style.setProperty("--reveal-delay", `${delay}s`);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.remove("reveal-hidden");
        el.classList.add("reveal-in");
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Component = Tag as "div";
  return (
    <Component ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Component>
  );
}
