import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Product from "../models/Product";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env" });

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

    // Crawl public/Products to dynamically create products
    const productsDir = path.join(process.cwd(), 'public', 'Products');
    const finalProducts: any[] = [];
    
    // Function to process a product directory
    const processProductDir = (productDirPath: string, categoryName: string, productName: string) => {
      const files = fs.readdirSync(productDirPath).filter(f => !f.startsWith('.'));
      const images = files.map(file => {
        // Build URL relative to public folder
        const relPath = path.relative(path.join(process.cwd(), 'public'), path.join(productDirPath, file));
        return `/${relPath.replace(/\\/g, '/')}`; // Normalize to forward slashes
      });
      
      if (images.length > 0) {
        // Generate random realistic prices based on category
        let price = Math.floor(Math.random() * (1200 - 300 + 1)) + 300;
        if (categoryName === "Watches") price = Math.floor(Math.random() * (15000 - 4000 + 1)) + 4000;
        if (categoryName === "Handbags") price = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;

        finalProducts.push({
          title: productName,
          description: `Authentic ${productName}. Excellent condition, luxury piece from ${categoryName}.`,
          price: price,
          category: categoryName,
          tags: ["luxury", categoryName.toLowerCase(), "designer"],
          inStock: true,
          images: images
        });
      }
    };

    if (fs.existsSync(productsDir)) {
      const mainItems = fs.readdirSync(productsDir).filter(f => !f.startsWith('.') && !f.endsWith('.csv'));
      
      for (const item of mainItems) {
        const itemPath = path.join(productsDir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          // Check if this directory contains other directories (it's a category) or just files (it's a product)
          const subItems = fs.readdirSync(itemPath).filter(f => !f.startsWith('.'));
          let hasSubDirs = false;
          
          for (const subItem of subItems) {
            const subStat = fs.statSync(path.join(itemPath, subItem));
            if (subStat.isDirectory()) {
              hasSubDirs = true;
              break;
            }
          }
          
          if (hasSubDirs) {
            // It's a category (e.g. Handbags, Shoes, Watches)
            for (const subItem of subItems) {
              const productPath = path.join(itemPath, subItem);
              if (fs.statSync(productPath).isDirectory()) {
                processProductDir(productPath, item, subItem);
              }
            }
          } else {
            // It's a direct product directory (e.g. Burberry Faux Fur Trim...)
            processProductDir(itemPath, "Accessories", item);
          }
        }
      }
    }

    // Insert Products
    if (finalProducts.length > 0) {
      await Product.insertMany(finalProducts);
      console.log(`Seeded ${finalProducts.length} dynamic products successfully using exact folder structures!`);
    } else {
      console.log("No products found in public/Products to seed.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
