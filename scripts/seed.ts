import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Product from "../models/Product";
import dotenv from "dotenv";

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
  },
  {
    title: "Gucci Handbag - Green Leather",
    description: "Timeless green leather handbag with signature hardware.",
    price: 2100.00,
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800"],
    category: "Bags",
    tags: ["gucci", "leather", "green"],
    inStock: true,
  },
  {
    title: "Gucci Sandals - Light Blue Logo",
    description: "Light blue logo sandals for the perfect summer look.",
    price: 650.00,
    images: ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800"],
    category: "Shoes",
    tags: ["gucci", "sandals", "blue"],
    inStock: true,
  },
  {
    title: "Gucci Sneakers - Classic White/Red/Green",
    description: "Signature classic sneakers with red and green stripes.",
    price: 850.00,
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800"],
    category: "Shoes",
    tags: ["gucci", "sneakers", "classic"],
    inStock: true,
  },
  {
    title: "Hermes Sandals - Black Leather",
    description: "Elegant black leather sandals. Minimalist and luxurious.",
    price: 720.00,
    images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800"],
    category: "Shoes",
    tags: ["hermes", "sandals", "black"],
    inStock: true,
  },
  {
    title: "Hermes Sandals - Beige Leather",
    description: "Beige leather sandals. Perfect neutral tone for any outfit.",
    price: 720.00,
    images: ["https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=800"],
    category: "Shoes",
    tags: ["hermes", "sandals", "beige"],
    inStock: true,
  },
  {
    title: "Louis Vuitton Sandals - Beige Shearling",
    description: "Cozy beige shearling sandals with monogram details.",
    price: 1150.00,
    images: ["https://images.unsplash.com/photo-1604081077366-2dbb8cc9862f?q=80&w=800"],
    category: "Shoes",
    tags: ["louis vuitton", "sandals", "shearling"],
    inStock: true,
  },
  {
    title: "Chanel Classic Flap Bag - Black",
    description: "The ultimate luxury icon. Quilted black leather with gold-tone hardware.",
    price: 8500.00,
    images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800"],
    category: "Bags",
    tags: ["chanel", "bag", "black", "leather"],
    inStock: true,
  },
  {
    title: "Dior Saddle Bag - Oblique",
    description: "Signature Dior oblique canvas saddle bag with aged gold hardware.",
    price: 3800.00,
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800"],
    category: "Bags",
    tags: ["dior", "bag", "oblique"],
    inStock: true,
  },
  {
    title: "YSL Kate Shoulder Bag - Nude",
    description: "Elegant nude leather shoulder bag featuring the iconic YSL monogram.",
    price: 2400.00,
    images: ["https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800"],
    category: "Bags",
    tags: ["ysl", "bag", "nude", "leather"],
    inStock: true,
  },
  {
    title: "Prada Nylon Re-Edition 2000",
    description: "Classic black nylon mini bag with enamel triangle logo.",
    price: 1200.00,
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800"],
    category: "Bags",
    tags: ["prada", "bag", "nylon", "black"],
    inStock: true,
  },
  {
    title: "Bottega Veneta Jodie Mini",
    description: "Iconic intrecciato leather mini hobo bag in vibrant green.",
    price: 2650.00,
    images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800"],
    category: "Bags",
    tags: ["bottega", "bag", "leather", "green"],
    inStock: true,
  },
  {
    title: "Valentino Garavani Rockstud Pumps",
    description: "Nude patent leather pumps adorned with signature rockstuds.",
    price: 1100.00,
    images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800"],
    category: "Shoes",
    tags: ["valentino", "shoes", "pumps", "studs"],
    inStock: true,
  },
  {
    title: "Christian Louboutin Pigalle 100",
    description: "Classic black patent stiletto pumps featuring the iconic red sole.",
    price: 795.00,
    images: ["https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=800"],
    category: "Shoes",
    tags: ["louboutin", "shoes", "pumps", "black"],
    inStock: true,
  },
  {
    title: "Balenciaga Triple S Sneakers",
    description: "Chunky oversized sneakers in a white and grey colorway.",
    price: 1150.00,
    images: ["https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=800"],
    category: "Shoes",
    tags: ["balenciaga", "sneakers", "chunky", "white"],
    inStock: true,
  },
  {
    title: "Alexander McQueen Oversized Sneakers",
    description: "White leather sneakers with a black suede heel counter.",
    price: 590.00,
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800"],
    category: "Shoes",
    tags: ["mcqueen", "sneakers", "leather", "white"],
    inStock: true,
  },
  {
    title: "Cartier Love Bracelet - Yellow Gold",
    description: "The timeless symbol of love, crafted in 18k yellow gold.",
    price: 7350.00,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800"],
    category: "Jewelry",
    tags: ["cartier", "bracelet", "gold", "love"],
    inStock: true,
  },
  {
    title: "Tiffany T Smile Pendant",
    description: "Delicate and elegant curved pendant in 18k rose gold.",
    price: 1100.00,
    images: ["https://images.unsplash.com/photo-1599643478524-fb66f7ca1a1e?q=80&w=800"],
    category: "Jewelry",
    tags: ["tiffany", "necklace", "gold", "pendant"],
    inStock: true,
  },
  {
    title: "Van Cleef Alhambra Necklace",
    description: "Vintage Alhambra pendant featuring a mother-of-pearl motif.",
    price: 2950.00,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800"],
    category: "Jewelry",
    tags: ["vca", "necklace", "pearl", "gold"],
    inStock: true,
  },
  {
    title: "Bvlgari Serpenti Ring",
    description: "Captivating snake motif ring in white gold with pavé diamonds.",
    price: 5800.00,
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b2548e?q=80&w=800"],
    category: "Jewelry",
    tags: ["bvlgari", "ring", "diamonds", "gold"],
    inStock: true,
  },
  {
    title: "Rolex Datejust 36 - Two Tone",
    description: "Classic timepiece featuring a fluted bezel and Jubilee bracelet.",
    price: 12500.00,
    images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800"],
    category: "Jewelry",
    tags: ["rolex", "watch", "gold", "steel"],
    inStock: true,
  },
  {
    title: "Hermes Clic Clac H Bracelet",
    description: "Iconic enamel bracelet with gold-plated H closure.",
    price: 700.00,
    images: ["https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?q=80&w=800"],
    category: "Jewelry",
    tags: ["hermes", "bracelet", "enamel", "gold"],
    inStock: true,
  },
  {
    title: "Gucci GG Marmont Mini Bag",
    description: "Softly structured chain shoulder bag with an oversized flap closure.",
    price: 2350.00,
    images: ["https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800"],
    category: "Bags",
    tags: ["gucci", "bag", "leather", "black"],
    inStock: true,
  },
  {
    title: "Louis Vuitton Neverfull MM",
    description: "Spacious and elegant tote in classic monogram canvas.",
    price: 2030.00,
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800"],
    category: "Bags",
    tags: ["louis vuitton", "bag", "tote", "monogram"],
    inStock: true,
  },
  {
    title: "Saint Laurent Opyum Pumps",
    description: "Striking black patent leather pumps with a YSL logo heel.",
    price: 1250.00,
    images: ["https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=800"],
    category: "Shoes",
    tags: ["ysl", "shoes", "pumps", "black"],
    inStock: true,
  },
  {
    title: "David Yurman Cable Classics Bracelet",
    description: "Signature twisted cable bracelet with 14k gold dome accents.",
    price: 495.00,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800"],
    category: "Jewelry",
    tags: ["yurman", "bracelet", "silver", "gold"],
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
    await Product.insertMany(mockProducts);
    console.log(`Seeded ${mockProducts.length} products successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
