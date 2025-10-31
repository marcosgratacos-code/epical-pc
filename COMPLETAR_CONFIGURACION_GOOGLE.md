# ✅ Completar Configuración de Google OAuth

## 📋 Estado Actual

✅ **Client ID visible**: `1065584455407-hv4mog3aoegihac6k9n9ermrarioi4fg.apps.googleusercontent.com`
✅ **Redirect URIs configurados**: 4 URIs correctas
⚠️ **Orígenes JavaScript**: FALTAN (muy importante)
⚠️ **Client Secret**: Enmascarado (no se puede ver)

---

## 🔧 Paso 1: Añadir Orígenes JavaScript Autorizados

En la columna izquierda, en la sección **"Orígenes autorizados de JavaScript"**:

1. Click en el botón **"+ Agregar URI"**
2. Añade estas URLs (una por una):

```
https://titan-pc.com
```

Click **"+ Agregar URI"** de nuevo:

```
https://www.titan-pc.com
```

Click **"+ Agregar URI"** de nuevo:

```
http://localhost:3000
```

Click **"+ Agregar URI"** de nuevo:

```
https://epical-pc-khmf.vercel.app
```

**Resultado final** debería tener 4 orígenes JavaScript:
- ✅ `https://titan-pc.com`
- ✅ `https://www.titan-pc.com`
- ✅ `http://localhost:3000`
- ✅ `https://epical-pc-khmf.vercel.app`

---

## 🔐 Paso 2: Verificar o Regenerar Client Secret

### Opción A: Si Ya Tienes el Secret Guardado

Si ya tienes el `GOOGLE_CLIENT_SECRET` guardado en Vercel o en algún lugar seguro, **úsalo**. No necesitas verlo aquí.

### Opción B: Si No Recuerdas el Secret

Si no tienes el Client Secret guardado:

1. En la columna derecha, en la sección **"Secretos del cliente"**
2. Verás el secreto actual marcado como `****NHrG`
3. **IMPORTANTE**: Google ya NO permite ver los secrets antiguos
4. Tienes dos opciones:

   **Opción B.1: Crear un nuevo secret**
   - Click en **"Agregar secreto"** o **"+ Add secret"**
   - Esto creará un nuevo secret
   - **Copia el nuevo secret inmediatamente** (solo lo verás una vez)
   - Actualiza el valor en Vercel

   **Opción B.2: Usar el secret existente**
   - Si ya está en Vercel funcionando, **NO lo toques**
   - Solo asegúrate de que esté guardado correctamente

---

## 📝 Paso 3: Copiar Valores para Vercel

### Client ID (ya lo tienes):
```
1065584455407-hv4mog3aoegihac6k9n9ermrarioi4fg.apps.googleusercontent.com
```

### Client Secret:
- Si vas a crear uno nuevo, cópialo cuando lo generes
- Si ya lo tienes en Vercel, déjalo como está

---

## ✅ Paso 4: Guardar Cambios en Google Console

1. Scroll hasta el final de la página
2. Click en **"Guardar"** o **"Save"**
3. Espera unos segundos a que se confirme

---

## 🔍 Paso 5: Verificar Configuración Completa

Tu configuración debería verse así:

### Orígenes JavaScript autorizados:
- ✅ `https://titan-pc.com`
- ✅ `https://www.titan-pc.com`
- ✅ `http://localhost:3000`
- ✅ `https://epical-pc-khmf.vercel.app`

### URIs de redireccionamiento autorizados:
- ✅ `https://epical-pc-khmf.vercel.app/api/auth/callback/google`
- ✅ `http://localhost:3000/api/auth/callback/google`
- ✅ `https://titan-pc.com/api/auth/callback/google`
- ✅ `https://www.titan-pc.com/api/auth/callback/google`

---

## 🚀 Paso 6: Verificar en Vercel

1. Ve a Vercel Dashboard → Tu proyecto → Settings → Environment Variables
2. Verifica que tengas:

```
GOOGLE_CLIENT_ID=1065584455407-hv4mog3aoegihac6k9n9ermrarioi4fg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx (el que tengas guardado)
NEXTAUTH_URL=https://titan-pc.com
NEXTAUTH_SECRET=xxxxx (debe tener valor)
```

---

## 🧪 Paso 7: Probar

1. Espera 2-3 minutos después de guardar en Google Console
2. Ve a: https://titan-pc.com/auth/signin
3. Click en "Continuar con Google"
4. Debería funcionar correctamente ✅

---

## ⚠️ Notas Importantes

1. **Los orígenes JavaScript son OBLIGATORIOS** - Sin ellos, el login puede fallar
2. **El Client Secret no se puede ver** una vez creado - Solo puedes crear uno nuevo
3. **Si creas un nuevo secret**, actualiza inmediatamente en Vercel
4. **Espera 2-3 minutos** después de cambios en Google Console para que se propaguen

---

## ❓ ¿Necesitas Ayuda?

Si después de añadir los orígenes JavaScript sigue sin funcionar:
1. Verifica que guardaste los cambios en Google Console
2. Verifica que las URLs en Vercel son correctas
3. Fuerza un redeploy en Vercel
4. Espera 3-5 minutos y prueba de nuevo

¡Avísame si tienes algún problema! 🚀

