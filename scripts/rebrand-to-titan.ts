import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const DRY = process.env.DRY_RUN !== "false"; // por defecto SÍ es dry-run

const suffix = () => Date.now().toString().slice(-5);
const toSlug = (s: string) =>
  s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

function toTitanName(old: string) {
  return old.replace(/EPICAL/gi, "TITAN").replace(/Epical/gi, "Titan").replace(/epical/gi, "titan");
}
function toTitanSlug(old: string) {
  // si empieza por epical- => titan-
  return old.replace(/^epical-/, "titan-");
}
function toTitanSku(old: string) {
  // epic* => titan*
  return old.replace(/^epic/, "titan");
}
function toTitanShort(old?: string | null) {
  return old ? old.replace(/^epic/, "titan") : null;
}

async function main() {
  const products = await db.product.findMany();
  if (products.length === 0) {
    console.log("No hay productos.");
    return;
  }

  const plan: Array<{
    id: string;
    from: { name: string; slug: string; sku: string; shortName: string | null };
    to: { name: string; slug: string; sku: string; shortName: string | null };
  }> = [];

  for (const p of products) {
    let name = toTitanName(p.name);
    let slug = toTitanSlug(p.slug);
    let sku = toTitanSku(p.sku);
    let shortName = toTitanShort(p.shortName);

    // evita colisiones de slug únicos
    const exists = await db.product.findUnique({ where: { slug } });
    if (exists && exists.id !== p.id) slug = `${slug}-${suffix()}`;

    plan.push({
      id: p.id,
      from: { name: p.name, slug: p.slug, sku: p.sku, shortName: p.shortName ?? null },
      to: { name, slug, sku, shortName },
    });
  }

  console.log(`\n📋 PLAN (${DRY ? "dry-run ✅" : "aplicando cambios ⚠️"})`);
  for (const row of plan) {
    console.log(`- ${row.from.slug} -> ${row.to.slug} | ${row.from.name} -> ${row.to.name} | ${row.from.sku} -> ${row.to.sku}`);
  }

  if (DRY) {
    console.log("\nNo se aplicó nada (dry-run). Ejecuta con DRY_RUN=false para escribir.\n");
    return;
  }

  for (const row of plan) {
    await db.product.update({
      where: { id: row.id },
      data: row.to,
    });
  }
  console.log("\n✅ Rebrand aplicado en BD.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => db.$disconnect());
