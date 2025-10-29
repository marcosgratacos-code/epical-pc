# 🔐 Configurar Google Sign-In en TITAN-PC

## ✅ Configuración Actual

Tu aplicación ya tiene NextAuth configurado con Google Provider. Solo necesitas añadir las credenciales.

---

## 📋 Paso 1: Obtener Credenciales de Google

### 1️⃣ Ve a Google Cloud Console
- URL: https://console.cloud.google.com
- Inicia sesión con tu cuenta de Google

### 2️⃣ Crear un Proyecto (si no tienes uno)
- Click en "Select a project" (arriba a la izquierda)
- "New Project"
- Nombre: "TITAN-PC"
- Click "Create"

### 3️⃣ Habilitar Google+ API
1. En el menú lateral → "APIs & Services" → "Library"
2. Busca: "Google+ API"
3. Click en "Enable"

### 4️⃣ Configurar OAuth Consent Screen
1. Ve a "APIs & Services" → "OAuth consent screen"
2. Selecciona "External" → Click "Create"
3. Completar formulario:
   - **App name**: TITAN-PC
   - **User support email**: tu-email@gmail.com
   - **Developer contact**: tu-email@gmail.com
4. Click "Save and Continue"
5. En "Scopes" → Click "Add or Remove Scopes"
   - Selecciona: `.../auth/userinfo.email`
   - Selecciona: `.../auth/userinfo.profile`
   - Click "Update" → "Save and Continue"
6. En "Test users" (opcional) → Click "Save and Continue"
7. Click "Back to Dashboard"

### 5️⃣ Crear Credenciales OAuth 2.0
1. Ve a "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: "TITAN-PC Web Client"
5. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://titan-pc.com
   https://tu-proyecto.vercel.app
   ```
6. **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   https://titan-pc.com/api/auth/callback/google
   https://tu-proyecto.vercel.app/api/auth/callback/google
   ```
7. Click "Create"
8. **¡Copia las credenciales!**
   - Client ID: `xxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com`
   - Client Secret: `GOCSPX-xxxxxxxxxxxxxxx`

---

## 📝 Paso 2: Añadir Variables de Entorno

### En Local (.env.local):
```env
GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxx
NEXTAUTH_SECRET=tu-secret-generado
NEXTAUTH_URL=http://localhost:3000
```

### En Producción (Vercel):
1. Ve a Vercel Dashboard
2. Tu proyecto → "Settings" → "Environment Variables"
3. Añade estas variables:
   ```
   GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxx
   NEXTAUTH_SECRET=<mismo que en local>
   NEXTAUTH_URL=https://titan-pc.com
   ```

---

## ✅ Paso 3: Test Local

1. Inicia el servidor:
   ```bash
   npm run dev
   ```

2. Ve a: http://localhost:3000/auth/signin

3. Click en "Continuar con Google"

4. Inicia sesión con tu cuenta Google

5. Deberías ser redirigido de vuelta a la página principal

---

## 🚀 Paso 4: Deploy en Producción

### 1. Añadir Redirect URI en Producción
Cuando tengas tu URL de producción final (ej: `https://titan-pc.com`):

1. Ve a Google Cloud Console
2. "APIs & Services" → "Credentials"
3. Click en tu OAuth client
4. **Añade a "Authorized redirect URIs"**:
   ```
   https://titan-pc.com/api/auth/callback/google
   ```
5. Click "Save"

### 2. Actualizar Variables en Vercel
Asegúrate de que `NEXTAUTH_URL` en Vercel apunta a tu dominio real:
```
NEXTAUTH_URL=https://titan-pc.com
```

---

## 🎯 Cómo Funciona

### Flujo de Autenticación:
1. Usuario click en "Continuar con Google"
2. Redirige a Google para login
3. Usuario autoriza
4. Google redirige de vuelta a `/api/auth/callback/google`
5. NextAuth crea sesión
6. Usuario está autenticado ✅

### Roles de Usuario:
El sistema asigna roles automáticamente:

**Admin** (acceso a `/admin`):
- `marcosgratacos@gmail.com`
- `admin@epical-pc.com`

**User** (acceso normal):
- Cualquier otro email de Google

---

## 🔧 Troubleshooting

### Error: "Configuration"
**Causa**: Variables de entorno no configuradas
**Solución**: Verifica que `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` están en `.env.local` y Vercel

### Error: "redirect_uri_mismatch"
**Causa**: Redirect URI no coincide con Google Console
**Solución**: Añade `https://titan-pc.com/api/auth/callback/google` a Google Console

### Error: "access_denied"
**Causa**: Usuario canceló en Google
**Solución**: Normal, el usuario puede intentar de nuevo

### No redirige después de login
**Causa**: `NEXTAUTH_URL` incorrecto
**Solución**: Verifica que apunta a tu dominio real

---

## 📊 Testing

### Test 1: Login con Admin
1. Inicia sesión con `marcosgratacos@gmail.com`
2. Verifica que puedes acceder a `/admin`
3. Deberías ver tu email en la sesión

### Test 2: Login con Usuario Normal
1. Inicia sesión con otro email
2. No deberías poder acceder a `/admin`
3. Carrito y favoritos deberían funcionar

### Test 3: Sesión Persistente
1. Inicia sesión
2. Cierra el navegador
3. Abre de nuevo
4. Deberías seguir autenticado

---

## 🔒 Seguridad

### ✅ Implementado:
- HTTPS requerido en producción
- Cookies HttpOnly y Secure
- CSRF protection
- Secret rotado en cada deploy

### Recomendaciones:
1. Rota `NEXTAUTH_SECRET` periódicamente
2. Mantén la lista de admin emails actualizada
3. Revisa logs en Google Console

---

## 📚 Archivos Relacionados

- `src/app/api/auth/[...nextauth]/route.ts` - Configuración NextAuth
- `src/app/auth/signin/page.tsx` - Página de login
- `src/app/components/SiteHeader.tsx` - Botón de login en navbar

---

## ✅ Checklist Final

- [ ] Credenciales de Google creadas
- [ ] Variables añadidas en `.env.local`
- [ ] Variables añadidas en Vercel
- [ ] Redirect URIs configuradas en Google Console
- [ ] Test local funciona
- [ ] Deploy a producción
- [ ] Test en producción funciona
- [ ] Admin puede acceder a `/admin`
- [ ] Usuarios normales funcionan

---

¡Listo! Con esto tendrás Google Sign-In funcionando en TITAN-PC 🚀



