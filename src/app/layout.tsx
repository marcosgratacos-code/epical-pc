import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";
import { CartProvider } from "./context/cart-context";
import { WishlistProvider } from "./context/wishlist-context";
import { NotificationsProvider } from "./context/notifications-context";
import { CompareProvider } from "./context/compare-context";
import CartDrawerGlobal from "./components/CartDrawerGlobal";
import ChatWidget from "./components/ChatWidget";
import ProgressBar from "./components/ProgressBar";
import ScrollToTop from "./components/ScrollToTop";
import CompareFloatingButton from "./components/CompareFloatingButton";
import StructuredData from "./components/StructuredData";
import Onboarding from "./components/Onboarding";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthSessionProvider from "./components/AuthSessionProvider";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
// import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
// import { extractRouterConfig } from "uploadthing/server";
// import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
  title: "TITAN-PC | Potencia extrema, diseño impecable",
  description: "TITAN-PC crea PCs personalizados de alto rendimiento con diseño premium. Montajes validados térmicamente, con componentes certificados y garantía profesional.",
  keywords: [
    "PC gaming",
    "ordenadores personalizados",
    "TITAN-PC",
    "custom PC",
    "montaje de PCs",
    "Corsair",
    "iCUE",
    "alto rendimiento",
    "PC profesional",
    "validación térmica",
    "gaming",
    "componentes PC",
    "AMD",
    "Intel",
    "NVIDIA"
  ],
  authors: [{ name: "TITAN-PC" }],
  creator: "TITAN-PC",
  publisher: "TITAN-PC",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  metadataBase: new URL("https://titan-pc.com"),
  alternates: {
    canonical: "https://titan-pc.com/",
  },
  openGraph: {
    title: "TITAN-PC | Potencia extrema, diseño impecable",
    description: "Montajes de alto rendimiento con validación térmica, control acústico y perfiles XMP/EXPO probados.",
    url: "https://titan-pc.com/",
    siteName: "TITAN-PC",
    images: [
      {
        url: "https://titan-pc.com/logo-epical.png",
        width: 1200,
        height: 630,
        alt: "TITAN-PC logo",
      }
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TITAN-PC | Potencia extrema, diseño impecable",
    description: "Montajes de alto rendimiento con validación térmica, control acústico y perfiles XMP/EXPO probados.",
    images: ["https://titan-pc.com/logo-epical.png"]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8b5cf6",
  maximumScale: 5,
  userScalable: true,
};

// Precargar recursos críticos
const preloadResources = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://cdn.akamai.steamstatic.com" />
    </>
  );
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Intentar obtener la sesión, pero no fallar si no está configurado
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch {
    console.warn("Auth not configured, continuing without authentication");
  }
  
  // Structured data para la organización
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TITAN-PC",
    url: "https://titan-pc.com",
    logo: "https://titan-pc.com/logo-epical.png",
    description: "PCs gaming personalizados con montaje profesional, validación térmica real y 3 años de garantía",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ES",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    sameAs: [
      // Añadir redes sociales cuando estén disponibles
    ],
  };

  return (
    <html lang="es">
      <head>
        {preloadResources()}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-black text-white">
        <StructuredData data={organizationData} />
        <AuthSessionProvider session={session}>
          <NotificationsProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>
                  <Suspense fallback={null}>
                    <ProgressBar />
                  </Suspense>
                  <Suspense fallback={
                    <header className="sticky top-0 z-[100] bg-black/95 backdrop-blur-xl border-b border-white/10">
                      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-4">
                        <div className="text-2xl font-bold text-white">TITAN-PC</div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-white/10 rounded animate-pulse"></div>
                          <div className="h-8 w-8 bg-white/10 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </header>
                  }>
                    <SiteHeader />
                  </Suspense>
                  {children}
                  <CartDrawerGlobal />
                  <ChatWidget />
                  <ScrollToTop />
                  <CompareFloatingButton />
                  <Onboarding />
                </CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </NotificationsProvider>
        </AuthSessionProvider>
        <Toaster position="top-right" />
        {/* <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} /> */}
      </body>
    </html>
  );
}
