# 🔧 Configuración de Stripe y Resend para TITAN-PC

## 1️⃣ Variables de Entorno Requeridas

Añade estas variables en `.env.local` y en tu panel de Vercel:

### Stripe
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PK=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Resend (Opcional pero recomendado)
```
RESEND_API_KEY=re_...
RESEND_FROM=noreply@titan-pc.com
```

### Base de Datos
```
DATABASE_URL=file:./dev.db
```

### NextAuth
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secreto-super-seguro
```

### Google Auth (Opcional)
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## 2️⃣ Configurar Stripe

### En Local (modo test):

1. **Obtén tus claves en**: https://dashboard.stripe.com/test/apikeys
   - Secret Key → `STRIPE_SECRET_KEY`
   - Publishable Key → `NEXT_PUBLIC_STRIPE_PK`

2. **Instala Stripe CLI** (para webhooks locales):
   ```bash
   # Windows (con Chocolatey)
   choco install stripe
   
   # macOS
   brew install stripe/stripe-cli/stripe
   ```

3. **Inicia el webhook localmente**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   
   Esto te dará un `whsec_...` que debes usar como `STRIPE_WEBHOOK_SECRET`.

### En Producción (Vercel):

1. Ve a tu Dashboard de Stripe → Desarrolladores → Webhooks
2. Añade endpoint: `https://tu-dominio.com/api/webhooks/stripe`
3. Selecciona eventos:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copia el Secret (`whsec_...`) y añádelo como `STRIPE_WEBHOOK_SECRET` en Vercel

## 3️⃣ Configurar Resend (Emails)

1. **Crea cuenta en**: https://resend.com
2. Obtén tu API Key en el dashboard
3. Verifica tu dominio (si quieres usar tu propio dominio)
4. Añade `RESEND_API_KEY` y `RESEND_FROM` en .env

### Test Email (sin verificar dominio)

Si solo quieres probar, usa el dominio de prueba:
```
RESEND_FROM=onboarding@resend.dev
```

**Nota**: Solo podrás enviar a tu email de cuenta hasta verificar el dominio.

## 4️⃣ Pruebas de Checkout

### Tarjetas de prueba:

- ✅ **Pago exitoso**: `4242 4242 4242 4242`
- ❌ **Pago rechazado**: `4000 0000 0000 0002`
- 💳 **Requiere autenticación 3D Secure**: `4000 0025 0000 3155`

**Datos de prueba**:
- CVV: cualquier 3 dígitos
- Fecha: cualquier fecha futura
- Código postal: cualquier 5 dígitos

## 5️⃣ Deployment en Vercel

### Pasos:

1. **Push a GitHub**:
   ```bash
   git add .
   git commit -m "feat: MVP funcional con Stripe + Resend"
   git push
   ```

2. **Conecta en Vercel**:
   - Ve a https://vercel.com
   - Importa tu repo
   - Vercel detectará automáticamente Next.js

3. **Añade Variables de Entorno** en Project Settings:
   ```
   DATABASE_URL=file:./dev.db
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PK=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   RESEND_API_KEY=re_...
   RESEND_FROM=noreply@titan-pc.com
   NEXTAUTH_URL=https://tu-dominio.vercel.app
   NEXTAUTH_SECRET=genera-con-openssl-rand-base64-32
   ```

4. **Base de Datos**:
   - Vercel usa SQLite por defecto (dev.db)
   - Para producción, considera usar Postgres o MySQL
   - Puedes usar Vercel Postgres o supabase.com

5. **Deploy**:
   ```bash
   vercel --prod
   ```

## 6️⃣ Migración de Base de Datos

Si usas Postgres en producción:

```bash
# Actualizar schema.prisma
# Cambiar provider a "postgresql"

# Crear nueva migración
npx prisma migrate dev --name production_schema

# Generar client
npx prisma generate

# Aplicar en Vercel (via script de build)
```

## 7️⃣ Checklist Final

- [ ] Stripe configurado (test + producción)
- [ ] Resend configurado
- [ ] Webhook funcionando
- [ ] Emails de confirmación llegan
- [ ] Base de datos con productos
- [ ] Carrito persiste correctamente
- [ ] Checkout redirige a Stripe
- [ ] Pagos se procesan correctamente
- [ ] Admin panel accesible
- [ ] Productos se crean desde admin

## 8️⃣ Comandos Útiles

```bash
# Seedear productos
npm run prisma:seed

# Generar Prisma Client
npm run prisma:generate

# Migraciones
npm run prisma:migrate

# Test local
npm run dev

# Build de producción
npm run build

# Ver logs de Stripe (webhook)
stripe logs tail
```

## 9️⃣ Troubleshooting

### Webhook no funciona:

```bash
# Verificar firma del webhook
stripe listen --print-secret

# Test manual
stripe trigger checkout.session.completed
```

### Emails no llegan:

1. Verifica `RESEND_API_KEY` está correcto
2. Comprueba logs en dashboard de Resend
3. Verifica spam/junk
4. Usa `onboarding@resend.dev` para test rápido

### Carrito no persiste:

1. Verifica que `titanpc_cart_v1` existe en localStorage
2. Revisa console de navegador
3. Verifica que zustand persist está configurado

---

✅ **¡Listo para funcionar!** Tu ecommerce está completamente funcional.

