"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Link from "next/link";

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    pais: "España",
  });

  // Ya no redirigimos automáticamente - dejamos que vean la página

  useEffect(() => {
    if (session?.user) {
      // Cargar datos guardados del localStorage
      const savedData = localStorage.getItem("userProfile");
      if (savedData) {
        setUserData(JSON.parse(savedData));
      } else {
        setUserData((prev) => ({
          ...prev,
          nombre: session.user?.name || "",
        }));
      }
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500"></div>
          <p className="text-white/60">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje amigable si no hay sesión
  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <BackButton />
            <div className="text-center mt-12">
              <div className="inline-block h-24 w-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/50 animate-fade-in-scale">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-400 bg-clip-text text-transparent">
                Inicia sesión para ver tu perfil
              </h1>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Crea una cuenta para gestionar tu información personal, direcciones de envío y preferencias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signin?callbackUrl=/perfil"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
                >
                  🔓 Iniciar Sesión
                </Link>
                <Link
                  href="/productos"
                  className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  🛍️ Ver Productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(userData));
    setIsEditing(false);
    // Aquí podrías enviar los datos a una API
  };

  const userInitial = session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U";
  const userImage = session.user?.image;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <BackButton />
          <div className="flex items-center gap-6 mt-6">
            {/* Avatar grande */}
            <div className="relative">
              {userImage ? (
                <img
                  src={userImage}
                  alt={session.user?.name || "Usuario"}
                  className="h-24 w-24 rounded-full ring-4 ring-violet-400/50 shadow-2xl shadow-violet-500/20"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center text-3xl font-bold text-white ring-4 ring-violet-400/50 shadow-2xl shadow-violet-500/20">
                  {userInitial}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-green-500 border-4 border-black flex items-center justify-center">
                ✓
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                {session.user?.name || "Usuario"}
              </h1>
              <p className="text-white/60 mt-1">{session.user?.email}</p>
              <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-semibold border border-violet-500/30">
                  Cliente Premium
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/30">
                  Verificado
                </span>
              </div>
            </div>

            {/* Botón editar */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isEditing
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                  : "bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-violet-500/50"
              }`}
            >
              {isEditing ? "Cancelar" : "Editar Perfil"}
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Información Personal */}
          <div className="md:col-span-2 space-y-6">
            {/* Datos personales */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">👤</span>
                Información Personal
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={userData.nombre}
                    onChange={(e) =>
                      setUserData({ ...userData, nombre: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    disabled
                    value={session.user?.email || ""}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/50 cursor-not-allowed"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    El email no se puede modificar
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={userData.telefono}
                    onChange={(e) =>
                      setUserData({ ...userData, telefono: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>
            </div>

            {/* Dirección de envío */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">🏠</span>
                Dirección de Envío
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={userData.direccion}
                    onChange={(e) =>
                      setUserData({ ...userData, direccion: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                    placeholder="Calle, número, piso, puerta"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={userData.ciudad}
                      onChange={(e) =>
                        setUserData({ ...userData, ciudad: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                      placeholder="Madrid"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={userData.codigoPostal}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          codigoPostal: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                      placeholder="28001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    País
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={userData.pais}
                    onChange={(e) =>
                      setUserData({ ...userData, pais: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                    placeholder="España"
                  />
                </div>
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
                >
                  Guardar Cambios
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Estadísticas */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Pedidos</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                    0
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Total gastado</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                    0€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Puntos</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                    100
                  </span>
                </div>
              </div>
            </div>

            {/* Beneficios */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>🎁</span>
                Beneficios
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-green-400">✓</span>
                  Envío gratis en pedidos +500€
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-green-400">✓</span>
                  Garantía extendida 3 años
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-green-400">✓</span>
                  Soporte prioritario 24/7
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-green-400">✓</span>
                  Descuentos exclusivos
                </li>
              </ul>
            </div>

            {/* Seguridad */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>🔒</span>
                Seguridad
              </h3>
              <button className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm">
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

