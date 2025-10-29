# 🗄️ Ejecutar Seed en Producción - TITAN-PC

## 🐛 Problema
La página `/productos` no muestra ningún producto porque la base de datos PostgreSQL está vacía.

---

## ✅ Solución Rápida

### Método 1: Endpoint de Seed (Más Fácil)

#### 1. Configurar ADMIN_TOKEN en Vercel

1. Ve a Vercel Dashboard
2. Tu proyecto → Settings → Environment Variables
3. Click "Add New"
4. Añade:
   ```
   Key: ADMIN_TOKEN
   Value: titan-secret-admin-2025
   ```
5. Selecciona "Production"
6. Click "Save"
7. Espera 2 minutos para redeploy automático

#### 2. Ejecutar el Seed

Desde tu terminal local (PowerShell):

```powershell
$headers = @{ Authorization = "Bearer titan-secret-admin-2025" }
Invoke-RestMethod -Uri "https://titan-pc.com/api/seed" -Method POST -Headers $headers
```

Deberías ver:
```json
{
  "success": true,
  "message": "✅ Seed completado",
  "products": 3
}
```

#### 3. Verificar

1. Ve a https://titan-pc.com/productos
2. Deberías ver los 3 productos:
   - TITAN STARTER
   - TITAN ADVANCED
   - TITAN ULTRA

---

### Método 2: Seed Manual Desde Local

Si prefieres conectarte directamente a la base de datos:

#### 1. Obtener DATABASE_URL de Producción

1. Ve a Vercel Dashboard
2. Settings → Environment Variables
3. Copia el valor de `DATABASE_URL`

#### 2. Usar DATABASE_URL Temporalmente

En tu proyecto local, crea un archivo `.env.production.local`:

```env
DATABASE_URL=postgresql://usuario:password@host/database?sslmode=require
```

#### 3. Ejecutar el Seed

```bash
# Usar la conexión de producción
npx dotenv -e .env.production.local -- npx prisma db seed
```

O simplemente:

```bash
# Temporal: actualizar .env.local con DATABASE_URL de producción
# Ejecutar:
npm run prisma:seed

# IMPORTANTE: Restaurar .env.local después
```

#### 4. Restaurar .env.local

Vuelve a poner tu `DATABASE_URL` local:
```env
DATABASE_URL=file:./prisma/dev.db
```

---

## 🎯 Productos que se Insertarán

1. **TITAN STARTER** - €900
   - Intel Core i5-12400F
   - RTX 5060 8GB
   - 16GB DDR5
   - 1TB NVMe

2. **TITAN ADVANCED** - €2,300
   - AMD Ryzen 7 9800X3D
   - RTX 5070 Ti 16GB
   - 32GB DDR5
   - 1TB NVMe

3. **TITAN ULTRA** - €2,800
   - AMD Ryzen 7 9800X3D
   - RTX 5080 16GB
   - 64GB DDR5
   - 2TB NVMe

---

## 🔒 Seguridad

- El endpoint `/api/seed` está protegido con `ADMIN_TOKEN`
- Solo funciona con autorización válida
- Usa `upsert`, así que es seguro ejecutarlo múltiples veces

---

## ✅ Checklist

- [ ] `ADMIN_TOKEN` configurado en Vercel
- [ ] Endpoint ejecutado con curl/PowerShell
- [ ] Productos visibles en `/productos`
- [ ] Home muestra productos destacados
- [ ] Links de "Ver detalles" funcionan

---

## 🧪 Test Final

Después de ejecutar el seed:

1. **Home**: https://titan-pc.com → Debe mostrar productos destacados
2. **Productos**: https://titan-pc.com/productos → Debe mostrar los 3 PCs
3. **Detalle**: https://titan-pc.com/products/titan-starter → Debe mostrar specs
4. **Búsqueda**: Probar filtros en `/productos`

---

¡Listo! Con esto la web estará completamente funcional 🚀



