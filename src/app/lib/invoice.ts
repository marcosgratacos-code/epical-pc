// Utilidades para generar facturas en PDF

import jsPDF from 'jspdf';
import { Order } from '@/types/order';

interface InvoiceData {
  order: Order;
  companyInfo: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    cif: string;
    phone: string;
    email: string;
  };
}

const COMPANY_INFO = {
  name: 'EPICAL-PC',
  address: 'Calle Tecnología, 123',
  city: 'Madrid',
  postalCode: '28001',
  country: 'España',
  cif: 'B12345678',
  phone: '+34 900 123 456',
  email: 'facturacion@epical-pc.com'
};

export function generateInvoicePDF(order: Order): void {
  const doc = new jsPDF();
  
  // Configuración de colores
  const primaryColor = [102, 51, 153]; // Violeta
  const secondaryColor = [6, 182, 212]; // Cyan
  const textColor = [51, 51, 51];
  const lightGray = [200, 200, 200];
  
  // Logo/Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 30, 'F');
  
  // Título de la empresa
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(COMPANY_INFO.name, 20, 20);
  
  // Subtítulo
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('PCs Gaming de Alto Rendimiento', 20, 26);
  
  // Información de la empresa
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);
  doc.text(`${COMPANY_INFO.address}, ${COMPANY_INFO.postalCode} ${COMPANY_INFO.city}`, 20, 45);
  doc.text(`${COMPANY_INFO.country} | CIF: ${COMPANY_INFO.cif}`, 20, 50);
  doc.text(`Tel: ${COMPANY_INFO.phone} | Email: ${COMPANY_INFO.email}`, 20, 55);
  
  // Información de la factura
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('FACTURA', 150, 45);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nº Factura: ${order.id}`, 150, 50);
  doc.text(`Fecha: ${formatDateForInvoice(order.fecha)}`, 150, 55);
  doc.text(`Pedido: ${order.id}`, 150, 60);
  
  // Información del cliente
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('FACTURAR A:', 20, 75);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(order.shippingAddress.nombre, 20, 82);
  doc.text(order.shippingAddress.direccion, 20, 87);
  doc.text(`${order.shippingAddress.codigoPostal} ${order.shippingAddress.ciudad}`, 20, 92);
  doc.text(order.shippingAddress.pais, 20, 97);
  if (order.shippingAddress.telefono) {
    doc.text(`Tel: ${order.shippingAddress.telefono}`, 20, 102);
  }
  
  // Tabla de productos
  const startY = 110;
  const tableWidth = 170;
  const colWidths = [100, 20, 25, 25];
  
  // Encabezados de la tabla
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(20, startY, tableWidth, 10, 'F');
  
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Descripción', 22, startY + 7);
  doc.text('Cant.', 122, startY + 7);
  doc.text('Precio', 142, startY + 7);
  doc.text('Total', 167, startY + 7);
  
  // Filas de productos
  let currentY = startY + 10;
  doc.setFont('helvetica', 'normal');
  
  order.productos.forEach((producto, index) => {
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    
    // Alternar color de fondo
    if (index % 2 === 0) {
      doc.setFillColor(245, 245, 245);
      doc.rect(20, currentY, tableWidth, 8, 'F');
    }
    
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(producto.nombre, 22, currentY + 5);
    doc.text(producto.cantidad.toString(), 122, currentY + 5);
    doc.text(`${producto.precio.toFixed(2)}€`, 142, currentY + 5);
    doc.text(`${(producto.precio * producto.cantidad).toFixed(2)}€`, 167, currentY + 5);
    
    currentY += 8;
  });
  
  // Cálculos de totales
  const subtotal = order.productos.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const envio = subtotal >= 1000 ? 0 : 14.9;
  const iva = subtotal * 0.21;
  const total = subtotal + iva + envio;
  
  // Totales
  currentY += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  doc.text('Subtotal:', 120, currentY);
  doc.text(`${subtotal.toFixed(2)}€`, 167, currentY);
  currentY += 6;
  
  doc.text('Envío:', 120, currentY);
  doc.text(envio === 0 ? 'Gratis' : `${envio.toFixed(2)}€`, 167, currentY);
  currentY += 6;
  
  doc.text('IVA (21%):', 120, currentY);
  doc.text(`${iva.toFixed(2)}€`, 167, currentY);
  currentY += 6;
  
  // Línea separadora
  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.line(120, currentY + 2, 192, currentY + 2);
  currentY += 6;
  
  // Total final
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('TOTAL:', 120, currentY);
  doc.text(`${total.toFixed(2)}€`, 167, currentY);
  
  // Información de pago
  currentY += 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Método de pago: Stripe', 20, currentY);
  doc.text('Estado: Pagado', 20, currentY + 6);
  
  // Pie de página
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Gracias por confiar en EPICAL-PC', 20, pageHeight - 20);
  doc.text('Para consultas: soporte@epical-pc.com', 20, pageHeight - 15);
  doc.text('www.epical-pc.com', 20, pageHeight - 10);
  
  // Guardar PDF
  doc.save(`factura-${order.id}.pdf`);
}

function formatDateForInvoice(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

export function generateInvoiceFromOrder(order: Order): void {
  try {
    generateInvoicePDF(order);
  } catch (error) {
    console.error('Error al generar factura:', error);
    // Fallback: mostrar mensaje de error
    alert('Error al generar la factura. Inténtalo de nuevo.');
  }
}

















