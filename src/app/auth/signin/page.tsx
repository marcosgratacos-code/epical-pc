"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Bienvenido a{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              EPICAL-PC
            </span>
          </h1>
          
          <p className="text-white/70 text-center mb-8">
            Inicia sesión para gestionar tus pedidos y configuraciones guardadas
          </p>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3 text-black font-semibold hover:bg-white/90 transition focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/70 mb-3">
              ¿Todavía no tienes cuenta? Se creará automáticamente al iniciar sesión.
            </p>
          </div>

          <p className="text-xs text-white/50 text-center mt-6">
            Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad
          </p>

          <Link
            href="/"
            className="block text-center mt-6 text-sm text-white/70 hover:text-white transition"
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "🛒", text: "Guarda tu carrito" },
            { icon: "📦", text: "Historial de pedidos" },
            { icon: "⚙️", text: "Configs guardadas" },
          ].map((f) => (
            <div key={f.text} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="text-xs text-white/70">{f.text}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

