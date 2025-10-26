"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  slug: string;
  name: string;
  price?: number;
  image?: string;
  score?: number;
}

export default function CartRecommendationsClient({ slugs }: { slugs: string[] }) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slugs?.length) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/recommendations/cart", {
          method: "POST",
          body: JSON.stringify({ slugs, days: 90, lambda: 0.03, limit: 12 }),
          headers: { "Content-Type": "application/json" },
        });

        const { results: data = [] } = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [JSON.stringify(slugs)]);

  if (loading || !results.length) return null;

  return (
    <section className="mt-10 pt-8 border-t border-white/10">
      <h3 className="text-xl font-semibold mb-3">Frecuentemente vistos junto a tu selección</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {results.map((p: Product) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image src={p.image || ""} alt={p.name} fill className="object-contain" sizes="(max-width:1024px) 100vw, 20vw" />
            </div>
            <div className="p-3">
              <div className="text-sm font-semibold truncate">{p.name}</div>
              {typeof p.price === "number" && (
                <div className="text-blue-400 text-sm mt-1">
                  {p.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </div>
              )}
              {typeof p.score === "number" && (
                <div className="text-xs text-white/50 mt-1">Relevancia {p.score.toFixed(2)}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
