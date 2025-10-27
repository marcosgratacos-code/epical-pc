#!/usr/bin/env node

/**
 * Script para generar secretos de producción
 * Uso: node scripts/generate-secrets.js
 */

const crypto = require('crypto');

console.log('\n🔐 Generando Secretos para TITAN-PC\n');
console.log('=' .repeat(60));

// 1. ADMIN_TOKEN
const adminToken = crypto.randomBytes(32).toString('base64');
console.log('\n📝 1. ADMIN_TOKEN (añadir a Vercel)');
console.log('─'.repeat(60));
console.log(adminToken);

// 2. NEXTAUTH_SECRET
const nextAuthSecret = crypto.randomBytes(32).toString('base64');
console.log('\n📝 2. NEXTAUTH_SECRET (añadir a Vercel)');
console.log('─'.repeat(60));
console.log(nextAuthSecret);

// 3. STRIPE_WEBHOOK_SECRET (placeholder)
console.log('\n📝 3. STRIPE_WEBHOOK_SECRET');
console.log('─'.repeat(60));
console.log('⚠️  Obtén este de: Stripe Dashboard → Webhooks → Copy Signing Secret');
console.log('   Formato: whsec_...');

// 4. Variables que necesitas configurar manualmente
console.log('\n📝 4. Variables de Stripe (Live Mode)');
console.log('─'.repeat(60));
console.log('⚠️  Obtén de: https://dashboard.stripe.com/apikeys');
console.log('   STRIPE_SECRET_KEY=sk_live_...');
console.log('   NEXT_PUBLIC_STRIPE_PK=pk_live_...');

// 5. Resend
console.log('\n📝 5. Variables de Resend');
console.log('─'.repeat(60));
console.log('⚠️  Obtén de: https://resend.com/api-keys');
console.log('   RESEND_API_KEY=re_...');
console.log('   RESEND_FROM=noreply@titan-pc.com');

// 6. Base de datos
console.log('\n📝 6. DATABASE_URL');
console.log('─'.repeat(60));
console.log('⚠️  Opciones:');
console.log('   a) Vercel Postgres (recomendado):');
console.log('      - Ve a Vercel Dashboard → Storage → Create Database');
console.log('      - Copia POSTGRES_PRISMA_URL');
console.log('   b) Neon (neon.tech):');
console.log('      - Crea proyecto y copia connection string');
console.log('   c) Supabase (supabase.com):');
console.log('      - Crea proyecto y copia connection string');

// 7. Upstash (opcional)
console.log('\n📝 7. Upstash (Opcional)');
console.log('─'.repeat(60));
console.log('⚠️  Para rate limiting:');
console.log('   - Ve a: https://console.upstash.com');
console.log('   - Crea base de datos Redis');
console.log('   - Copia UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN');

console.log('\n' + '='.repeat(60));
console.log('\n✅ Copia estos valores y añádelos en Vercel Dashboard');
console.log('\n📖 Para instrucciones completas, ver: DEPLOY_VERCEL.md\n');

