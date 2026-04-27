import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductClient from "./ProductClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  
  try {
    const resolvedParams = await params;
    const productRaw = await Product.findById(resolvedParams.id);
    if (!productRaw) return notFound();

    const product = {
      _id: productRaw._id.toString(),
      title: productRaw.title,
      description: productRaw.description,
      price: productRaw.price,
      images: productRaw.images,
      category: productRaw.category,
      inStock: productRaw.inStock,
    };

    return (
      <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <ProductClient product={product} />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
