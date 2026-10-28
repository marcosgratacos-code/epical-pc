// Testimonios de clientes

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Carlos M.",
    rating: 5,
    comment: "Increíble PC gaming. El montaje es impecable y las temperaturas son excelentes. TITAN-PC superó todas mis expectativas.",
    product: "TITAN ULTRA",
  },
  {
    id: "2",
    name: "Ana R.",
    rating: 5,
    comment: "Servicio excepcional desde el primer contacto. Mi PC llegó perfectamente configurado y funcionando al 100%.",
    product: "TITAN ADVANCED",
  },
  {
    id: "3",
    name: "Miguel L.",
    rating: 5,
    comment: "La calidad del montaje es profesional. Se nota que saben lo que hacen. Recomiendo totalmente TITAN-PC.",
    product: "TITAN STARTER",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-neutral-900" : "text-neutral-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-neutral-50 border-y border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium text-blue-600">Opiniones</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-8">
              <Stars rating={t.rating} />
              <blockquote className="mt-5 flex-1 text-neutral-700 leading-relaxed">
                “{t.comment}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium text-neutral-900">{t.name}</span>
                <span className="text-neutral-500"> · Comprador verificado de {t.product}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:epicalpc@gmail.com?subject=Testimonial%20de%20cliente"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            Compartir mi experiencia
          </a>
          <a
            href="/productos"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Ver nuestros productos →
          </a>
        </div>
      </div>
    </section>
  );
}
