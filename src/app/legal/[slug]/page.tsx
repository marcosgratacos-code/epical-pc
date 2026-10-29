import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { POLICIES } from "@/app/lib/policies";

type Doc = { title: string; intro: string; sections: { h: string; p: string[] }[] };

const holder = () =>
  [COMPANY.legalName && `Titular: ${COMPANY.legalName}`, COMPANY.taxId && `NIF/CIF: ${COMPANY.taxId}`, COMPANY.address && `Domicilio: ${COMPANY.address}`, `Correo electrónico: ${COMPANY.email}`, COMPANY.phone && `Teléfono: ${COMPANY.phone}`]
    .filter(Boolean) as string[];

function docs(): Record<string, Doc> {
  return {
    "aviso-legal": {
      title: "Aviso legal",
      intro: "Información general del sitio titan-pc.com conforme a la Ley 34/2002 de servicios de la sociedad de la información.",
      sections: [
        { h: "Titular del sitio", p: holder() },
        { h: "Objeto", p: ["TITAN-PC ofrece ordenadores de sobremesa montados y la posibilidad de solicitar presupuestos de equipos a medida a través de este sitio web."] },
        { h: "Propiedad intelectual", p: ["Los textos, el diseño y las imágenes propias de este sitio pertenecen a su titular. Las marcas de fabricantes que aparecen (NVIDIA, AMD, Intel, Corsair y otras) son propiedad de sus respectivos dueños y se citan solo para identificar los componentes."] },
        { h: "Responsabilidad", p: ["Hacemos lo posible por mantener la información actualizada. Los precios y especificaciones pueden cambiar; el precio válido es el que figura en la cesta o en el presupuesto confirmado por escrito."] },
      ],
    },
    privacidad: {
      title: "Política de privacidad",
      intro: "Cómo tratamos los datos personales que nos facilitas, conforme al Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD.",
      sections: [
        { h: "Responsable", p: holder() },
        { h: "Datos que tratamos y para qué", p: ["Datos de contacto (nombre, correo, teléfono) cuando solicitas un presupuesto o nos escribes: para responderte.", "Datos de pedido y envío (nombre, dirección, teléfono, correo): para gestionar la compra, el envío y la garantía.", "Datos de cuenta si inicias sesión con Google: nombre, correo e imagen de perfil, para identificarte en tu cuenta."] },
        { h: "Base jurídica", p: ["Ejecución de la compra o de tu solicitud, cumplimiento de obligaciones legales (fiscales y de garantía) y, en su caso, tu consentimiento."] },
        { h: "Destinatarios", p: ["El pago lo procesa Stripe, que recibe los datos necesarios para cobrar. El envío de correos transaccionales se realiza mediante un proveedor de correo. No vendemos tus datos."] },
        { h: "Conservación", p: ["Conservamos los datos mientras sea necesario para la finalidad indicada y durante los plazos legales aplicables (por ejemplo, obligaciones fiscales y plazos de garantía)."] },
        { h: "Tus derechos", p: [`Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${COMPANY.email}. Si consideras que no hemos atendido tus derechos, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).`] },
      ],
    },
    cookies: {
      title: "Política de cookies y almacenamiento",
      intro: "Qué información guarda este sitio en tu navegador.",
      sections: [
        { h: "Técnicas y necesarias", p: ["Sesión de usuario (inicio de sesión), contenido de la cesta, favoritos y preferencias de la interfaz. Sin ellas el sitio no funciona correctamente y no requieren consentimiento.", "Durante el pago, Stripe puede usar cookies o almacenamiento propios para prevenir el fraude y completar la transacción."] },
        { h: "Analítica y publicidad", p: ["Este sitio no incorpora herramientas de analítica ni de publicidad de terceros. Si se añadieran, se solicitaría tu consentimiento previo."] },
        { h: "Cómo gestionarlas", p: ["Puedes borrar o bloquear las cookies y el almacenamiento local desde los ajustes de tu navegador. Si lo haces, la cesta y la sesión pueden no conservarse."] },
      ],
    },
    condiciones: {
      title: "Condiciones de venta",
      intro: "Condiciones aplicables a las compras realizadas en titan-pc.com.",
      sections: [
        { h: "Vendedor", p: holder() },
        { h: "Precios y pago", p: ["Los precios se muestran en euros. El pago se realiza en un único cobro con tarjeta a través de Stripe. No se ofrece financiación."] },
        { h: "Envío", p: [`Plazo habitual de preparación y envío: ${POLICIES.shippingTime}. Los gastos de envío, si los hubiera, se muestran en la cesta antes de confirmar el pago.`] },
        { h: "Windows", p: [POLICIES.windows.note] },
        { h: "Garantía", p: [`Todos los equipos cuentan con ${POLICIES.warrantyYears} años de garantía. Además, te asiste la garantía legal de conformidad que establece la normativa de consumidores.`] },
        { h: "Desistimiento y devoluciones", p: [POLICIES.returnDays ? `Dispones de ${POLICIES.returnDays} días para devolver el producto.` : "Como consumidor tienes derecho de desistimiento en las condiciones que establece la normativa vigente (Real Decreto Legislativo 1/2007). Los equipos configurados a medida según tus especificaciones pueden estar excluidos de ese derecho conforme a la ley.", `Para ejercerlo o resolver cualquier incidencia, escríbenos a ${COMPANY.email}.`] },
        { h: "Atención al cliente y reclamaciones", p: [`Contacto: ${COMPANY.email}. Puedes acudir además a la plataforma europea de resolución de litigios en línea (ec.europa.eu/consumers/odr).`] },
      ],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(docs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = docs()[slug];
  return d ? { title: `${d.title} | TITAN-PC`, description: d.intro } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = docs()[slug];
  if (!d) notFound();
  return (
    <main className="bg-white text-ink">
      <div className="container-content max-w-3xl py-16">
        <nav aria-label="Documentos legales" className="mb-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {Object.entries(docs()).map(([s, x]) => (
            <Link key={s} href={`/legal/${s}`} aria-current={s === slug ? "page" : undefined}
              className={s === slug ? "font-semibold text-ink" : "text-muted hover:text-ink"}>
              {x.title}
            </Link>
          ))}
        </nav>
        <h1 className="text-headline font-semibold tracking-tight">{d.title}</h1>
        <p className="mt-3 text-muted">{d.intro}</p>
        {d.sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="text-lg font-semibold">{s.h}</h2>
            {s.p.map((t) => (
              <p key={t} className="mt-2 leading-relaxed text-neutral-700">{t}</p>
            ))}
          </section>
        ))}
        <p className="mt-12 text-xs text-muted">Última revisión: octubre de 2026.</p>
      </div>
    </main>
  );
}
