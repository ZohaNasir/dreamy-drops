import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ShopClient from "./ShopClient";

export const dynamic = 'force-dynamic';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  await connectDB();
  
  const resolvedParams = await searchParams;
  const category = resolvedParams.category;
  const search = resolvedParams.search;

  let query: any = {};
  if (category) query.category = category;
  if (search) query.title = { $regex: search, $options: "i" };

  const productsRaw = await Product.find(query).sort({ createdAt: -1 });
  
  // Convert mongoose documents to plain JSON to pass to Client Component
  const products = productsRaw.map(p => ({
    _id: p._id.toString(),
    title: p.title,
    description: p.description,
    price: p.price,
    images: p.images,
    category: p.category,
    inStock: p.inStock,
  }));

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-4">
          {category ? category : search ? `Search: ${search}` : "All Products"}
        </h1>
        <div className="w-16 h-px bg-black" />
      </div>
      
      <ShopClient initialProducts={products} />
    </div>
  );
}
