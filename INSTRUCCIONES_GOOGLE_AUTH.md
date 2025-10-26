# 🔐 Instrucciones para configurar Google OAuth

## ✅ Archivos creados exitosamente:

- ✅ `src/app/api/auth/[...nextauth]/route.ts` - API de NextAuth
- ✅ `src/app/components/GoogleSignInButton.tsx` - Botón de login
- ✅ `src/app/components/AuthSessionProvider.tsx` - Provider de sesión
- ✅ `src/app/auth/signin/page.tsx` - Página de login personalizada
- ✅ `src/types/next-auth.d.ts` - Tipos de TypeScript
- ✅ Modificado `src/app/layout.tsx` - Agregado SessionProvider
- ✅ Modificado `src/app/components/SiteHeader.tsx` - Agregado botón de login

---

## 📝 PASOS PARA COMPLETAR LA CONFIGURACIÓN:

### **Paso 1: Obtener credenciales de Google**

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. En el menú lateral, ve a **"APIs y servicios" > "Credenciales"**
4. Click en **"Crear credenciales" > "ID de cliente de OAuth 2.0"**
5. Si es la primera vez, configura la pantalla de consentimiento:
   - Tipo: **Externo**
   - Nombre de la app: **TITAN-PC**
   - Correo del usuario: tu email
   - Dominios autorizados: (déjalo vacío por ahora)
   - Agrega tu email en "Correos de prueba" si es necesario

6. Vuelve a "Credenciales" y crea el OAuth client ID:
   - Tipo de aplicación: **Aplicación web**
   - Nombre: **TITAN-PC Web**
   - **Orígenes JavaScript autorizados**: 
     ```
     http://localhost:3000
     ```
   - **URI de redirección autorizados**:
     ```
     http://localhost:3000/api/auth/callback/google
     ```

7. Click en **"Crear"**
8. **Copia el Client ID y Client Secret** (los necesitarás en el siguiente paso)

---

### **Paso 2: Configurar variables de entorno**

1. Crea un archivo `.env.local` en la raíz del proyecto (si no existe):

```bash
# En PowerShell
New-Item -Path ".env.local" -ItemType File -Force
```

2. Abre el archivo `.env.local` y agrega:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=TU_CLIENT_ID_AQUI.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=TU_CLIENT_SECRET_AQUI

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=GENERA_UN_SECRET_ALEATORIO_AQUI
```

3. Genera el `NEXTAUTH_SECRET` ejecutando en PowerShell:

```powershell
# Opción 1: OpenSSL (si lo tienes instalado)
openssl rand -base64 32

# Opción 2: PowerShell nativo
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

4. **Reemplaza** los valores en `.env.local` con tus credenciales reales

---

### **Paso 3: Reiniciar el servidor de desarrollo**

```bash
# Detener el servidor actual (Ctrl+C)
# Luego reiniciar:
npm run dev
```

---

## 🎯 Probar la autenticación

1. Abre `http://localhost:3000`
2. Verás el botón **"Iniciar sesión"** en el header
3. Click en el botón → te redirigirá a la página de login
4. Click en **"Continuar con Google"**
5. Selecciona tu cuenta de Google
6. Deberías ver tu nombre/email en el header y el botón cambiar a **"Salir"**

---

## 🚀 Para producción (cuando despliegues):

1. En Google Cloud Console, agrega tu dominio de producción:
   - **Orígenes autorizados**: `https://tu-dominio.com`
   - **URI de redirección**: `https://tu-dominio.com/api/auth/callback/google`

2. Actualiza `.env.local` en producción:
   ```env
   NEXTAUTH_URL=https://tu-dominio.com
   ```

---

## 📦 Funcionalidades incluidas:

- ✅ Login con Google OAuth
- ✅ Botón de login/logout en el header
- ✅ Página de signin personalizada con diseño TITAN-PC
- ✅ Manejo de sesiones con NextAuth
- ✅ Responsive design (móvil y desktop)
- ✅ Estados de carga
- ✅ Muestra nombre/email del usuario cuando está logueado

---

## 🔜 Próximos pasos opcionales:

1. **Persistir sesiones en base de datos** (Prisma + PostgreSQL)
2. **Proteger rutas** con middleware de NextAuth
3. **Crear página de perfil** de usuario
4. **Guardar carritos** por usuario en la base de datos
5. **Agregar más providers** (GitHub, Facebook, etc.)

---

## ❓ Solución de problemas:

### Error: "Invalid client"
- Verifica que el `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` sean correctos
- Asegúrate de que no tengan espacios al inicio/final

### Error: "Redirect URI mismatch"
- Verifica que la URI de redirección en Google Cloud Console sea exactamente:
  `http://localhost:3000/api/auth/callback/google`

### El botón no aparece:
- Reinicia el servidor (`npm run dev`)
- Limpia el caché de Next.js: elimina la carpeta `.next` y reinicia

### Error de NEXTAUTH_SECRET:
- Asegúrate de haber generado y agregado el secret en `.env.local`

---

## 📞 ¿Necesitas ayuda?

Si tienes problemas, verifica:
1. Que `.env.local` existe y tiene los valores correctos
2. Que reiniciaste el servidor después de crear `.env.local`
3. Que las URIs de redirección en Google Cloud Console coinciden exactamente
4. Que el proyecto de Google Cloud Console tiene habilitada la API de Google+

---

¡Listo! Tu aplicación TITAN-PC ahora tiene autenticación con Google 🎉

