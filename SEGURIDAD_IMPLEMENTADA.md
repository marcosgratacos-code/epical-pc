# 🔐 TITAN-PC - Seguridad Implementada

## ✅ Capas de Seguridad Implementadas

### 1️⃣ **Middleware de Protección /admin**
**Archivo**: `src/middleware.ts`

**Características**:
- ✅ Verificación de token Bearer (`ADMIN_TOKEN`)
- ✅ Lista blanca de IPs (`ADMIN_IP_ALLOWLIST`)
- ✅ Fallback a sesión NextAuth
- ✅ Bloquea acceso no autorizado (401)

**Variables necesarias**:
```env
ADMIN_TOKEN=very-long-random-token
ADMIN_IP_ALLOWLIST=127.0.0.1,::1
```

### 2️⃣ **Rate Limiting con Upstash**
**Archivo**: `src/lib/ratelimit.ts`

**Características**:
- ✅ Sliding window rate limiting
- ✅ 3 límites configurables:
  - `rl_anon_10req_1m` - 10 req/min
  - `rl_anon_100req_1h` - 100 req/hora
  - `rl_strict_5req_1m` - 5 req/min (strict)
- ✅ Fallback si Upstash no está configurado
- ✅ Headers `Retry-After` en 429

**Uso implementado en**:
- `src/app/api/checkout/route.ts` (5 req/min)

**Variables necesarias**:
```env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### 3️⃣ **Validación con Zod**
**Archivo**: `src/lib/schemas.ts`

**Schemas creados**:
- ✅ `CartItemSchema` - Items del carrito
- ✅ `CheckoutSchema` - Datos de checkout
- ✅ `CreateProductSchema` - Crear producto
- ✅ `UpdateProductSchema` - Actualizar producto
- ✅ `CreateOrderSchema` - Crear orden

**Validaciones**:
- Cantidad 1-10 por item
- Precios en céntimos (positivos)
- URLs válidas
- Emails válidos
- Strings no vacíos con límites

### 4️⃣ **Seguridad Web (CSRF)**
**Archivo**: `src/lib/security.ts`

**Funciones**:
- ✅ `assertSameOrigin()` - Verifica origen de petición
- ✅ `getClientIp()` - Extrae IP del cliente
- ✅ `generateSecureToken()` - Genera tokens seguros
- ✅ `sanitizeInput()` - Previene XSS
- ✅ `isSecureUrl()` - Valida URLs permitidas

**Implementado en**:
- `src/app/api/checkout/route.ts` - Verifica origen antes de checkout

### 5️⃣ **Headers de Seguridad**
**Archivo**: `next.config.ts`

**Headers implementados**:
```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**CSP (Content Security Policy)**:
- ✅ Bloquea iframes maliciosos
- ✅ Permite Stripe (js.stripe.com, hooks.stripe.com)
- ✅ Permite Upstash (*.upstash.io)
- ✅ Imágenes y CSS de fuentes seguras

### 6️⃣ **Webhook de Stripe Seguro**
**Archivo**: `src/app/api/webhooks/stripe/route.ts`

**Características**:
- ✅ Verificación de firma con `req.text()` (raw body)
- ✅ Usa `stripe.webhooks.constructEvent()`
- ✅ Valida webhook secret
- ✅ Maneja errores de firma (400)

### 7️⃣ **Idempotencia en Órdenes**
**Archivo**: `src/app/api/orders/route.ts`

**Características**:
- ✅ Verifica `sessionId` existente antes de crear
- ✅ Devuelve orden existente si ya existe
- ✅ Transacciones Prisma (`$transaction`)
- ✅ Previene duplicados de webhooks

**Flujo**:
```
1. Webhook recibe checkout.session.completed
2. Verifica si Order existe con sessionId
3. Si existe → retorna orden (200)
4. Si no existe → crea en transacción
```

### 8️⃣ **Transacciones Atómicas**
**Implementado en**: `src/app/api/orders/route.ts`

**Características**:
- ✅ Usa `prisma.$transaction()`
- ✅ Crea Order + OrderItems + OrderEvents atómicamente
- ✅ Rollback automático si falla
- ✅ Previene estados inconsistentes

---

## 🛡️ Seguridad por Capas

### **Capa 1: Middleware**
- Middleware intercepta peticiones a `/admin`
- Verifica token + IP allowlist
- Devuelve 401 si no autorizado

### **Capa 2: Rate Limiting**
- Limita peticiones por IP
- Previene abuso y DDoS básico
- Headers Retry-After

