import { Resend } from 'resend';
import { formatAmountForDisplay } from './currency';

// Tipos temporales para evitar dependencias circulares
interface EmailOrderItem {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  imagen?: string;
}

interface EmailOrder {
  id: string;
  fecha: string;
  total: number;
  customerEmail: string;
  numeroSeguimiento: string;
  productos: EmailOrderItem[];
  shippingAddress?: {
    nombre?: string;
    direccion?: string;
    codigoPostal?: string;
    ciudad?: string;
    pais?: string;
  };
}

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendOrderConfirmationEmail(order: EmailOrder): Promise<boolean> {
  // Si Resend no está configurado, solo loguear
  if (!resend) {
    console.log('📧 Email simulation - Order confirmation', {
      to: order.customerEmail,
      orderId: order.id,
      total: order.total,
    });
    return true;
  }

  try {
    // Calcular IVA (21% en España)
    const subtotal = order.total / 1.21;
    const iva = order.total - subtotal;

    const itemsHtml = order.productos
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.imagen || '/logo.png'}" width="50" height="50" style="border-radius: 4px;">
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.nombre}</strong>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
          ${item.cantidad}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          ${formatAmountForDisplay(item.precio * item.cantidad)}€
        </td>
      </tr>
    `
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 14px; border-radius: 0 0 10px 10px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
            .total-row { font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎉 ¡Pedido Confirmado!</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Gracias por tu compra en TITAN-PC</p>
            </div>
            
            <div class="content">
              <h2>Detalles del Pedido</h2>
              <p><strong>Número de pedido:</strong> ${order.id}</p>
              <p><strong>Fecha:</strong> ${new Date(order.fecha).toLocaleDateString('es-ES')}</p>
              <p><strong>Número de seguimiento:</strong> ${order.numeroSeguimiento}</p>
              
              <h3 style="margin-top: 30px;">Productos</h3>
              <table>
                <thead>
                  <tr style="background: #f3f4f6;">
                    <th style="padding: 10px; text-align: left;">Imagen</th>
                    <th style="padding: 10px; text-align: left;">Producto</th>
                    <th style="padding: 10px; text-align: center;">Cantidad</th>
                    <th style="padding: 10px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr>
                    <td colspan="3" style="padding: 10px; text-align: right; border-top: 2px solid #e5e7eb;">
                      Subtotal (sin IVA)
                    </td>
                    <td style="padding: 10px; text-align: right; border-top: 2px solid #e5e7eb;">
                      ${formatAmountForDisplay(subtotal)}€
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 10px; text-align: right;">
                      IVA (21%)
                    </td>
                    <td style="padding: 10px; text-align: right;">
                      ${formatAmountForDisplay(iva)}€
                    </td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="3" style="padding: 15px; text-align: right; border-top: 2px solid #06b6d4;">
                      TOTAL
                    </td>
                    <td style="padding: 15px; text-align: right; border-top: 2px solid #06b6d4; color: #06b6d4;">
                      ${formatAmountForDisplay(order.total)}€
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <h3 style="margin-top: 30px;">Dirección de Envío</h3>
              <p>
                ${order.shippingAddress?.nombre || 'N/A'}<br>
                ${order.shippingAddress?.direccion || ''}<br>
                ${order.shippingAddress?.codigoPostal || ''} ${order.shippingAddress?.ciudad || ''}<br>
                ${order.shippingAddress?.pais || 'España'}
              </p>
              
              <p style="margin-top: 30px; padding: 15px; background: #e0f2fe; border-radius: 8px;">
                <strong>📦 Seguimiento:</strong> Puedes rastrear tu pedido en cualquier momento 
                visitando <a href="${process.env.NEXTAUTH_URL}/seguimiento">nuestra página de seguimiento</a> 
                con el número: <strong>${order.numeroSeguimiento}</strong>
              </p>
              
              <p style="margin-top: 20px; color: #6b7280;">
                Si tienes alguna pregunta, contáctanos en ${process.env.ADMIN_EMAIL || 'soporte@titan-pc.com'}
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">© ${new Date().getFullYear()} TITAN-PC - PCs Gaming Personalizados</p>
              <p style="margin: 5px 0 0 0;">Garantía de 3 años · Validación térmica · Montaje profesional</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM || 'TITAN-PC <noreply@titan-pc.com>',
      to: order.customerEmail,
      subject: `Pedido ${order.id} - TITAN-PC`,
      html,
    });

    console.log('✅ Email enviado:', result);
    return true;
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return false;
  }
}

