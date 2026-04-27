import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Product from "../models/Product";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const mockProducts = [
  {
    title: "Celestial Pearl Necklace",
    description: "Handcrafted pearl necklace with a minimalist celestial charm. Perfect for any elegant occasion.",
    price: 45.99,
    images: ["https://images.unsplash.com/photo-1599643478524-fb66f7ca1a1e?q=80&w=800"],
    category: "Necklaces",
    tags: ["pearl", "minimalist", "gold"],
    inStock: true,
  },
  {
    title: "Rose Quartz Drop Earrings",
    description: "Delicate drop earrings featuring authentic rose quartz crystals.",
    price: 35.0,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800"],
    category: "Earrings",
    tags: ["quartz", "pink", "silver"],
    inStock: true,
  },
  {
    title: "Vintage Gold Signet Ring",
    description: "A timeless vintage-inspired signet ring crafted in 14k solid gold.",
    price: 120.0,
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b2548e?q=80&w=800"],
    category: "Rings",
    tags: ["gold", "vintage", "ring"],
    inStock: true,
  },
  {
    title: "Sterling Silver Chain Bracelet",
    description: "Everyday staple sterling silver chain bracelet with a secure clasp.",
    price: 55.0,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800"],
    category: "Bracelets",
    tags: ["silver", "chain", "everyday"],
    inStock: true,
  },
  {
    title: "Emerald Cut Pendant",
    description: "Stunning emerald cut pendant on a delicate 18-inch chain.",
    price: 85.0,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"],
    category: "Necklaces",
    tags: ["emerald", "gold", "pendant"],
    inStock: true,
  },
  {
    title: "Diamond Studs Duo",
    description: "Classic duo of conflict-free diamond studs. The perfect gift.",
    price: 250.0,
    images: ["https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=800"],
    category: "Earrings",
    tags: ["diamond", "studs", "classic"],
    inStock: true,
  },
  {
    title: "Bohemian Turquoise Ring",
    description: "Statement bohemian ring featuring a natural turquoise stone.",
    price: 48.0,
    images: ["https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?q=80&w=800"],
    category: "Rings",
    tags: ["turquoise", "boho", "silver"],
    inStock: true,
  },
  {
    title: "Layered Gold Choker",
    description: "Pre-layered gold choker set for effortless styling.",
    price: 65.0,
    images: ["https://images.unsplash.com/photo-1599643477874-c5a8106a71bb?q=80&w=800"],
    category: "Necklaces",
    tags: ["gold", "layered", "choker"],
    inStock: true,
  },
  {
    title: "Opal Sunburst Earrings",
    description: "Dazzling opal stones set in a gold sunburst design.",
    price: 72.0,
    images: ["https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=800"],
    category: "Earrings",
    tags: ["opal", "gold", "sunburst"],
    inStock: true,
  },
  {
    title: "Engraved Locket",
    description: "Vintage-style engraved locket. Holds two small photos.",
    price: 90.0,
    images: ["https://images.unsplash.com/photo-1599643478514-4fb003b54432?q=80&w=800"],
    category: "Necklaces",
    tags: ["locket", "vintage", "gold"],
    inStock: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Product.deleteMany({});

    console.log("Cleared existing data");

    const adminPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin User",
      email: "admin@dreamydrops.com",
      password: adminPassword,
      role: "ADMIN",
    });

    console.log("Admin user created");

    await Product.insertMany(mockProducts);
    console.log("Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
