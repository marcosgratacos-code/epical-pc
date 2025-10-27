# 🚀 Deploy TITAN-PC en Vercel

## ✅ Código Subido a GitHub

Tu código ya está en GitHub: https://github.com/marcosgratacos-code/epical-pc

---

## 📋 Paso a Paso para Deploy en Vercel

### 1️⃣ Conectar Repositorio en Vercel

1. **Ve a Vercel**: https://vercel.com
2. **Inicia sesión** con GitHub
3. **Click en "Add New Project"**
4. **Importa** el repositorio `epical-pc` (marcosgratacos-code/epical-pc)
5. **Vercel detectará Next.js automáticamente**

### 2️⃣ Configurar Variables de Entorno

**IMPORTANTE**: Añade estas variables en la pantalla de configuración antes de hacer Deploy:

#### **Seguridad**
```
ADMIN_TOKEN=<generar nuevo>
ADMIN_IP_ALLOWLIST=tu-ip-publica
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
```

#### **Base de Datos**
```
DATABASE_URL=<necesitas crear base de datos>
```

**Opciones para BD en Vercel**:
- **Opción 1**: Vercel Postgres (recomendado)
  - Click en "Storage" → "Create Database"
  - Selecciona "Postgres"
  - Copia la `POSTGRES_PRISMA_URL`
  - **IMPORTANTE**: Actualiza `prisma/schema.prisma` (cambiar `provider = "sqlite"` a `provider = "postgresql"`)

- **Opción 2**: Neon (neon.tech)
  - Crear cuenta gratuita
  - Crear proyecto
  - Copiar connection string

- **Opción 3**: Supabase (supabase.com)
  - Crear proyecto
  - Copiar connection string

#### **Stripe**
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PK=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Para obtener las keys de Stripe**:
1. Ve a https://dashboard.stripe.com
2. Cambia a modo "Live" (producción)
3. Ve a "Developers" → "API Keys"
4. Copia "Secret key" y "Publishable key"
5. Para webhook:
   - Ve a "Developers" → "Webhooks"
   - Añade endpoint: `https://tu-proyecto.vercel.app/api/webhooks/stripe`
   - Copia el "Signing secret" (`whsec_...`)

#### **Resend (Emails)**
```
RESEND_API_KEY=re_...
RESEND_FROM=noreply@titan-pc.com
ADMIN_EMAIL=soporte@titan-pc.com
```

#### **NextAuth**
```
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=<generar con: openssl rand -base64 32>
```

#### **Upstash (Rate Limiting - Opcional)**
```
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### 3️⃣ Configurar Build Settings

En la pantalla de configuración de Vercel, verifica:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (debería detectarse automáticamente)
- **Build Command**: `npm run build` (por defecto)
- **Install Command**: `npm install` (por defecto)
- **Output Directory**: `.next` (por defecto)

### 4️⃣ Deploy

1. **Click en "Deploy"**
2. **Espera el build** (~2-3 minutos)
3. **Vercel te dará una URL**: `https://tu-proyecto.vercel.app`

---

## 🔧 Post-Deployment

### 1. Actualizar Schema de Prisma (Si usas Postgres)

Si elegiste Vercel Postgres o Neon, actualiza el schema:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"  // Cambiar de "sqlite" a "postgresql"
  url      = env("DATABASE_URL")
}
```

Luego crea migración:
```bash
npx prisma migrate dev --name init_postgres
```

Y haz push de los cambios.

### 2. Seedear Base de Datos

**Opción 1 - Via Vercel CLI** (recomendado):
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Ejecutar seed en producción
vercel env pull .env.production
npx prisma db push
npm run prisma:seed
```

**Opción 2 - Via Admin Panel**:
- Ve a `/admin/seed` en tu deploy
- Click en "Seed Products"
- Esto creará los 3 productos de ejemplo

### 3. Verificar Webhook de Stripe

1. Ve a Stripe Dashboard → Webhooks
2. Verifica que el endpoint está activo: `https://tu-proyecto.vercel.app/api/webhooks/stripe`
3. Test del webhook:
   ```bash
   stripe trigger checkout.session.completed
   ```

### 4. Test del Checkout

1. Visita: https://tu-proyecto.vercel.app
2. Ve a productos
3. Añade al carrito
4. Proceso de checkout
5. Usa tarjeta test: `4242 4242 4242 4242`

---

## 📊 URLs Importantes

Después del deploy tendrás:

- **Producción**: `https://tu-proyecto.vercel.app`
- **Admin**: `https://tu-proyecto.vercel.app/admin`
- **API Health**: `https://tu-proyecto.vercel.app/api/health`

---

## 🐛 Troubleshooting

### Error: "Could not find a production build"

**Solución**: Asegúrate que `package.json` tiene el script `build`:
```json
"scripts": {
  "build": "next build"
}
```

### Error: "Prisma Client not generated"

**Solución**: Añade al `package.json`:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Error: "Module not found"

**Solución**: Verifica que todos los archivos están commitados y pusheados a GitHub.

### Webhook no funciona

**Solución**: 
1. Verifica que `STRIPE_WEBHOOK_SECRET` está correcto en Vercel
2. Verifica que el endpoint está configurado en Stripe Dashboard
3. Revisa logs en Vercel Dashboard → Functions → `/api/webhooks/stripe`

### Emails no llegan

**Solución**:
1. Verifica que `RESEND_API_KEY` está configurado
2. Revisa logs en Resend Dashboard
3. Verifica spam/junk
4. Si usas dominio de prueba, solo puedes enviar a tu email verificado

---

## 📝 Checklist de Deployment

- [ ] Código pusheado a GitHub
- [ ] Vercel conectado al repo
- [ ] Variables de entorno configuradas
- [ ] Base de datos creada (Postgres/Neon/Supabase)
- [ ] Schema actualizado a Postgres (si necesario)
- [ ] Stripe configurado (Live mode)
- [ ] Webhook de Stripe activo
- [ ] Resend configurado (opcional)
- [ ] Deploy exitoso
- [ ] Database seedeada
- [ ] Test de checkout funcionando
- [ ] Webhook procesando pedidos
- [ ] Emails llegando (si configurado)

---

## 🎉 ¡Deploy Completado!

Tu ecommerce TITAN-PC está en producción en Vercel.

**URLs**:
- 🌐 **Sitio**: https://tu-proyecto.vercel.app
- 🔐 **Admin**: https://tu-proyecto.vercel.app/admin
- 📧 **Email**: Configurado con Resend
- 💳 **Pagos**: Configurados con Stripe Live

---

## 🚨 Seguridad en Producción

**NO OLVIDES**:
1. Cambiar `ADMIN_TOKEN` a uno nuevo y seguro
2. Configurar `ADMIN_IP_ALLOWLIST` con tu IP pública
3. Usar claves de Stripe **Live** (no test)
4. Verificar dominio en Resend
5. Activar HTTPS (Vercel lo hace automáticamente)
6. Revisar logs regularmente

---

## 📚 Recursos Útiles

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Resend Dashboard**: https://resend.com/emails
- **Upstash Console**: https://console.upstash.com
- **Vercel CLI**: `npm i -g vercel`

¡Listo para vender! 🚀

