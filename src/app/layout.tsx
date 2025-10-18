import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";
import { CartProvider } from "./context/cart-context";
import { WishlistProvider } from "./context/wishlist-context";
import { NotificationsProvider } from "./context/notifications-context";
import CartDrawerGlobal from "./components/CartDrawerGlobal";
import ChatWidget from "./components/ChatWidget";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthSessionProvider from "./components/AuthSessionProvider";

export const metadata: Metadata = {
  title: "EPICAL-PC | PCs Gaming Personalizados con Validación Térmica",
  description: "PCs gaming personalizados con montaje profesional, validación térmica real y 3 años de garantía. Configura tu PC perfecto con componentes de última generación. Envío 24-48h.",
  keywords: "PC gaming, ordenador gaming, PC personalizado, montaje PC, validación térmica, gaming, componentes PC, AMD, Intel, NVIDIA",
  authors: [{ name: "EPICAL-PC" }],
  creator: "EPICAL-PC",
  publisher: "EPICAL-PC",
  robots: "index, follow",
  metadataBase: new URL("https://epical-pc.com"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://epical-pc.com",
    title: "EPICAL-PC | PCs Gaming Personalizados",
    description: "PCs gaming personalizados con montaje profesional y validación térmica real",
    siteName: "EPICAL-PC",
    images: [
      {
        url: "/logo-epical.png",
        width: 1200,
        height: 630,
        alt: "EPICAL-PC Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "EPICAL-PC | PCs Gaming Personalizados",
    description: "PCs gaming personalizados con montaje profesional y validación térmica real",
    images: ["/logo-epical.png"]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8b5cf6"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Intentar obtener la sesión, pero no fallar si no está configurado
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch {
    console.warn("Auth not configured, continuing without authentication");
  }
  
  return (
    <html lang="es">
      <body className="bg-black text-white">
        <AuthSessionProvider session={session}>
          <NotificationsProvider>
            <CartProvider>
              <WishlistProvider>
                <SiteHeader />
                {children}
                <CartDrawerGlobal />
                <ChatWidget />
              </WishlistProvider>
            </CartProvider>
          </NotificationsProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
