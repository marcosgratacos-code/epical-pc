# 🔧 Solución Error 400 Google OAuth

## 🐛 Problema
Error 400 de Google al intentar iniciar sesión: "El servidor no puede procesar la solicitud porque su formato es incorrecto"

---

## ✅ Solución

### 1. Verificar Client ID Completo en Google Console

1. Ve a Google Cloud Console: https://console.cloud.google.com
2. APIs & Services → Credentials
3. Click en tu OAuth client
4. Copia el **Client ID COMPLETO**

Debe verse así:
```
1065584455407-hv4mog3aoegihac6k9n9ermrarioi4fg.apps.googleusercontent.com
```

**Nota**: Incluye el número largo al inicio + guión + el resto

---

### 2. Actualizar en Vercel

1. Ve a Vercel Dashboard
2. Tu proyecto → Settings → Environment Variables
3. Click en **editar** (lápiz) en `GOOGLE_CLIENT_ID`
4. Reemplaza con el Client ID COMPLETO de Google Console
5. Guarda

---

### 3. Verificar Variables de Entorno

Asegúrate de que en Vercel tengas exactamente:

```
GOOGLE_CLIENT_ID=1065584455407-hv4mog3aoegihac6k9n9ermrarioi4fg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_URL=https://titan-pc.com
NEXTAUTH_SECRET=m8vTqIcap2SWLBdr7fxhwbFnNH6Gozyk
```

---

### 4. Forzar Nuevo Deployment

Después de actualizar las variables:

1. Ve a Vercel Dashboard → Deployments
2. Click en el último deployment
3. Click en "..." → "Redeploy"
4. Espera 2-3 minutos

---

### 5. Verificar Redirect URIs en Google Console

Asegúrate de que en Google Console estén configuradas:

```
✓ https://titan-pc.com/api/auth/callback/google
✓ https://www.titan-pc.com/api/auth/callback/google
✓ http://localhost:3000/api/auth/callback/google
✓ https://epical-pc-khmf.vercel.app/api/auth/callback/google
```

---

## 🧪 Probar de Nuevo

1. Espera 2-3 minutos después del redeploy
2. Ve a: https://titan-pc.com/auth/signin
3. Click en "Continuar con Google"
4. Debería funcionar ✅

---

## 🔍 Otros Errores Comunes

### Error: "redirect_uri_mismatch"
**Causa**: Redirect URI no coincide
**Solución**: Añade todas las URLs en Google Console

### Error: "invalid_client"
**Causa**: Client Secret incorrecto
**Solución**: Regenera el secret en Google Console y actualiza en Vercel

### Error: "access_denied"
**Causa**: Usuario canceló o no tiene permisos
**Solución**: Normal, intentar de nuevo

---

## 📝 Checklist

- [ ] Client ID completo copiado de Google Console
- [ ] Client ID actualizado en Vercel
- [ ] Client Secret correcto en Vercel
- [ ] NEXTAUTH_URL sin barra final
- [ ] Redirect URIs configuradas en Google
- [ ] Redeploy forzado en Vercel
- [ ] Esperar 2-3 minutos
- [ ] Probar login de nuevo

---

## 🎯 Resumen

El error 400 suele ser por:
1. **Client ID incompleto o incorrecto** ← Más común
2. Redirect URI mal configurada
3. Variables de entorno faltantes

Verifica el Client ID primero y fuerza un redeploy.



