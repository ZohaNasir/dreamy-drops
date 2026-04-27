import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    tags: [{ type: String }],
    inStock: { type: Boolean, default: true },
    instagramUrl: { type: String }, // Link back to original IG post
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
