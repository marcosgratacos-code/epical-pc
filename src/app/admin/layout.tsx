"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/signin?callbackUrl=/admin");
      return;
    }

    // Verificar si el usuario tiene rol de admin
    const userRole = (session.user as any)?.role;
    if (userRole !== "admin") {
      alert("⚠️ Acceso denegado\n\nNo tienes permisos de administrador.");
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500"></div>
          <p className="text-white/60">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Verificar si el usuario tiene rol de admin
  const userRole = (session?.user as any)?.role;
  if (!session || userRole !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-black to-black border-r border-white/10 p-6 z-50">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <span className="text-xl font-bold">E</span>
          </div>
          <div>
            <h1 className="font-bold">TITAN-PC</h1>
            <p className="text-xs text-white/60">Admin Panel</p>
          </div>
        </Link>

        <nav className="space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/productos"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span>🖥️</span>
            <span>Productos</span>
          </Link>
          <Link
            href="/admin/pedidos"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span>📦</span>
            <span>Pedidos</span>
          </Link>
          <Link
            href="/admin/clientes"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span>👥</span>
            <span>Clientes</span>
          </Link>
          <Link
            href="/admin/analytics"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span>📈</span>
            <span>Analytics</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/60 mb-1">Sesión como admin</p>
            <p className="text-sm font-semibold truncate">{session.user?.email}</p>
            <Link
              href="/"
              className="mt-3 block text-center px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

