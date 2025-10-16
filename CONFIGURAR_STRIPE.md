# 🚀 Activar el Sistema de Pagos - INSTRUCCIONES RÁPIDAS

## ⚡ Pasos para activar Stripe (5 minutos)

### 1️⃣ Obtén tus claves de Stripe

1. Ve a **https://dashboard.stripe.com/register** y crea una cuenta
2. Una vez dentro, ve a: **Developers → API keys**
   - URL directa: https://dashboard.stripe.com/test/apikeys
3. Verás dos claves de TEST:
   - **Publishable key** (visible) - empieza con `pk_test_...`
   - **Secret key** (haz clic en "Reveal test key") - empieza con `sk_test_...`

### 2️⃣ Configura las variables de entorno

Crea o edita el archivo `.env.local` en la raíz del proyecto:

```bash
# Stripe - Copia tus claves aquí
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...tu_clave_aqui
STRIPE_SECRET_KEY=sk_test_51...tu_clave_aqui

# NextAuth (genera un string aleatorio)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_un_string_muy_largo_y_aleatorio_aqui

# Webhook (opcional para desarrollo - ver paso 3)
# STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
```

**💡 Tip:** Para generar un `NEXTAUTH_SECRET` aleatorio, ejecuta en la terminal:
```bash
openssl rand -base64 32
```

### 3️⃣ Reinicia el servidor

```bash
# Detén el servidor (Ctrl+C) y reinícialo:
npm run dev
```

### 4️⃣ ¡Prueba el sistema!

1. Abre: http://localhost:3000
2. Añade productos al carrito
3. Haz clic en **"Proceder al Pago"**
4. Usa esta tarjeta de prueba:

```
Número de tarjeta: 4242 4242 4242 4242
Fecha: 12/34 (cualquier fecha futura)
CVC: 123 (cualquier 3 dígitos)
Código postal: 28001 (cualquier CP)
```

5. ✅ ¡Deberías ver la página de "Pago Completado"!

---

## 🔧 Webhooks (Opcional - Para desarrollo avanzado)

Los webhooks permiten que Stripe notifique a tu app cuando un pago se completa.

### Opción 1: Stripe CLI (Recomendado para desarrollo)

1. Instala Stripe CLI:
   - **Windows:** `scoop install stripe`
   - **Mac:** `brew install stripe/stripe-cli/stripe`
   - **Linux/Manual:** https://stripe.com/docs/stripe-cli

2. Inicia sesión:
   ```bash
   stripe login
   ```

3. Escucha webhooks:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copia el **webhook signing secret** que aparece (empieza con `whsec_...`)

5. Añádelo a tu `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_el_secret_que_copiaste
   ```

### Opción 2: Configurar en producción (Vercel)

Cuando despliegues a producción:

1. Ve a: https://dashboard.stripe.com/webhooks
2. Haz clic en **"Add endpoint"**
3. URL: `https://tu-dominio.vercel.app/api/webhooks/stripe`
4. Eventos: selecciona `checkout.session.completed` y `payment_intent.succeeded`
5. Copia el **Signing secret**
6. En Vercel, ve a Settings → Environment Variables
7. Añade `STRIPE_WEBHOOK_SECRET` con el valor copiado

---

## 📋 Otras tarjetas de prueba

```
✅ Pago exitoso:
   4242 4242 4242 4242

❌ Pago rechazado:
   4000 0000 0000 0002

🔐 Requiere autenticación 3D Secure:
   4000 0027 6000 3184

💳 Visa débito:
   4000 0566 5566 5556
```

Fecha, CVC y CP pueden ser cualquier valor válido.

---

## 🎯 Características implementadas

✅ Checkout seguro con Stripe  
✅ Soporte para tarjetas de crédito/débito  
✅ Google Pay / Apple Pay (automático)  
✅ Páginas de éxito y cancelación  
✅ Webhooks para confirmar pagos  
✅ Historial de pedidos  
✅ Totalmente responsive  

---

## 🛡️ Modo Producción

Cuando estés listo para recibir pagos reales:

1. Completa la activación de tu cuenta en Stripe
2. En el Dashboard, cambia de "Test mode" a "Live mode"
3. Copia las claves de PRODUCCIÓN (empiezan con `pk_live_` y `sk_live_`)
4. Actualiza las variables de entorno en tu hosting
5. **¡IMPORTANTE!** NUNCA subas las claves de producción a GitHub

---

## ❓ Problemas comunes

**Error: "No API key provided"**
→ Asegúrate de que el archivo `.env.local` existe y tiene las claves correctas
→ Reinicia el servidor después de cambiar `.env.local`

**Error: "Invalid API Key"**
→ Verifica que copiaste la clave completa sin espacios
→ Usa las claves de TEST (empiezan con `pk_test_` y `sk_test_`)

**No redirige a Stripe**
→ Abre la consola del navegador (F12) para ver errores
→ Verifica que `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` esté correcta

**Webhook no funciona**
→ Asegúrate de que Stripe CLI esté corriendo
→ Verifica que `STRIPE_WEBHOOK_SECRET` esté en `.env.local`

---

## 📞 Soporte

- **Documentación Stripe:** https://stripe.com/docs
- **Dashboard Stripe:** https://dashboard.stripe.com
- **Tarjetas de prueba:** https://stripe.com/docs/testing

---

**¡Listo!** 🎉 Ahora tienes un sistema de pagos profesional funcionando.

