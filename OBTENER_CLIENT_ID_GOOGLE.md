# 🔐 Cómo Obtener tu Client ID y Client Secret de Google

## Paso 1: Acceder a la Configuración del Cliente

Desde la pantalla que tienes abierta:

1. **Click en "Cliente web 1"** (el nombre con el icono amarillo)
2. Se abrirá la página de configuración del cliente

---

## Paso 2: Copiar el Client ID

En la página de configuración verás:

### **ID de cliente OAuth 2.0**
```
1065584455407-hv4mog3aoegihac6k9n9ermrarioi4fg.apps.googleusercontent.com
```

1. **Click en el icono de copiar** 📋 que está al lado del Client ID
2. O selecciona todo el texto y copia (Ctrl+C)
3. **GUÁRDALO** - Lo necesitarás para Vercel

⚠️ **IMPORTANTE**: Copia el Client ID COMPLETO (desde el número inicial hasta `.apps.googleusercontent.com`)

---

## Paso 3: Obtener el Client Secret

En la misma página, verás:

### **Secreto del cliente**
```
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
```

1. **Si NO lo ves**, click en "Revelar secreto" o "Show secret"
2. **Click en el icono de copiar** 📋
3. **GUÁRDALO** - También lo necesitarás para Vercel

---

## Paso 4: Verificar los Redirect URIs

Scroll down en la misma página y verás una sección:

### **Orígenes JavaScript autorizados**
Deben estar:
```
https://titan-pc.com
https://www.titan-pc.com
http://localhost:3000
```

### **URI de redirección autorizados**
Deben estar:
```
https://titan-pc.com/api/auth/callback/google
https://www.titan-pc.com/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

**Si faltan algunos**, click en "Agregar URI" y añádelos.

---

## Paso 5: Guardar en Vercel

Ahora necesitas añadir estos valores en Vercel:

### 1. Ir a Vercel Dashboard
- Ve a: https://vercel.com/dashboard
- Selecciona tu proyecto "epical-pc" o "titan-pc"

### 2. Configurar Variables de Entorno
1. Click en **Settings** (Configuración)
2. Click en **Environment Variables** (Variables de entorno)
3. Verás tus variables actuales

### 3. Actualizar GOOGLE_CLIENT_ID
1. Busca `GOOGLE_CLIENT_ID`
2. Click en el **icono de lápiz** ✏️ para editar
3. Pega el Client ID completo que copiaste
4. Click **Save**

### 4. Verificar GOOGLE_CLIENT_SECRET
1. Busca `GOOGLE_CLIENT_SECRET`
2. Verifica que tenga el valor correcto
3. Si no coincide, edítalo y pega el correcto
4. Click **Save**

### 5. Verificar NEXTAUTH_URL
1. Busca `NEXTAUTH_URL`
2. Debe ser: `https://titan-pc.com` (SIN barra final /)
3. Si está mal, edítalo

### 6. Verificar NEXTAUTH_SECRET
1. Busca `NEXTAUTH_SECRET`
2. Debe tener un valor largo y aleatorio
3. Si está vacío, genera uno nuevo (más abajo te explico cómo)

---

## Paso 6: Forzar Nuevo Deployment

Después de actualizar las variables:

1. Ve a la pestaña **Deployments**
2. Click en el último deployment
3. Click en los **tres puntos** (...)
4. Click **Redeploy**
5. Espera 2-3 minutos

---

## Paso 7: Probar

1. Ve a: https://titan-pc.com/auth/signin
2. Click en "Continuar con Google"
3. Selecciona tu cuenta de Google
4. ¡Debería funcionar! 🎉

---

## Generar NEXTAUTH_SECRET (si es necesario)

Si necesitas un nuevo `NEXTAUTH_SECRET`, ejecuta en PowerShell:

```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

Esto generará un string aleatorio seguro. Cópialo y pégalo en Vercel.

---

## 📋 Checklist Final

- [ ] Client ID completo copiado de Google Console
- [ ] Client Secret copiado de Google Console
- [ ] Redirect URIs verificadas en Google Console
- [ ] GOOGLE_CLIENT_ID actualizado en Vercel
- [ ] GOOGLE_CLIENT_SECRET actualizado en Vercel
- [ ] NEXTAUTH_URL = `https://titan-pc.com` (sin barra final)
- [ ] NEXTAUTH_SECRET configurado en Vercel
- [ ] Redeploy forzado en Vercel
- [ ] Esperado 2-3 minutos
- [ ] Probado el login

---

## ❓ ¿Necesitas Ayuda?

Si después de seguir estos pasos sigue sin funcionar:
1. Verifica que el Client ID sea COMPLETO (desde el número inicial)
2. Verifica que NO haya espacios al inicio/final de las variables
3. Verifica que todas las Redirect URIs estén en Google Console
4. Fuerza un nuevo redeploy en Vercel

¡Avísame si tienes algún problema! 🚀

