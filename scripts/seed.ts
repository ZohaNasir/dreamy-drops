import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Product from "../models/Product";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env" });

const mockProducts = [
  {
    title: "Dreamy Drops - Collection Piece 1",
    description: "Premium handcrafted piece from our exclusive collection. Made with elegant detailing.",
    price: 1850.00,
    category: "Bags",
    tags: ["luxury", "handbag", "exclusive"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 2",
    description: "Classic design with modern aesthetic. Comfortable and stylish.",
    price: 890.00,
    category: "Shoes",
    tags: ["luxury", "sneakers", "classic"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 3",
    description: "Timeless elegance with signature hardware.",
    price: 2100.00,
    category: "Bags",
    tags: ["luxury", "leather", "classic"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 4",
    description: "Perfect piece for the perfect summer look.",
    price: 650.00,
    category: "Shoes",
    tags: ["luxury", "sandals", "summer"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 5",
    description: "Signature classic style with iconic stripes.",
    price: 850.00,
    category: "Shoes",
    tags: ["luxury", "sneakers", "classic"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 6",
    description: "Elegant and luxurious minimal design.",
    price: 720.00,
    category: "Shoes",
    tags: ["luxury", "sandals", "minimalist"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 7",
    description: "Perfect neutral tone for any outfit.",
    price: 720.00,
    category: "Shoes",
    tags: ["luxury", "sandals", "neutral"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 8",
    description: "Cozy details with iconic monograms.",
    price: 1150.00,
    category: "Shoes",
    tags: ["luxury", "sandals", "cozy"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 9",
    description: "The ultimate luxury icon with elegant hardware.",
    price: 8500.00,
    category: "Bags",
    tags: ["luxury", "bag", "iconic"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 10",
    description: "Signature canvas with aged hardware.",
    price: 3800.00,
    category: "Bags",
    tags: ["luxury", "bag", "canvas"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 11",
    description: "Elegant leather bag featuring the iconic monogram.",
    price: 2400.00,
    category: "Bags",
    tags: ["luxury", "bag", "leather"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 12",
    description: "Classic design with signature enamel logo.",
    price: 1200.00,
    category: "Bags",
    tags: ["luxury", "bag", "classic"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 13",
    description: "Iconic woven leather mini hobo bag.",
    price: 2650.00,
    category: "Bags",
    tags: ["luxury", "bag", "leather"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 14",
    description: "Elegant pumps adorned with signature studs.",
    price: 1100.00,
    category: "Shoes",
    tags: ["luxury", "shoes", "pumps"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 15",
    description: "Classic stiletto pumps featuring the iconic red sole.",
    price: 795.00,
    category: "Shoes",
    tags: ["luxury", "shoes", "pumps"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 16",
    description: "Chunky oversized sneakers in unique colorways.",
    price: 1150.00,
    category: "Shoes",
    tags: ["luxury", "sneakers", "chunky"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 17",
    description: "Leather sneakers with bold suede heel counter.",
    price: 590.00,
    category: "Shoes",
    tags: ["luxury", "sneakers", "leather"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 18",
    description: "The timeless symbol of luxury, crafted in gold.",
    price: 7350.00,
    category: "Jewelry",
    tags: ["luxury", "bracelet", "gold"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 19",
    description: "Delicate and elegant curved piece.",
    price: 1100.00,
    category: "Jewelry",
    tags: ["luxury", "necklace", "elegant"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 20",
    description: "Vintage pendant featuring a beautiful motif.",
    price: 2950.00,
    category: "Jewelry",
    tags: ["luxury", "necklace", "vintage"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 21",
    description: "Captivating ring with pavé details.",
    price: 5800.00,
    category: "Jewelry",
    tags: ["luxury", "ring", "diamonds"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 22",
    description: "Classic timepiece featuring a fluted bezel.",
    price: 12500.00,
    category: "Jewelry",
    tags: ["luxury", "watch", "classic"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 23",
    description: "Iconic enamel bracelet with gold-plated closure.",
    price: 700.00,
    category: "Jewelry",
    tags: ["luxury", "bracelet", "enamel"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 24",
    description: "Softly structured shoulder bag with an oversized closure.",
    price: 2350.00,
    category: "Bags",
    tags: ["luxury", "bag", "leather"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 25",
    description: "Spacious and elegant tote in classic canvas.",
    price: 2030.00,
    category: "Bags",
    tags: ["luxury", "bag", "tote"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 26",
    description: "Striking patent leather piece with logo heel.",
    price: 1250.00,
    category: "Shoes",
    tags: ["luxury", "shoes", "black"],
    inStock: true,
  },
  {
    title: "Dreamy Drops - Collection Piece 27",
    description: "Signature twisted cable bracelet with dome accents.",
    price: 495.00,
    category: "Jewelry",
    tags: ["luxury", "bracelet", "silver"],
    inStock: true,
  }
];

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Read local images from public/Products
    const productsDir = path.join(process.cwd(), 'public', 'Products');
    let imageFiles: string[] = [];
    if (fs.existsSync(productsDir)) {
      imageFiles = fs.readdirSync(productsDir).filter(file => !file.endsWith('.csv') && !file.startsWith('.'));
    }

    // Map images to products
    const finalProducts = mockProducts.map((product, index) => {
      let imagePath = "https://images.unsplash.com/photo-1599643478524-fb66f7ca1a1e?q=80&w=800";
      if (imageFiles.length > 0) {
        // Round robin image assignment
        imagePath = `/Products/${imageFiles[index % imageFiles.length]}`;
      }
      return {
        ...product,
        images: [imagePath]
      };
    });

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Create Admin User
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin",
      email: "admin@dreamydrops.com",
      password: hashedPassword,
      role: "ADMIN",
    });
    console.log("Admin user created");

    // Insert Products
    await Product.insertMany(finalProducts);
    console.log(`Seeded ${finalProducts.length} products successfully using local images!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
