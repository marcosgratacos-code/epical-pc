import { Schema, model, models } from "mongoose";

const ProductViewSchema = new Schema(
  {
    userId: { type: String, default: null, index: true }, // null si anónimo
    sessionId: { type: String, required: true, index: true }, // id de sesión de navegación
    slug: { type: String, required: true, index: true },
    viewedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

// índices útiles
ProductViewSchema.index({ sessionId: 1, viewedAt: -1 });
ProductViewSchema.index({ slug: 1, viewedAt: -1 });
ProductViewSchema.index({ userId: 1, viewedAt: -1 });

export const ProductView = models.ProductView || model("ProductView", ProductViewSchema);
