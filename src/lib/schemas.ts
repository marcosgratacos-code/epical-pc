import { z } from "zod";

// Schema para items del carrito
export const CartItemSchema = z.object({
  id: z.string().min(1, "ID requerido"),
  slug: z.string().min(1),
  name: z.string().min(1, "Nombre requerido"),
  price: z.number().int().positive(), // en céntimos
  quantity: z.number().int().min(1).max(10, "Máximo 10 unidades por item"),
  image: z.string().url().optional().or(z.string().optional()),
});

// Schema para checkout
export const CheckoutSchema = z.object({
  cartItems: z.record(z.string(), z.number().int().positive()),
  currency: z.enum(["eur"]).default("eur"),
}).or(z.object({
  items: z.array(CartItemSchema).min(1, "Al menos un item requerido").max(25, "Máximo 25 items"),
  currency: z.enum(["eur"]).default("eur"),
}));

// Schema para crear producto
export const CreateProductSchema = z.object({
  name: z.string().min(1, "Nombre requerido").max(200),
  slug: z.string().min(1, "Slug requerido").max(100),
  sku: z.string().min(1, "SKU requerido").max(50),
  shortName: z.string().max(100).optional().nullable(),
  price: z.number().positive("Precio debe ser positivo"),
  inStock: z.boolean().optional(),
  stockQty: z.number().int().min(0).max(999),
  tag: z.enum(["OFERTA", "NUEVO", "TOP_VENTAS"]).optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  cpu: z.string().max(200).optional().nullable(),
  gpu: z.string().max(200).optional().nullable(),
  ram: z.string().max(200).optional().nullable(),
  storage: z.string().max(200).optional().nullable(),
  psu: z.string().max(200).optional().nullable(),
  case: z.string().max(200).optional().nullable(),
});

// Schema para actualizar producto
export const UpdateProductSchema = CreateProductSchema.partial().refine(
  data => Object.keys(data).length > 0,
  "Al menos un campo requerido para actualizar"
);

// Schema para crear orden
export const CreateOrderSchema = z.object({
  sessionId: z.string().optional().nullable(),
  customerEmail: z.string().email("Email inválido"),
  customerName: z.string().optional().nullable(),
  shippingInfo: z.object({
    nombre: z.string().optional(),
    direccion: z.string().optional(),
    ciudad: z.string().optional(),
    codigoPostal: z.string().optional(),
    pais: z.string().default("ES"),
    telefono: z.string().optional(),
  }),
  items: z.array(z.object({
    id: z.string(),
    nombre: z.string(),
    nombreCompleto: z.string().optional(),
    cantidad: z.number().int().positive(),
    precio: z.number().positive(),
    image: z.string().optional(),
  })).min(1),
  total: z.number().positive(),
});

// Helper para validar con Zod y devolver respuesta de error
export function validateWithZod<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors = result.error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
  return { success: false, error: errors };
}

