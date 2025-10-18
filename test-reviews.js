// Script para añadir reseñas de ejemplo
// Ejecutar en la consola del navegador para probar el sistema

const exampleReviews = [
  {
    id: "review_1",
    productId: "epical1",
    orderId: "order_12345678",
    customerEmail: "cliente1@ejemplo.com",
    customerName: "Alex G.",
    rating: 5,
    title: "¡Mi PC gaming perfecto!",
    comment: "Llevo 2 meses con mi EPICAL-PC y es una bestia total. El montaje es impecable, las temperaturas están perfectas y el silencio es increíble. La validación térmica se nota mucho, nunca pasa de 70°C en gaming intenso. Recomendado 100%.",
    images: ["https://via.placeholder.com/400x300?text=Setup+Gaming"],
    verified: true,
    helpful: 12,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días atrás
    moderated: true,
    published: true
  },
  {
    id: "review_2", 
    productId: "epical1",
    orderId: "order_87654321",
    customerEmail: "cliente2@ejemplo.com",
    customerName: "Sara R.",
    rating: 5,
    title: "Montaje profesional de 10",
    comment: "Necesitaba un PC para trabajo de diseño gráfico y me ayudaron a elegir los componentes perfectos. El montaje es súper limpio, todo perfectamente organizado. El soporte por WhatsApp es inmediato. ¡Muy contenta con la compra!",
    images: ["https://via.placeholder.com/400x300?text=Workstation+Setup"],
    verified: true,
    helpful: 8,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 días atrás
    moderated: true,
    published: true
  },
  {
    id: "review_3",
    productId: "epical2", 
    orderId: "order_11223344",
    customerEmail: "cliente3@ejemplo.com",
    customerName: "Javi M.",
    rating: 5,
    title: "Rendimiento brutal",
    comment: "Mi 7800X3D vuela literalmente. Los FPS en 1440p son increíbles, nunca baja de 120fps en juegos modernos. La refrigeración líquida funciona perfectamente y es súper silenciosa. La validación térmica es un plus que no encontré en ningún otro sitio.",
    images: ["https://via.placeholder.com/400x300?text=Gaming+Setup"],
    verified: true,
    helpful: 15,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 días atrás
    moderated: true,
    published: true
  },
  {
    id: "review_4",
    productId: "epical1",
    orderId: "order_55667788",
    customerEmail: "cliente4@ejemplo.com", 
    customerName: "Laura P.",
    rating: 4,
    title: "Muy buena experiencia",
    comment: "El PC funciona perfectamente para edición de vídeo 4K. El montaje está muy bien hecho y el cableado es impecable. Solo le pongo 4 estrellas porque tardó un poco más de lo esperado, pero valió la pena la espera.",
    images: [],
    verified: true,
    helpful: 6,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 días atrás
    moderated: true,
    published: true
  },
  {
    id: "review_5",
    productId: "epical3",
    orderId: "order_99887766",
    customerEmail: "cliente5@ejemplo.com",
    customerName: "Carlos S.",
    rating: 5,
    title: "El mejor PC que he tenido",
    comment: "La atención al detalle en el montaje es increíble. Se nota la pasión por lo que hacen. El PC llegó antes de lo esperado y funciona a la perfección. La garantía de 3 años me da mucha tranquilidad. ¡Volveré a comprar sin duda!",
    images: ["https://via.placeholder.com/400x300?text=Clean+Build"],
    verified: true,
    helpful: 9,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días atrás
    moderated: true,
    published: true
  },
  {
    id: "review_6",
    productId: "epical2",
    orderId: "order_44332211",
    customerEmail: "cliente6@ejemplo.com",
    customerName: "Marta V.",
    rating: 5,
    title: "Soporte técnico excelente",
    comment: "Tenía dudas con la compatibilidad de componentes y me lo aclararon todo perfectamente. El PC llegó antes de lo esperado y funciona a la perfección. El informe de temperaturas que incluyen es muy útil. ¡Gracias por todo!",
    images: [],
    verified: true,
    helpful: 7,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 días atrás
    moderated: true,
    published: true
  }
];

// Función para añadir las reseñas de ejemplo
function addExampleReviews() {
  // Guardar las reseñas en localStorage
  localStorage.setItem('epical-reviews', JSON.stringify(exampleReviews));
  
  console.log('✅ Reseñas de ejemplo añadidas correctamente');
  console.log('📊 Estadísticas:');
  console.log('- Total reseñas:', exampleReviews.length);
  console.log('- Productos con reseñas:', [...new Set(exampleReviews.map(r => r.productId))]);
  console.log('- Promedio de rating:', (exampleReviews.reduce((sum, r) => sum + r.rating, 0) / exampleReviews.length).toFixed(1));
  
  // Recargar la página para ver los cambios
  window.location.reload();
}

// Función para limpiar todas las reseñas
function clearAllReviews() {
  localStorage.removeItem('epical-reviews');
  console.log('🗑️ Todas las reseñas eliminadas');
  window.location.reload();
}

// Mostrar instrucciones
console.log('🎯 SISTEMA DE RESEÑAS - INSTRUCCIONES DE PRUEBA');
console.log('');
console.log('Para añadir reseñas de ejemplo:');
console.log('addExampleReviews()');
console.log('');
console.log('Para limpiar todas las reseñas:');
console.log('clearAllReviews()');
console.log('');
console.log('📋 RESEÑAS DE EJEMPLO INCLUIDAS:');
exampleReviews.forEach((review, index) => {
  console.log(`${index + 1}. ${review.customerName} - ${review.rating}⭐ - "${review.title}"`);
});
console.log('');
console.log('🔍 PRODUCTOS CON RESEÑAS:');
console.log('- epical1: 3 reseñas');
console.log('- epical2: 2 reseñas'); 
console.log('- epical3: 1 reseña');
console.log('');
console.log('✨ FUNCIONALIDADES A PROBAR:');
console.log('1. Ver estadísticas de reseñas');
console.log('2. Filtrar por rating (1-5 estrellas)');
console.log('3. Filtrar solo reseñas verificadas');
console.log('4. Filtrar solo reseñas con fotos');
console.log('5. Ordenar por diferentes criterios');
console.log('6. Marcar reseñas como útiles');
console.log('7. Ver imágenes ampliadas');
console.log('8. Intentar dejar reseña (solo si has comprado)');



