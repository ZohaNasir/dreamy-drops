import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Product from "../models/Product";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const mockProducts = [
  {
    title: "Gucci Handbag - Green Floral Design",
    description: "Elegant green floral design handbag. Premium quality luxury piece.",
    price: 1850.00,
    images: ["https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800"],
    category: "Bags",
    tags: ["gucci", "handbag", "green"],
    inStock: true,
    instagramUrl: "https://www.instagram.com/p/DXnlsLPggQ-/"
  },
  {
    title: "Fendi Sneakers - White and Pink",
    description: "Classic white and pink sneakers. Comfortable and stylish.",
    price: 890.00,
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800"],
    category: "Shoes",
    tags: ["fendi", "sneakers", "pink"],
    inStock: true,
    instagramUrl: "https://www.instagram.com/p/DXnll1cApLp/"
  },
  {
    title: "Gucci Handbag - Green Leather",
    description: "Timeless green leather handbag with signature hardware.",
    price: 2100.00,
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800"],
    category: "Bags",
    tags: ["gucci", "leather", "green"],
    inStock: true,
    instagramUrl: "https://www.instagram.com/p/DXnlikGAj_7/"
  },
  {
    title: "Gucci Sandals - Light Blue Logo",
    description: "Light blue logo sandals for the perfect summer look.",
    price: 650.00,
    images: ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800"],
    category: "Shoes",
    tags: ["gucci", "sandals", "blue"],
    inStock: true,
    instagramUrl: "https://www.instagram.com/p/DXnlevnArIQ/"
  },
  {
    title: "Gucci Sneakers - Classic White/Red/Green",
    description: "Signature classic sneakers with red and green stripes.",
    price: 850.00,
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800"],
    category: "Shoes",
    tags: ["gucci", "sneakers", "classic"],
    inStock: true,
    instagramUrl: "https://www.instagram.com/p/DXnlXO4gstS/"
  },
  {
    title: "Hermes Sandals - Black Leather",
    description: "Elegant black leather sandals. Minimalist and luxurious.",
    price: 720.00,
    images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800"],
    category: "Shoes",
    tags: ["hermes", "sandals", "black"],
    inStock: true,
    instagramUrl: "https://www.instagram.com/p/DXmJz4MjV55/"
  },
  {
    title: "Hermes Sandals - Beige Leather",
    description: "Beige leather sandals. Perfect neutral tone for any outfit.",
    price: 720.00,
    images: ["https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=800"],
    category: "Shoes",
    tags: ["hermes", "sandals", "beige"],
    inStock: true,
    instagramUrl: "https://www.instagram.com/p/DXmJveqjRKv/"
  },
  {
    title: "Louis Vuitton Sandals - Beige Shearling",
    description: "Cozy beige shearling sandals with monogram details.",
    price: 1150.00,
    images: ["https://images.unsplash.com/photo-1604081077366-2dbb8cc9862f?q=80&w=800"],
    category: "Shoes",
    tags: ["louis vuitton", "sandals", "shearling"],
    inStock: true,
    instagramUrl: "https://www.instagram.com/p/DXmI73WjYnV/"
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
