# 🔧 Solucionar los 3 Errores en Vercel

## ❌ Error 1: SQLite no compatible con Vercel

**Problema**: `provider = "sqlite"` no funciona en producción serverless

**Solución**: Usar Postgres

### Opción A: Vercel Postgres (MÁS FÁCIL)

1. **Ve a Vercel Dashboard**
2. **Storage → Create Database → Postgres**
3. **Copia la URL** que te dan (tipo: `postgres://...`)
4. **Añade a Environment Variables** en Vercel:
   ```
   DATABASE_URL=<la-url-que-copiaste>
   ```

### Opción B: Cambiar a Postgres en Código

Si quieres usar Postgres también localmente:

1. **Instala Postgres localmente** (pgAdmin, Docker, etc.) O usa [Neon](https://neon.tech)

2. **Cambia prisma/schema.prisma**:
```prisma
datasource db {
  provider = "postgresql"  // CAMBIAR DE "sqlite" A ESTO
  url      = env("DATABASE_URL")
}
```

3. **Actualiza .env.local**:
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/titanpc
```

4. **Crea migración**:
```bash
npx prisma migrate dev --name migrate_to_postgres
```

---

## ❌ Error 2: Prisma Client no se genera en build

**Problema**: Vercel no genera Prisma Client automáticamente

**Solución**: Añadir `postinstall` script ✅

Ya lo añadí al `package.json`:
```json
"postinstall": "prisma generate"
```

También actualicé el script de build:
```json
"build": "prisma generate && next build --turbopack"
```

---

## ❌ Error 3: Migraciones no aplicadas

**Problema**: La base de datos no tiene las tablas

**Solución**: Ejecutar migraciones en producción

### Si usas Vercel Postgres:

1. En Vercel Dashboard, ve a tu proyecto
2. Settings → Environment Variables
3. Añade una variable temporal para ejecutar comandos:
   
   Copia este script en tu `.env` local:
   ```bash
   # Obtener variables de producción
   vercel env pull .env.production
   
   # Aplicar migraciones
   npx prisma migrate deploy
   
   # Seedear productos
   npm run prisma:seed
   ```

### Si usas Neon/Supabase:

Ejecuta en tu terminal:

```bash
# Conectar a la base de datos de producción
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Seedear
npm run prisma:seed
```

---

## 📋 Pasos para Solucionar TODO (5 minutos)

### 1. En Vercel Dashboard:

1. Ve a **Settings → Environment Variables**
2. Asegúrate de tener:
   ```
   DATABASE_URL=postgres://...  (de Vercel Postgres o Neon)
   NEXTAUTH_URL=https://titan-pc.com
   NEXTAUTH_SECRET=<tu-secret>
   ```

### 2. Localmente:

```bash
# Commit y push los cambios
git add package.json
git commit -m "fix: add postinstall script and update build"
git push
```

### 3. En Vercel:

1. Ve a **Deployments**
2. Espera que el nuevo deployment se complete (~2 min)
3. Verifica que el error rate baja

### 4. (Opcional) Ejecutar migraciones manualmente:

```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Login
vercel login

# Pull env vars de producción
vercel env pull .env.production

# Aplicar migraciones
npx prisma migrate deploy

# Seedear
npm run prisma:seed
```

---

## ✅ Resultado Esperado

Después de estos pasos:
- ✅ Build exitoso
- ✅ Error rate: 0%
- ✅ Todas las APIs funcionando
- ✅ Productos seedeados
- ✅ Base de datos conectada

---

## 🚨 Si Persisten Errores

Comparte:
1. Screenshot de "Runtime Logs" (los errores específicos)
2. Verificar que `DATABASE_URL` está configurada en Vercel

**MUY IMPORTANTE**: Asegúrate de que `DATABASE_URL` apunta a Postgres, NO a SQLite.

