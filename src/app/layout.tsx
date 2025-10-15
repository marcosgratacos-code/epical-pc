import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";
import { CartProvider } from "./context/cart-context";
import CartDrawerGlobal from "./components/CartDrawerGlobal";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthSessionProvider from "./components/AuthSessionProvider";

export const metadata: Metadata = {
  title: "EPICAL-PC",
  description: "PCs personalizados que hacen historia",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Intentar obtener la sesión, pero no fallar si no está configurado
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.warn("Auth not configured, continuing without authentication");
  }
  
  return (
    <html lang="es">
      <body className="bg-black text-white">
        <AuthSessionProvider session={session}>
          <CartProvider>
            <SiteHeader />
            {children}
            <CartDrawerGlobal />
          </CartProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
