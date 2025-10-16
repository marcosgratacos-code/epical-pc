# 💳 Configuración del Sistema de Pago con Stripe

## 📋 Pasos para activar los pagos

### 1️⃣ Crear cuenta en Stripe

1. Ve a [https://stripe.com](https://stripe.com)
2. Haz clic en "Start now" o "Crear cuenta"
3. Completa el registro con tu email

### 2️⃣ Obtener las claves API

1. Accede a tu Dashboard de Stripe
2. Ve a **Developers → API Keys**: [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
3. Verás dos claves:
   - **Publishable key** (empieza con `pk_test_...`)
   - **Secret key** (empieza con `sk_test_...`) - ¡Haz clic en "Reveal test key"!

### 3️⃣ Configurar las variables de entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza los valores:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_PUBLICA_AQUI
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_SECRETA_AQUI
```

3. **¡IMPORTANTE!** Reinicia el servidor de desarrollo después de cambiar el `.env.local`:
   - Presiona `Ctrl+C` en la terminal
   - Ejecuta `npm run dev` nuevamente

### 4️⃣ Configurar Webhooks (Opcional pero recomendado)

Los webhooks permiten que Stripe te notifique cuando un pago se completa.

#### Opción A: Stripe CLI (Desarrollo local - Recomendado)

1. Instala Stripe CLI:
   - Windows: `scoop install stripe`
   - Mac: `brew install stripe/stripe-cli/stripe`
   - O descarga desde: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. Inicia sesión:
   ```bash
   stripe login
   ```

3. Escucha webhooks localmente:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copia el **webhook signing secret** (empieza con `whsec_...`) que aparece en la terminal

5. Añádelo al `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_TU_WEBHOOK_SECRET_AQUI
   ```

#### Opción B: Webhook en producción (Vercel/producción)

1. Ve a [https://dashboard.stripe.com/test/webhooks](https://dashboard.stripe.com/test/webhooks)
2. Haz clic en **"Add endpoint"**
3. URL del endpoint: `https://tu-dominio.vercel.app/api/webhooks/stripe`
4. Eventos a escuchar:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Copia el **Signing secret** y añádelo a las variables de entorno de Vercel

### 5️⃣ Probar el sistema

1. Abre tu web: [http://localhost:3000](http://localhost:3000)
2. Añade productos al carrito
3. Haz clic en **"Proceder al Pago"**
4. Usa estas tarjetas de prueba:

   **✅ Pago exitoso:**
   ```
   Número: 4242 4242 4242 4242
   Fecha: cualquier fecha futura (ej: 12/34)
   CVC: cualquier 3 dígitos (ej: 123)
   Código postal: cualquiera (ej: 28001)
   ```

   **❌ Pago rechazado:**
   ```
   Número: 4000 0000 0000 0002
   Fecha: cualquier fecha futura
   CVC: cualquier 3 dígitos
   ```

   **🔄 Requiere autenticación 3D Secure:**
   ```
   Número: 4000 0027 6000 3184
   Fecha: cualquier fecha futura
   CVC: cualquier 3 dígitos
   ```

### 6️⃣ Modo Producción (cuando estés listo)

1. En Stripe, activa tu cuenta proporcionando la información requerida
2. Ve a **Developers → API Keys** y cambia a **"Production"** (arriba a la derecha)
3. Obtén las claves de PRODUCCIÓN (empiezan con `pk_live_` y `sk_live_`)
4. En Vercel o tu hosting, cambia las variables de entorno por las claves de producción
5. **¡NUNCA subas las claves de producción a GitHub!**

---

## 🎨 Características del sistema de pago

✅ **Checkout seguro con Stripe**
✅ **Soporte para tarjetas de crédito/débito**
✅ **Pago con Google Pay / Apple Pay** (automático)
✅ **Confirmación automática de pedidos**
✅ **Emails de confirmación** (si configuras Stripe)
✅ **Webhooks para actualizar el estado del pedido**
✅ **Páginas de éxito y cancelación**
✅ **Historial de pedidos en el perfil**
✅ **Totalmente responsive**

---

## 🛡️ Seguridad

- ✅ Las claves secretas **NUNCA** se exponen al cliente
- ✅ Los pagos se procesan en servidores seguros de Stripe
- ✅ Cumple con PCI DSS (no tocas datos de tarjetas)
- ✅ Webhooks firmados para evitar fraude
- ✅ HTTPS obligatorio en producción

---

## 📚 Recursos útiles

- [Documentación de Stripe](https://stripe.com/docs)
- [Dashboard de Stripe](https://dashboard.stripe.com)
- [Tarjetas de prueba](https://stripe.com/docs/testing)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

---

## ❓ Problemas comunes

**Error: "No API key provided"**
→ Verifica que las claves están en `.env.local` y reiniciaste el servidor

**Error: "Invalid API Key"**
→ Asegúrate de copiar la clave completa sin espacios

**El webhook no funciona**
→ Verifica que Stripe CLI esté corriendo con `stripe listen`

**Página en blanco después del pago**
→ Verifica que las rutas `/pago/exito` y `/pago/cancelado` existan

---

¡Listo! 🎉 Ahora tienes un sistema de pagos profesional.

