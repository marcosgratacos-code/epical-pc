import { Schema, model, models } from "mongoose";

const RecentlyViewedSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        id: String,
        slug: String,
        name: String,
        price: Number,
        image: String,
        viewedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const RecentlyViewed =
  models.RecentlyViewed || model("RecentlyViewed", RecentlyViewedSchema);
