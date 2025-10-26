import Image from "next/image";
import Link from "next/link";

export default async function Complements({ slug }: { slug: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  const res = await fetch(
    `${baseUrl}/api/recommendations/complements?slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: 180 } }
  );

  const { results = [] } = await res.json();
  if (!results.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
        💡 Complementos recomendados
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {results.map((p: any) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-contain"
                sizes="(max-width:1024px) 100vw, 20vw"
              />
            </div>
            <div className="p-3">
              <div className="text-sm font-semibold truncate">{p.name}</div>
              {typeof p.price === "number" && (
                <div className="text-blue-400 text-sm mt-1">
                  {p.price.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </div>
              )}
              <div className="text-xs text-white/50 mt-1">
                Relevancia {p.score?.toFixed(2)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
