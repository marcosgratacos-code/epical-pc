import Image from "next/image";
import Link from "next/link";

export default async function Upgrades({ slug }: { slug: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  const res = await fetch(
    `${baseUrl}/api/compat/recommendations?slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: 180 } }
  );
  
  const { buckets = {} } = await res.json();

  const order: Array<keyof typeof buckets> = ["GPU", "RAM", "Storage", "Cooler", "PSU", "Peripheral"];

  const hasResults = Object.keys(buckets).length > 0;
  if (!hasResults) return null;

  return (
    <section className="mt-14 space-y-8">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
        ⚙️ Upgrades compatibles
      </h2>

      {order.map((bucket) => {
        const list = buckets[bucket];
        if (!list || list.length === 0) return null;
        return (
          <div key={String(bucket)}>
            <h3 className="text-lg font-semibold mb-3 text-white/90">{bucket}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {list.map((s: any) => (
                <Link
                  key={s.product.slug}
                  href={`/products/${s.product.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={s.product.image}
                      alt={s.product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width:1024px) 100vw, 20vw"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold truncate">{s.product.name}</div>
                    {typeof s.product.price === "number" && (
                      <div className="text-blue-400 text-sm mt-1">
                        {s.product.price.toLocaleString("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </div>
                    )}
                    <div className="text-xs text-white/50 mt-1">{s.reason}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
