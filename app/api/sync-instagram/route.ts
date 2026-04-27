import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    // This endpoint is designed to be called by an external scraper (e.g., Apify)
    // or a webhook from an Instagram integration.
    
    // Validate authorization header
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.SYNC_SECRET || "default_secret"}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { posts } = body;

    if (!Array.isArray(posts)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    await connectDB();

    let syncedCount = 0;

    for (const post of posts) {
      // Map Instagram post data to Product schema
      // This is a stub for the actual mapping logic
      const productData = {
        title: post.title || "Instagram Product",
        description: post.caption || "No description provided.",
        price: post.price || 0,
        images: post.images || [],
        category: post.category || "Uncategorized",
        instagramUrl: post.url || "",
      };

      // Upsert product based on instagramUrl to avoid duplicates
      if (productData.instagramUrl) {
         await Product.findOneAndUpdate(
           { instagramUrl: productData.instagramUrl },
           productData,
           { upsert: true, new: true }
         );
         syncedCount++;
      }
    }

    return NextResponse.json({ success: true, message: `Synced ${syncedCount} products` }, { status: 200 });
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
