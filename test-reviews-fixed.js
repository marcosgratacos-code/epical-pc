// Script CORREGIDO para añadir reseñas (compatible con el sistema actual)

function generateReviewId() {
  return `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getReviewsFromStorage() {
  const raw = localStorage.getItem("epical-reviews");
  return raw ? JSON.parse(raw) : [];
}

function saveReviewToStorage(review) {
  const reviews = getReviewsFromStorage();
  reviews.unshift(review); // Añadir al principio (más recientes primero)
  localStorage.setItem("epical-reviews", JSON.stringify(reviews));
}

function addReview(review) {
  const newReview = {
    ...review,
    id: generateReviewId(),
    createdAt: new Date().toISOString(),
    moderated: true, // Para pruebas, las aprobamos directamente
    published: true,
    helpful: Math.floor(Math.random() * 10), // Reseñas útiles aleatorias
  };
  saveReviewToStorage(newReview);
  return newReview;
}

function addExampleReviews() {
  // Limpiar reseñas existentes
  localStorage.removeItem("epical-reviews");
  console.log("🧹 Reseñas anteriores eliminadas");

  const exampleReviews = [
    // Reviews para titan-advanced (titan1)
    {
      productId: "titan1",
      orderId: "guest-review",
      customerEmail: "juan.perez@email.com",
      customerName: "Juan Pérez",
      rating: 5,
      title: "¡Una bestia de PC!",
      comment: "Este PC es increíble, corre todos mis juegos en ultra sin problemas. El montaje es impecable y la validación térmica me da mucha tranquilidad. ¡Totalmente recomendado!",
      images: [],
      verified: false, // No verificada porque no ha comprado
    },
    {
      productId: "titan1",
      orderId: "guest-review",
      customerEmail: "maria.garcia@email.com",
      customerName: "María García",
      rating: 4,
      title: "Muy buen rendimiento",
      comment: "Estoy muy contenta con mi nuevo PC. El rendimiento es excelente para gaming y edición. Solo le pongo 4 estrellas porque el envío tardó un día más de lo esperado.",
      images: [],
      verified: false,
    },
    {
      productId: "titan1",
      orderId: "guest-review",
      customerEmail: "carlos.ruiz@email.com",
      customerName: "Carlos Ruiz",
      rating: 5,
      title: "Silencioso y potente",
      comment: "Lo que más me ha sorprendido es lo silencioso que es, incluso bajo carga. La potencia es brutal, puedo hacer streaming y jugar a la vez sin ningún lag. ¡TITAN-PC es top!",
      images: [],
      verified: false,
    },
    // Algunas reseñas verificadas (simulando compras reales)
    {
      productId: "titan1",
      orderId: "order_12345",
      customerEmail: "cliente.verificado@email.com",
      customerName: "Cliente Verificado",
      rating: 5,
      title: "Comprador verificad - Excelente",
      comment: "Como comprador verificad, puedo confirmar que este PC cumple todas las expectativas. El proceso de compra fue fluido y el producto llegó en perfectas condiciones.",
      images: [],
      verified: true, // Esta sí está verificada
    },
    // Reviews para otros productos
    {
      productId: "titan2",
      orderId: "guest-review",
      customerEmail: "laura.fernandez@email.com",
      customerName: "Laura Fernández",
      rating: 5,
      title: "Perfecto para mi trabajo",
      comment: "Necesitaba un PC potente para diseño 3D y este modelo ha superado mis expectativas. El soporte técnico fue muy útil para elegir los componentes. ¡Gracias!",
      images: [],
      verified: false,
    },
    {
      productId: "titan3",
      orderId: "guest-review",
      customerEmail: "ana.lopez@email.com",
      customerName: "Ana López",
      rating: 5,
      title: "La máquina definitiva",
      comment: "No hay palabras para describir este PC. Es una auténtica bestia. Si buscas lo mejor de lo mejor, no lo dudes. La atención al cliente también fue de 10.",
      images: [],
      verified: false,
    },
  ];

  exampleReviews.forEach(review => addReview(review));
  console.log("✅ Reseñas de ejemplo añadidas (compatible con el sistema actual)");
  console.log("📊 Reseñas añadidas:", exampleReviews.length);
  console.log("🔍 Verificadas:", exampleReviews.filter(r => r.verified).length);
  console.log("👤 No verificadas:", exampleReviews.filter(r => !r.verified).length);
  
  // Verificar que se guardaron correctamente
  const savedReviews = getReviewsFromStorage();
  console.log("💾 Reseñas guardadas en localStorage:", savedReviews.length);
  
  // Mostrar estadísticas por producto
  const titan1Reviews = savedReviews.filter(r => r.productId === "titan1");
  const titan2Reviews = savedReviews.filter(r => r.productId === "titan2");
  const titan3Reviews = savedReviews.filter(r => r.productId === "titan3");
  
  console.log("📊 Estadísticas por producto:");
  console.log("- EPICAL Advanced (titan1):", titan1Reviews.length, "reseñas");
  console.log("- EPICAL Pro (titan2):", titan2Reviews.length, "reseñas");
  console.log("- EPICAL Ultimate (titan3):", titan3Reviews.length, "reseñas");
}

function clearAllReviews() {
  localStorage.removeItem("epical-reviews");
  console.log("🧹 Todas las reseñas han sido eliminadas.");
}

function testReviewSystem() {
  console.log("🧪 Probando sistema de reseñas CORREGIDO...");
  
  // Añadir reseñas
  addExampleReviews();
  
  console.log("🎉 ¡Sistema listo para probar!");
  console.log("💡 Ahora puedes ir a cualquier producto y ver las reseñas");
  console.log("💡 También puedes dejar tu propia reseña (sin necesidad de comprar)");
}

// Ejecutar el test
testReviewSystem();

// Funciones disponibles en consola:
console.log("🔧 Funciones disponibles:");
console.log("- addExampleReviews(): Añadir reseñas de ejemplo");
console.log("- clearAllReviews(): Limpiar todas las reseñas");
console.log("- testReviewSystem(): Ejecutar test completo");
console.log("- getReviewsFromStorage(): Ver reseñas guardadas");

















