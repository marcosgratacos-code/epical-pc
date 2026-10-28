"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Link from "next/link";
import PasswordInfoModal from "../components/modals/PasswordInfoModal";

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-neutral-900 text-white"></div>
          <p className="text-neutral-500">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje amigable si no hay sesión
  if (!session) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <BackButton />
            <div className="text-center mt-12">
              <div className="inline-block h-24 w-24 mx-auto mb-6 rounded-full bg-neutral-900 flex items-center justify-center shadow-2xl shadow-orange-500/50 animate-fade-in-scale text-white">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-neutral-900">
                Inicia sesión para ver tu perfil
              </h1>
              <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                Crea una cuenta para gestionar tu información personal, direcciones de envío y preferencias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signin?callbackUrl=/perfil"
                  className="px-8 py-4 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
                >
                  🔓 Iniciar Sesión
                </Link>
                <Link
                  href="/productos"
                  className="px-8 py-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 font-semibold hover:bg-neutral-100 transition-all duration-300"
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
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <BackButton />
          <div className="flex items-center gap-6 mt-6">
            {/* Avatar grande */}
            <div className="relative">
              {userImage ? (
                <img
                  src={userImage}
                  alt={session.user?.name || "Usuario"}
                  className="h-24 w-24 rounded-full ring-4 ring-blue-300 shadow-2xl shadow-black/10"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-neutral-900 flex items-center justify-center text-3xl font-bold text-white ring-4 ring-blue-300 shadow-2xl shadow-black/10">
                  {userInitial}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-green-500 border-4 border-black flex items-center justify-center">
                ✓
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-neutral-900">
                {session.user?.name || "Usuario"}
              </h1>
              <p className="text-neutral-500 mt-1">{session.user?.email}</p>
              <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-300">
                  Cliente Premium
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-300">
                  Verificado
                </span>
              </div>
            </div>

            {/* Botón editar */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isEditing
                  ? "bg-red-100 text-red-700 border border-red-200 hover:bg-red-100"
                  : "bg-neutral-900 text-white hover:shadow-lg hover:shadow-black/10"
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
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">👤</span>
                Información Personal
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={userData.nombre}
                    onChange={(e) =>
                      setUserData({ ...userData, nombre: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    disabled
                    value={session.user?.email || ""}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-neutral-400 mt-1">
                    El email no se puede modificar
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={userData.telefono}
                    onChange={(e) =>
                      setUserData({ ...userData, telefono: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>
            </div>

            {/* Dirección de envío */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">🏠</span>
                Dirección de Envío
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={userData.direccion}
                    onChange={(e) =>
                      setUserData({ ...userData, direccion: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="Calle, número, piso, puerta"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-2">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={userData.ciudad}
                      onChange={(e) =>
                        setUserData({ ...userData, ciudad: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      placeholder="Madrid"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-2">
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
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      placeholder="28001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-2">
                    País
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={userData.pais}
                    onChange={(e) =>
                      setUserData({ ...userData, pais: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="España"
                  />
                </div>
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full mt-6 px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
                >
                  Guardar Cambios
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Estadísticas */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Pedidos</span>
                  <span className="text-2xl font-bold text-neutral-900">
                    0
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Total gastado</span>
                  <span className="text-2xl font-bold text-neutral-900">
                    0€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Puntos</span>
                  <span className="text-2xl font-bold text-neutral-900">
                    100
                  </span>
                </div>
              </div>
            </div>

            {/* Beneficios */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>🎁</span>
                Beneficios
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-neutral-600">
                  <span className="text-green-700">✓</span>
                  Envío gratis en pedidos +500€
                </li>
                <li className="flex items-center gap-2 text-neutral-600">
                  <span className="text-green-700">✓</span>
                  Garantía extendida 3 años
                </li>
                <li className="flex items-center gap-2 text-neutral-600">
                  <span className="text-green-700">✓</span>
                  Soporte prioritario 24/7
                </li>
                <li className="flex items-center gap-2 text-neutral-600">
                  <span className="text-green-700">✓</span>
                  Descuentos exclusivos
                </li>
              </ul>
            </div>

            {/* Seguridad */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>🔒</span>
                Seguridad
              </h3>
              <button 
                onClick={() => setIsPasswordModalOpen(true)}
                className="w-full px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all text-sm"
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de información de contraseña */}
      <PasswordInfoModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}

