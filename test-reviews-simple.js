// Script simple para añadir reseñas de ejemplo (cualquier usuario puede reseñar)

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getReviewsFromStorage() {
  const raw = localStorage.getItem("epical-reviews");
  return raw ? JSON.parse(raw) : [];
}

function saveReviewsToStorage(reviews) {
  localStorage.setItem("epical-reviews", JSON.stringify(reviews));
}

function addReview(review) {
  const newReview = {
    ...review,
    id: generateUniqueId(),
    createdAt: new Date().toISOString(),
    moderated: true, // Para pruebas, las aprobamos directamente
    published: true,
    helpful: Math.floor(Math.random() * 10), // Reseñas útiles aleatorias
  };
  const reviews = getReviewsFromStorage();
  reviews.push(newReview);
  saveReviewsToStorage(reviews);
  return newReview;
}

function addExampleReviews() {
  clearAllReviews(); // Limpiar antes de añadir nuevas

  const exampleReviews = [
    // Reviews para epical-advanced (epic1)
    {
      productId: "epic1",
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
      productId: "epic1",
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
      productId: "epic1",
      orderId: "guest-review",
      customerEmail: "carlos.ruiz@email.com",
      customerName: "Carlos Ruiz",
      rating: 5,
      title: "Silencioso y potente",
      comment: "Lo que más me ha sorprendido es lo silencioso que es, incluso bajo carga. La potencia es brutal, puedo hacer streaming y jugar a la vez sin ningún lag. ¡EPICAL-PC es top!",
      images: [],
      verified: false,
    },
    // Reviews para epical-pro (epic2)
    {
      productId: "epic2",
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
      productId: "epic2",
      orderId: "guest-review",
      customerEmail: "pedro.sanchez@email.com",
      customerName: "Pedro Sánchez",
      rating: 4,
      title: "Gran relación calidad-precio",
      comment: "Un PC muy equilibrado para el precio. Rinde muy bien en todos los juegos y aplicaciones. La única pega es que la caja es un poco grande para mi escritorio.",
      images: [],
      verified: false,
    },
    // Reviews para epical-ultimate (epic3)
    {
      productId: "epic3",
      orderId: "guest-review",
      customerEmail: "ana.lopez@email.com",
      customerName: "Ana López",
      rating: 5,
      title: "La máquina definitiva",
      comment: "No hay palabras para describir este PC. Es una auténtica bestia. Si buscas lo mejor de lo mejor, no lo dudes. La atención al cliente también fue de 10.",
      images: [],
      verified: false,
    },
    // Algunas reseñas verificadas (simulando compras reales)
    {
      productId: "epic1",
      orderId: "order_12345",
      customerEmail: "cliente.verificado@email.com",
      customerName: "Cliente Verificado",
      rating: 5,
      title: "Comprador verificad - Excelente",
      comment: "Como comprador verificad, puedo confirmar que este PC cumple todas las expectativas. El proceso de compra fue fluido y el producto llegó en perfectas condiciones.",
      images: [],
      verified: true, // Esta sí está verificada
    },
  ];

  exampleReviews.forEach(review => addReview(review));
  console.log("✅ Reseñas de ejemplo añadidas (usuarios pueden reseñar sin comprar)");
  console.log("📊 Reseñas añadidas:", exampleReviews.length);
  console.log("🔍 Verificadas:", exampleReviews.filter(r => r.verified).length);
  console.log("👤 No verificadas:", exampleReviews.filter(r => !r.verified).length);
}

function clearAllReviews() {
  localStorage.removeItem("epical-reviews");
  console.log("🧹 Todas las reseñas han sido eliminadas.");
}

// Función para probar el sistema
function testReviewSystem() {
  console.log("🧪 Probando sistema de reseñas...");
  
  // Añadir reseñas
  addExampleReviews();
  
  // Verificar que se guardaron
  const reviews = getReviewsFromStorage();
  console.log("📋 Reseñas en localStorage:", reviews.length);
  
  // Mostrar estadísticas
  const epic1Reviews = reviews.filter(r => r.productId === "epic1");
  const epic2Reviews = reviews.filter(r => r.productId === "epic2");
  const epic3Reviews = reviews.filter(r => r.productId === "epic3");
  
  console.log("📊 Estadísticas por producto:");
  console.log("- EPICAL Advanced:", epic1Reviews.length, "reseñas");
  console.log("- EPICAL Pro:", epic2Reviews.length, "reseñas");
  console.log("- EPICAL Ultimate:", epic3Reviews.length, "reseñas");
  
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


