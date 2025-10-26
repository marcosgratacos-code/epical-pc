// Modal informativo sobre gestión de contraseña con Google

import Modal from './Modal';

interface PasswordInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordInfoModal({ isOpen, onClose }: PasswordInfoModalProps) {
  const openGoogleSecurity = () => {
    window.open('https://myaccount.google.com/security', '_blank');
  };

  const openGooglePasswordManager = () => {
    window.open('https://passwords.google.com/', '_blank');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Gestión de Contraseña"
      size="md"
    >
      <div className="space-y-6">
        {/* Información principal */}
        <div className="text-center space-y-4">
          <div className="inline-block h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/20 to-red-500/20 flex items-center justify-center">
            <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Tu cuenta está vinculada con Google</h3>
            <p className="text-white/70">
              Utilizas Google para iniciar sesión, por lo que tu contraseña se gestiona desde tu cuenta de Google.
            </p>
          </div>
        </div>

        {/* Información detallada */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <span>🔐</span>
            ¿Cómo funciona?
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              Tu cuenta de EPICAL-PC está vinculada a tu cuenta de Google
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              Google gestiona la seguridad y autenticación
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              Para cambiar tu contraseña, debes hacerlo desde Google
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              Esto garantiza máxima seguridad y facilidad de uso
            </li>
          </ul>
        </div>

        {/* Opciones de gestión */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white">Gestionar tu cuenta de Google</h4>
          
          <button
            onClick={openGoogleSecurity}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
              <span className="text-lg">🛡️</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-white">Seguridad de Google</p>
              <p className="text-sm text-white/60">Cambiar contraseña, verificación en 2 pasos, actividad reciente</p>
            </div>
            <svg className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>

          <button
            onClick={openGooglePasswordManager}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-all">
              <span className="text-lg">🔑</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-white">Gestor de Contraseñas</p>
              <p className="text-sm text-white/60">Ver y gestionar todas tus contraseñas guardadas</p>
            </div>
            <svg className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

        {/* Ventajas */}
        <div className="rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 p-4">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <span>✨</span>
            Ventajas de usar Google
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-green-400">✓</span>
              Verificación en 2 pasos
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-green-400">✓</span>
              Detección de actividad sospechosa
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-green-400">✓</span>
              Sincronización entre dispositivos
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-green-400">✓</span>
              Gestión centralizada
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
          <div className="flex items-start gap-2">
            <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-blue-300 font-medium text-sm">¿Necesitas ayuda?</p>
              <p className="text-blue-200 text-sm mt-1">
                Si tienes problemas para acceder a tu cuenta de Google, puedes contactar con nuestro soporte técnico.
              </p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200"
          >
            Entendido
          </button>
          <button
            onClick={openGoogleSecurity}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Ir a Google
          </button>
        </div>
      </div>
    </Modal>
  );
}

















