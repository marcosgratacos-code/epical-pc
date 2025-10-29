# 🔑 Configurar Credenciales de Google en TITAN-PC

## ✅ Ya Tienes Configurado:

- ✅ Client ID: `hv4mog3aoegihac6k9n9ermrarioi4fg.apps.googleusercontent.com`
- ✅ Redirect URIs configuradas correctamente
- ✅ Creación: 14 de octubre de 2025

---

## 📝 Siguiente Paso: Obtener/Configurar Client Secret

### Opción A: Si NO tienes el Client Secret Guardado

1. En la pantalla que estás viendo, click en **"Add secret"** (abajo a la derecha)
2. Se generará un nuevo secreto
3. **¡COPIA EL SECRETO INMEDIATAMENTE!** (solo se muestra una vez)
   - Formato: `GOCSPX-xxxxxxxxxxxxxxx`
4. Guarda ese secreto de forma segura

### Opción B: Si YA tienes el Client Secret

Usa el que guardaste anteriormente.

---

## ⚙️ Paso 2: Configurar .env.local

Crea o edita el archivo `.env.local` en la raíz de tu proyecto:

```env
# Google OAuth
GOOGLE_CLIENT_ID=hv4mog3aoegihac6k9n9ermrarioi4fg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-tu-secret-aqui

# NextAuth
NEXTAUTH_SECRET=7YWI8l0xyU+TsmuQTpRnOUHqXVwJ6MmGE5S41nBBaNQ=
NEXTAUTH_URL=http://localhost:3000

# Base de datos (local)
DATABASE_URL=file:./prisma/dev.db

# Stripe (si lo necesitas)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PK=pk_test_...
```

---

## 🧪 Paso 3: Test Local

1. **Reinicia el servidor** (si está corriendo):
   ```bash
   # Ctrl+C para parar
   npm run dev
   ```

2. **Ve a**: http://localhost:3000/auth/signin

3. **Click en** "Continuar con Google"

4. **Inicia sesión** con tu cuenta Google

5. **Deberías ser redirigido** a la página principal con sesión iniciada ✅

---

## 🚀 Paso 4: Configurar en Vercel (Producción)

### 1. Ve a Vercel Dashboard
- Tu proyecto → Settings → Environment Variables

### 2. Añade estas variables:

```env
GOOGLE_CLIENT_ID=hv4mog3aoegihac6k9n9ermrarioi4fg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-tu-secret-aqui
NEXTAUTH_SECRET=7YWI8l0xyU+TsmuQTpRnOUHqXVwJ6MmGE5S41nBBaNQ=
NEXTAUTH_URL=https://tu-dominio-real.vercel.app
```

### 3. Si tienes dominio personalizado:
Añade el redirect URI en Google Console:
- Ve a la configuración del cliente OAuth
- Click en "Agregar URI" en "URIs de redireccionamiento autorizados"
- Añade: `https://titan-pc.com/api/auth/callback/google`
- Click "Guardar"

---

## ✅ Paso 5: Verificar Funcionamiento

### En Local:
1. Login funciona ✅
2. Puedes ver tu sesión en la navbar
3. Puedes acceder a `/perfil`

### En Producción:
1. Después de añadir variables en Vercel
2. Espera 2-3 minutos para el deployment
3. Ve a `https://tu-dominio.vercel.app/auth/signin`
4. Test con Google Sign-In ✅

---

## 🔐 Seguridad

### ✅ Ya Implementado:
- Cookies HttpOnly
- Secret encriptado
- HTTPS en producción

### ⚠️ Importante:
- **NUNCA** subas `.env.local` a GitHub
- Mantén el Client Secret seguro
- Usa credenciales distintas para test/producción si quieres

---

## 🐛 Troubleshooting

### Error: "Configuration"
**Solución**: Verifica que las 4 variables están en `.env.local`

### Error: "redirect_uri_mismatch"
**Solución**: Asegúrate que el URI en Google Console coincide exactamente

### Error: "Client Secret inválido"
**Solución**: Genera uno nuevo con "Add secret"

---

## 📊 Tu Configuración Actual en Google:

- **Client ID**: `hv4mog3aoegihac6k9n9ermrarioi4fg.apps.googleusercontent.com`
- **Estado**: ✅ Activo
- **Última fecha de uso**: 21 de octubre de 2025
- **Redirect URIs**: 
  - ✅ `http://localhost:3000/api/auth/callback/google`
  - ✅ `https://epical-pc-khmf.vercel.app/api/auth/callback/google`

¡Solo falta añadir las variables de entorno! 🎯



