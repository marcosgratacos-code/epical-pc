# TITAN-PC · Diagnóstico y plan del rediseño premium

Estado a fecha de esta rama (`feat/rediseno-premium`). Lo que figura como "pendiente" no está hecho.

## Proyecto

- Next.js 15 (App Router), React 18, Tailwind 3, Prisma, NextAuth, Stripe, Mongoose.
- Catálogo en `src/app/lib/products.ts` (3 equipos: STARTER, ADVANCED, ULTRA). Es la fuente de verdad de precios y especificaciones.
- Despliegue: Vercel, proyecto `titan-pc`, dominio titan-pc.com.

## Hecho en esta fase

- **Sistema de diseño:** tokens (`--ink`, `--surface`, `--night`, `--accent`), escala tipográfica con `clamp()` (`text-display`, `text-headline`, `text-subhead`), botones (`.btn-*`), tarjetas, secciones claras/grises/oscuras y aparición suave al hacer scroll (`Reveal`, respeta `prefers-reduced-motion`).
- **Portada:** hero, TITAN ULTRA (oscura), TITAN ADVANCED (gris), familia TITAN, fabricación, configurador, garantía. Solo usa datos del catálogo.
- **Cabecera:** 56 px, navegación con estado activo, menú de Soporte accesible con teclado.
- **Ficha de producto:** barra de compra fija con nombre, precio y "Comprar".
- **Pie de página** común a todo el sitio.
- **Retirado por no poder acreditarse:** "500+ PCs montados", "98 % satisfacción", reseñas con "Comprador verificado", "Miles de gamers", "Pago a plazos" en portada, "Financiación sin intereses" y "Soporte WhatsApp" en la ficha.

## Incoherencias comerciales detectadas

| Tema | Qué se encontró | Estado |
|---|---|---|
| Windows | El catálogo y `/ventajas` dicen "no incluido por defecto"; portada, FAQ y ficha decían "incluido y activado". | Corregido para seguir el catálogo. **Confirmar que es la política real.** |
| Envío gratis | Umbral de 1500 € en `cesta`, 1000 € en el cajón del carrito, 500 € en `perfil`. | **Pendiente: decidir un umbral único.** |
| Devolución 30 días | Aparece en la ficha y en `ventajas`; no hay página de condiciones que la respalde. | **Pendiente de confirmar.** |
| Financiación | La FAQ promete "sin intereses hasta 12 meses"; no hay integración de financiación en el pago. | **Pendiente de confirmar.** |
| WhatsApp | El enlace usa el número de ejemplo `34XXXXXXXXX` (portada, chat, menú móvil). | **Pendiente: número real.** |
| Páginas legales | Aviso legal, privacidad, cookies y condiciones de venta no existen (los enlaces eran `#`). | **Pendiente: crearlas (obligatorio en España).** |
| Reseñas de producto | `ReviewSection` y datos de ejemplo en otras páginas. | **Pendiente de auditar.** |

## Imágenes

Solo TITAN ADVANCED tiene hoy una imagen de producto real (`/logo-sin-fondo.png`). Las de STARTER, ULTRA y las de `public/*-01.jpg`, `workbench-assembly.jpg`, etc. son marcadores de posición. La portada no las muestra como fotografías. **Hacen falta fotos reales de cada equipo.**

## Fases pendientes

1. Catálogo con filtros, ordenación y comparador (3 equipos).
2. Ficha de producto premium como plantilla reutilizable (rendimiento, diseño, benchmarks medidos, galería, especificaciones en acordeones).
3. Configurador con compatibilidades y precio validado en servidor.
4. Animaciones de scroll adicionales y medición real de LCP/INP/CLS.
5. Carrito y checkout; unificar envío, devoluciones y financiación.
6. Páginas legales.

## Configuración de empresa (variables de entorno en Vercel)

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Correo visible en la web y destinatario de presupuestos (por defecto `epicalpc@gmail.com`). |
| `NEXT_PUBLIC_WHATSAPP` | Número con prefijo, solo dígitos (p. ej. `34612345678`). Sin valor, no se muestra WhatsApp. |
| `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_LEGAL_TAX_ID`, `NEXT_PUBLIC_LEGAL_ADDRESS`, `NEXT_PUBLIC_PHONE` | Datos del titular (aviso legal, condiciones, pie de página y contacto). |
| `RESEND_API_KEY`, `RESEND_FROM` | Necesarias para que las solicitudes de presupuesto del configurador lleguen por correo. |

Condiciones comerciales (envío, garantía, devoluciones, financiación): `src/app/lib/policies.ts`.
Fotos reales de producto: `public/productos/<slug>/` (ver `LEEME.md`).
