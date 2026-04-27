"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface ProductType {
  _id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
}

export default function ShopClient({ initialProducts }: { initialProducts: ProductType[] }) {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const handleAddToCart = (e: React.MouseEvent, product: ProductType) => {
    e.preventDefault();
    addItem({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
    toast.success(`${product.title} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent, product: ProductType) => {
    e.preventDefault();
    toggleItem({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });
    if (isInWishlist(product._id)) {
      toast.info(`${product.title} removed from wishlist`);
    } else {
      toast.success(`${product.title} added to wishlist`);
    }
  };

  if (initialProducts.length === 0) {
    return <p className="text-gray-500 font-light">No products found in this category.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
      {initialProducts.map((product, i) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group flex flex-col"
        >
          <Link href={`/product/${product._id}`} className="block relative aspect-[4/5] bg-[#f8f8f8] mb-6 overflow-hidden rounded-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-shadow duration-500">
            <Image
              src={product.images[0] || "https://images.unsplash.com/photo-1599643478524-fb66f7ca1a1e?q=80&w=800"}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-medium text-gray-900 rounded-sm">
              {product.category}
            </div>
            
            {/* Quick Actions Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent flex justify-center gap-4">
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full h-12 w-12 bg-white hover:bg-gray-100 text-black shadow-lg hover:scale-105 transition-transform"
                onClick={(e) => handleToggleWishlist(e, product)}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product._id) ? "fill-black" : ""}`} />
              </Button>
              <Button 
                size="icon" 
                variant="default" 
                className="rounded-full h-12 w-12 bg-black hover:bg-gray-800 text-white shadow-lg hover:scale-105 transition-transform"
                onClick={(e) => handleAddToCart(e, product)}
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </Link>
          <Link href={`/product/${product._id}`} className="flex flex-col flex-1 text-center">
            <h3 className="text-base font-light text-gray-900 mb-1 group-hover:text-gray-500 transition-colors">{product.title}</h3>
            <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
