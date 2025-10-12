

import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "EPICAL-PC",
  description: "PCs personalizados que hacen historia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white">
        {/* Header global (único) */}
        <SiteHeader />
        {/* Contenido: SOLO UNA VEZ */}
        {children}
      </body>
    </html>
  );
}
