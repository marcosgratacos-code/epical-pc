// Script para añadir reseñas de ejemplo (SOLO USUARIOS VERIFICADOS)

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
    // Reviews para epical-advanced (epic1) - SOLO USUARIOS VERIFICADOS
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
    {
      productId: "epic1",
      orderId: "order_12346",
      customerEmail: "maria.garcia@email.com",
      customerName: "María García",
      rating: 4,
      title: "Muy buen rendimiento",
      comment: "Estoy muy contenta con mi nuevo PC. El rendimiento es excelente para gaming y edición. Solo le pongo 4 estrellas porque el envío tardó un día más de lo esperado.",
      images: [],
      verified: true,
    },
    {
      productId: "epic1",
      orderId: "order_12347",
      customerEmail: "carlos.ruiz@email.com",
      customerName: "Carlos Ruiz",
      rating: 5,
      title: "Silencioso y potente",
      comment: "Lo que más me ha sorprendido es lo silencioso que es, incluso bajo carga. La potencia es brutal, puedo hacer streaming y jugar a la vez sin ningún lag. ¡EPICAL-PC es top!",
      images: [],
      verified: true,
    },
    // Reviews para otros productos
    {
      productId: "epic2",
      orderId: "order_12348",
      customerEmail: "laura.fernandez@email.com",
      customerName: "Laura Fernández",
      rating: 5,
      title: "Perfecto para mi trabajo",
      comment: "Necesitaba un PC potente para diseño 3D y este modelo ha superado mis expectativas. El soporte técnico fue muy útil para elegir los componentes. ¡Gracias!",
      images: [],
      verified: true,
    },
    {
      productId: "epic3",
      orderId: "order_12349",
      customerEmail: "ana.lopez@email.com",
      customerName: "Ana López",
      rating: 5,
      title: "La máquina definitiva",
      comment: "No hay palabras para describir este PC. Es una auténtica bestia. Si buscas lo mejor de lo mejor, no lo dudes. La atención al cliente también fue de 10.",
      images: [],
      verified: true,
    },
    {
      productId: "epic2",
      orderId: "order_12350",
      customerEmail: "juan.perez@email.com",
      customerName: "Juan Pérez",
      rating: 4,
      title: "Buen precio-calidad",
      comment: "Por el precio que tiene, es una excelente opción. Cumple perfectamente para gaming en 1080p y algunas tareas de edición. Recomendado.",
      images: [],
      verified: true,
    },
  ];

  exampleReviews.forEach(review => addReview(review));
  console.log("✅ Reseñas de ejemplo añadidas (SOLO USUARIOS VERIFICADOS)");
  console.log("📊 Reseñas añadidas:", exampleReviews.length);
  console.log("🔍 Todas verificadas:", exampleReviews.filter(r => r.verified).length);
  
  // Verificar que se guardaron correctamente
  const savedReviews = getReviewsFromStorage();
  console.log("💾 Reseñas guardadas en localStorage:", savedReviews.length);
  
  // Mostrar estadísticas por producto
  const epic1Reviews = savedReviews.filter(r => r.productId === "epic1");
  const epic2Reviews = savedReviews.filter(r => r.productId === "epic2");
  const epic3Reviews = savedReviews.filter(r => r.productId === "epic3");
  
  console.log("📊 Estadísticas por producto:");
  console.log("- EPICAL Advanced (epic1):", epic1Reviews.length, "reseñas");
  console.log("- EPICAL Pro (epic2):", epic2Reviews.length, "reseñas");
  console.log("- EPICAL Ultimate (epic3):", epic3Reviews.length, "reseñas");
  
  // Calcular promedios
  const epic1Avg = epic1Reviews.reduce((sum, r) => sum + r.rating, 0) / epic1Reviews.length;
  const epic2Avg = epic2Reviews.reduce((sum, r) => sum + r.rating, 0) / epic2Reviews.length;
  const epic3Avg = epic3Reviews.reduce((sum, r) => sum + r.rating, 0) / epic3Reviews.length;
  
  console.log("⭐ Promedios de valoración:");
  console.log("- EPICAL Advanced:", epic1Avg.toFixed(1), "estrellas");
  console.log("- EPICAL Pro:", epic2Avg.toFixed(1), "estrellas");
  console.log("- EPICAL Ultimate:", epic3Avg.toFixed(1), "estrellas");
}

function clearAllReviews() {
  localStorage.removeItem("epical-reviews");
  console.log("🧹 Todas las reseñas han sido eliminadas.");
}

function testReviewSystem() {
  console.log("🧪 Probando sistema de reseñas (SOLO VERIFICADOS)...");
  
  // Añadir reseñas
  addExampleReviews();
  
  console.log("🎉 ¡Sistema listo para probar!");
  console.log("💡 Ahora puedes ir a cualquier producto y ver las estrellas en las tarjetas");
  console.log("💡 Solo usuarios que han comprado pueden dejar reseñas");
}

// Ejecutar el test
testReviewSystem();

// Funciones disponibles en consola:
console.log("🔧 Funciones disponibles:");
console.log("- addExampleReviews(): Añadir reseñas de ejemplo");
console.log("- clearAllReviews(): Limpiar todas las reseñas");
console.log("- testReviewSystem(): Ejecutar test completo");
console.log("- getReviewsFromStorage(): Ver reseñas guardadas");


