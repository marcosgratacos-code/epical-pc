"use client";

import { useState } from "react";
import Modal from "./Modal";

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FAQItem {
  pregunta: string;
  respuesta: string;
  emoji: string;
}

const faqData: FAQItem[] = [
  {
    emoji: "📦",
    pregunta: "¿Cuánto tarda en llegar mi pedido?",
    respuesta: "Los envíos dentro de la península española suelen tardar entre 3-5 días laborables. Para Baleares, Canarias, Ceuta y Melilla el plazo es de 5-7 días laborables. Recibirás actualizaciones en tiempo real del estado de tu envío."
  },
  {
    emoji: "🔍",
    pregunta: "¿Dónde encuentro mi número de seguimiento?",
    respuesta: "Tu número de seguimiento se envía por email una vez que el pedido ha sido despachado. También puedes encontrarlo en la sección 'Mis Pedidos' de tu cuenta o en esta página de seguimiento."
  },
  {
    emoji: "🚚",
    pregunta: "¿Con qué transportista se envía mi pedido?",
    respuesta: "Trabajamos con diferentes transportistas (SEUR, MRW, Correos Express) dependiendo del destino y disponibilidad. El transportista asignado aparecerá en los detalles de tu pedido una vez que sea despachado."
  },
  {
    emoji: "📍",
    pregunta: "¿Puedo cambiar la dirección de entrega?",
    respuesta: "Sí, puedes modificar la dirección siempre que el pedido no haya sido enviado todavía. Si el estado es 'Procesando' o 'Preparando', contáctanos lo antes posible o usa el botón 'Modificar dirección de entrega' en esta página."
  },
  {
    emoji: "⏰",
    pregunta: "¿Qué hago si no estoy en casa cuando llega el envío?",
    respuesta: "El transportista dejará un aviso e intentará la entrega nuevamente. También puedes contactar directamente con el transportista usando el número que aparece en el aviso para coordinar una nueva entrega o recogerlo en su punto más cercano."
  },
  {
    emoji: "📋",
    pregunta: "Mi seguimiento no se actualiza, ¿qué debo hacer?",
    respuesta: "Es normal que pase algún tiempo entre actualizaciones, especialmente durante el transporte. Si han pasado más de 48 horas sin cambios, contáctanos a través del botón 'Hablar con soporte TITAN' y revisaremos tu caso."
  },
  {
    emoji: "💰",
    pregunta: "¿Los envíos tienen coste adicional?",
    respuesta: "El envío estándar a península es gratuito para todos nuestros PCs gaming. Para envíos a Baleares, Canarias, Ceuta y Melilla puede aplicarse un suplemento que se indica durante el proceso de compra."
  },
  {
    emoji: "🔒",
    pregunta: "¿Cómo viene empaquetado mi PC?",
    respuesta: "Tu PC gaming viene embalado con materiales protectores de alta calidad, con espuma de protección interior y una caja exterior reforzada. Los componentes internos también están asegurados para evitar movimientos durante el transporte."
  },
  {
    emoji: "📦",
    pregunta: "¿Qué hago si el paquete llega dañado?",
    respuesta: "Si observas daños en el embalaje, anótalo en el albarán de entrega e infórmanos inmediatamente. Haremos una revisión y te enviaremos un reemplazo o realizaremos las reparaciones necesarias sin coste adicional."
  },
  {
    emoji: "🎁",
    pregunta: "¿Incluye factura el envío?",
    respuesta: "Sí, todos nuestros envíos incluyen factura. También recibirás una copia digital por email. Si necesitas alguna modificación en los datos fiscales, contáctanos antes de que el pedido sea enviado."
  },
];

export default function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Preguntas Frecuentes sobre Envíos">
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-white/20"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 hover:bg-white/5 transition-all duration-200"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl flex-shrink-0">{faq.emoji}</span>
                <span className="font-semibold text-white">{faq.pregunta}</span>
              </div>
              <svg
                className={`h-5 w-5 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-5 pb-4 pt-0">
                <p className="text-white/70 leading-relaxed text-sm pl-11">
                  {faq.respuesta}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-white/10">
        <p className="text-sm text-white/70 text-center">
          ¿No encuentras respuesta a tu pregunta?{" "}
          <button
            onClick={onClose}
            className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
          >
            Contacta con nuestro soporte
          </button>
        </p>
      </div>
    </Modal>
  );
}

