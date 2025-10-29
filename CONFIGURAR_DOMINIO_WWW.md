# 🌐 Configurar www y sin www en Google OAuth

## 📝 Añadir AMBAS URLs en Google Console

En el campo vacío actual, añade **DOS URLs**:

### Click en "+ Agregar URI" una vez más para tener 4 campos

**Total de 4 URIs necesarias:**

1. ✅ **Producción temporal (Vercel)**:
   ```
   https://epical-pc-khmf.vercel.app/api/auth/callback/google
   ```

2. ✅ **Desarrollo local**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```

3. ⬅️ **Producción sin www** (nueva):
   ```
   https://titan-pc.com/api/auth/callback/google
   ```

4. ⬅️ **Producción con www** (nueva):
   ```
   https://www.titan-pc.com/api/auth/callback/google
   ```

---

## ✅ Después de Añadir en Google Console

1. **Guarda** en Google Console
2. Espera 5-10 minutos para propagación

---

## 🔧 Configurar en Vercel También

Vercel maneja automáticamente ambos dominios (`titan-pc.com` y `www.titan-pc.com`), PERO necesitas configurar una redirección.

### En Vercel Dashboard:

1. Ve a **Settings** → **Domains**
2. Verifica que ambos están conectados:
   - `titan-pc.com` ✅
   - `www.titan-pc.com` ✅

3. (Opcional) Configura redirect para forzar un dominio:
   - Ve a **Settings** → **Domains** → "Add"
   - Si quieres que `www.titan-pc.com` redirija a `titan-pc.com`, puedes configurarlo

---

## ⚙️ NextAuth URL

En Vercel, actualiza `NEXTAUTH_URL`:

### Opción A: Solo principal (sin www)
```
NEXTAUTH_URL=https://titan-pc.com
```

### Opción B: Configurar para ambos
NextAuth automáticamente maneja ambos si la configuración está bien.

**Recomendación**: Usa solo **sin www**:
```
NEXTAUTH_URL=https://titan-pc.com
```

Y configura redirect en Vercel para que `www` redirija a `titan-pc.com`.

---

## 📋 Checklist Final

- [ ] Añadir `https://titan-pc.com/api/auth/callback/google` en Google Console
- [ ] Añadir `https://www.titan-pc.com/api/auth/callback/google` en Google Console
- [ ] Guardar cambios en Google Console
- [ ] Verificar dominios en Vercel
- [ ] Configurar redirect (opcional) para unificar dominio
- [ ] Probar login con `https://titan-pc.com`
- [ ] Probar login con `https://www.titan-pc.com`

---

## 🎯 Resumen

**Lo que necesitas hacer AHORA:**

1. En Google Console:
   - Añade: `https://titan-pc.com/api/auth/callback/google`
   - Click "+ Agregar URI"
   - Añade: `https://www.titan-pc.com/api/auth/callback/google`
   - Click "Guardar"

2. Listo ✅

Esto cubrirá todos los casos:
- ✅ `https://titan-pc.com` → Funciona
- ✅ `https://www.titan-pc.com` → Funciona
- ✅ `http://localhost:3000` → Funciona
- ✅ URL temporal de Vercel → Funciona