### **Capa 3: Validación de Entrada**
- Schemas Zod en todas las APIs
- Rechaza datos inválidos (400)
- Sanitiza inputs

### **Capa 4: CSRF Protection**
- Verifica origen de petición
- Solo permite mismo dominio
- Bloquea peticiones cross-origin maliciosas

### **Capa 5: Headers de Seguridad**
- CSP previene XSS
- X-Frame-Options previene clickjacking
- HSTS fuerza HTTPS

### **Capa 6: Webhook Seguro**
- Verifica firma de Stripe
- Raw body (no JSON) para firma correcta
- 400 si firma inválida

### **Capa 7: Idempotencia**
- Evita duplicados por webhooks repetidos
- Usa sessionId como key único
- Devuelve orden existente

### **Capa 8: Transacciones**
- Atomicidad en creación de órdenes
- Rollback automático
- Consistencia de datos

---

## 📝 Variables de Entorno Requeridas

Añade estas variables a `.env.local` (local) y Vercel (producción):

```env
# Seguridad
ADMIN_TOKEN=openssl-rand-base64-32
ADMIN_IP_ALLOWLIST=tu-ip-1,tu-ip-2
NEXT_PUBLIC_APP_URL=https://titan-pc.vercel.app

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PK=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (opcional)
RESEND_API_KEY=re_...
RESEND_FROM=noreply@titan-pc.com

# Upstash (opcional)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# NextAuth
NEXTAUTH_URL=https://titan-pc.vercel.app
NEXTAUTH_SECRET=openssl-rand-base64-32
```

---

## 🧪 Testing de Seguridad

### Test 1: Middleware Admin
```bash
# Sin token → 401
curl http://localhost:3000/admin

# Con token → OK
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/admin
```

### Test 2: Rate Limiting
```bash
# 6+ peticiones rápidas → 429
for i in {1..10}; do curl http://localhost:3000/api/checkout -X POST; done
```

### Test 3: CSRF
```bash
# Origen inválido → 403
curl -H "Origin: https://malicious.com" http://localhost:3000/api/checkout -X POST
```

### Test 4: Validación Zod
```bash
# Carrito vacío → 400
curl -X POST http://localhost:3000/api/checkout -H "Content-Type: application/json" -d '{}'
```

### Test 5: Webhook Stripe
```bash
# Simular webhook
stripe trigger checkout.session.completed
```

---

## 🔒 Mejores Prácticas Implementadas

1. **Secrets en Variables de Entorno** ✅
   - Nunca en código
   - Rotación periódica de tokens

2. **Rate Limiting** ✅
   - Previene abuso
   - Protege recursos costosos

3. **Validación Estricta** ✅
   - Zod schemas
   - Rechaza datos inválidos temprano

4. **CSRF Protection** ✅
   - Verifica origen
   - Solo mismo dominio

5. **Headers de Seguridad** ✅
   - CSP, X-Frame-Options, HSTS
   - Prevención XSS y clickjacking

6. **Idempotencia** ✅
   - Webhooks seguros
   - No duplicados

7. **Transacciones** ✅
   - Atomicidad
   - Rollback automático

---

## 📋 Checklist de Deployment

- [ ] Generar `ADMIN_TOKEN` con `openssl rand -base64 32`
- [ ] Configurar `ADMIN_IP_ALLOWLIST` con IPs autorizadas
- [ ] Configurar `NEXTAUTH_SECRET` con `openssl rand -base64 32`
- [ ] Añadir claves de Stripe (test + production)
- [ ] Configurar webhook de Stripe en dashboard
- [ ] Copiar `STRIPE_WEBHOOK_SECRET` de Stripe
- [ ] (Opcional) Configurar Upstash para rate limiting
- [ ] (Opcional) Configurar Resend para emails
- [ ] Verificar headers de seguridad en DevTools
- [ ] Test de rate limiting
- [ ] Test de webhook de Stripe
- [ ] Verificar CSP en console (sin errores)

---

## 🚨 Notas Importantes

1. **Upstash es Opcional**: Si no está configurado, el rate limiting no funcionará pero la app seguirá operativa.

2. **Resend es Opcional**: Si no está configurado, los emails solo se loguean (no fallan).

3. **ADMIN_TOKEN**: Cambiar este token periódicamente y nunca commitearlo.

4. **Headers en Producción**: Verificar que HTTPS está habilitado en Vercel (lo tiene por defecto).

5. **CSP Personalización**: Si añades CDNs externos, actualiza CSP en `next.config.ts`.

---

✅ **TITAN-PC está blindado con 8 capas de seguridad**

