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
          <Link href={`/product/${product._id}`} className="block relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
            <Image
              src={product.images[0] || "https://images.unsplash.com/photo-1599643478524-fb66f7ca1a1e?q=80&w=800"}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Quick Actions Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent flex justify-end gap-2">
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full h-10 w-10 bg-white hover:bg-gray-100 text-black"
                onClick={(e) => handleToggleWishlist(e, product)}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(product._id) ? "fill-black" : ""}`} />
              </Button>
              <Button 
                size="icon" 
                variant="default" 
                className="rounded-full h-10 w-10 bg-black hover:bg-gray-800 text-white"
                onClick={(e) => handleAddToCart(e, product)}
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </div>
          </Link>
          <Link href={`/product/${product._id}`} className="flex flex-col flex-1">
            <h3 className="text-sm font-medium text-gray-900 group-hover:underline underline-offset-4">{product.title}</h3>
            <p className="text-sm text-gray-500 mt-1">${product.price.toFixed(2)}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
