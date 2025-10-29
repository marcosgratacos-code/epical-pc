# 🗄️ Poblar Base de Datos en Producción

## Problema
Los productos desaparecieron porque la base de datos PostgreSQL en Vercel está vacía.

---

## ✅ Solución: Endpoint de Seed Seguro

He creado un endpoint protegido para poblar la base de datos en producción.

---

## 📝 Pasos para Poblar la Base de Datos

### 1. Asegúrate de que `ADMIN_TOKEN` está en Vercel

En Vercel Dashboard → Environment Variables, verifica que existe:
```
ADMIN_TOKEN=tu-token-secreto
```

Si no existe, añádelo (genera uno seguro).

---

### 2. Hacer Deploy del Nuevo Endpoint

```bash
git add src/app/api/seed/route.ts
git commit -m "feat: add secure seed endpoint for production"
git push
```

Espera 2-3 minutos para el deployment.

---

### 3. Ejecutar el Seed en Producción

Desde tu terminal local, ejecuta:

```bash
curl -X POST https://titan-pc.com/api/seed \
  -H "Authorization: Bearer TU_ADMIN_TOKEN_AQUI"
```

O usa PowerShell:
```powershell
$headers = @{ Authorization = "Bearer TU_ADMIN_TOKEN_AQUI" }
Invoke-RestMethod -Uri "https://titan-pc.com/api/seed" -Method POST -Headers $headers
```

Reemplaza `TU_ADMIN_TOKEN_AQUI` con el valor de `ADMIN_TOKEN` en Vercel.

---

### 4. Verificar

1. Ve a: https://titan-pc.com/productos
2. Deberías ver los 3 productos:
   - TITAN STARTER
   - TITAN ADVANCED
   - TITAN ULTRA

---

## 🔒 Seguridad

- El endpoint está protegido con `ADMIN_TOKEN`
- Solo puede ejecutarse con autorización válida
- Se puede ejecutar múltiples veces (usa `upsert`)

---

## ⚡ Alternativa Rápida (sin deploy)

Si no quieres esperar el deployment, puedes:

### Opción A: Conectarte a la BD de producción desde local

1. En Vercel, copia el `DATABASE_URL` de producción
2. Temporalmente, añádelo a tu `.env.local`:
   ```
   DATABASE_URL=postgresql://user:pass@host/db
   ```
3. Ejecuta:
   ```bash
   npm run prisma:seed
   ```
4. Restaura tu `DATABASE_URL` local después

---

## 📊 Productos que se Insertarán

1. **TITAN STARTER** - €900
   - Intel Core i5-12400F
   - RTX 5060 8GB
   - 16GB DDR5

2. **TITAN ADVANCED** - €2,300
   - AMD Ryzen 7 9800X3D
   - RTX 5070 Ti 16GB
   - 32GB DDR5

3. **TITAN ULTRA** - €2,800
   - AMD Ryzen 7 9800X3D
   - RTX 5080 16GB
   - 64GB DDR5

---

## ✅ Checklist

- [ ] `ADMIN_TOKEN` existe en Vercel
- [ ] Push del endpoint de seed
- [ ] Deployment completado
- [ ] Ejecutar seed con curl/Invoke-RestMethod
- [ ] Verificar productos en `/productos`
- [ ] Login con Google funciona
- [ ] Todo listo ✨



