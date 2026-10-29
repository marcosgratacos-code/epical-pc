/**
 * Datos de contacto y legales de la empresa, configurables por entorno.
 * Nada de esto debe inventarse: si una variable no existe, el dato no se muestra.
 */
const clean = (v?: string) => (v && v.trim() ? v.trim() : null);

export const COMPANY = {
  brand: "TITAN-PC",
  /** Correo visible y destinatario de presupuestos. Configurar NEXT_PUBLIC_CONTACT_EMAIL con el correo corporativo. */
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "epicalpc@gmail.com",
  /** Solo dígitos con prefijo internacional, p. ej. 34612345678. Sin valor, no se muestra WhatsApp. */
  whatsapp: clean(process.env.NEXT_PUBLIC_WHATSAPP)?.replace(/\D/g, "") ?? null,
  legalName: clean(process.env.NEXT_PUBLIC_LEGAL_NAME),
  taxId: clean(process.env.NEXT_PUBLIC_LEGAL_TAX_ID),
  address: clean(process.env.NEXT_PUBLIC_LEGAL_ADDRESS),
  phone: clean(process.env.NEXT_PUBLIC_PHONE),
} as const;

export const whatsappUrl = (text?: string) =>
  COMPANY.whatsapp ? `https://wa.me/${COMPANY.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}` : null;
