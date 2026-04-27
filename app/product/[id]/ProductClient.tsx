"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface ProductType {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
}

export default function ProductClient({ product }: { product: ProductType }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity,
    });
    toast.success(`${quantity} x ${product.title} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleItem({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });
    if (isInWishlist(product._id)) {
      toast.info(`Removed from wishlist`);
    } else {
      toast.success(`Added to wishlist`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
      {/* Image Gallery */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden rounded-md"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[activeImage] || "https://images.unsplash.com/photo-1599643478524-fb66f7ca1a1e?q=80&w=800"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {product.images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative h-24 w-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all ${
                  activeImage === idx ? "border-black" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full md:w-1/2 flex flex-col pt-4 md:pt-10"
      >
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">{product.category}</p>
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">{product.title}</h1>
        <p className="text-xl font-medium text-gray-900 mb-8">${product.price.toFixed(2)}</p>
        
        <div className="prose prose-sm text-gray-600 mb-10">
          <p>{product.description}</p>
        </div>

        <div className="flex items-center space-x-6 mb-8">
          <div className="flex items-center border border-gray-300 rounded-sm">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 hover:bg-gray-50 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 h-12 rounded-none bg-black text-white hover:bg-gray-800 uppercase tracking-widest text-xs"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>

          <Button
            onClick={handleToggleWishlist}
            variant="outline"
            className="h-12 w-12 rounded-none border-gray-300 p-0 flex items-center justify-center"
          >
            <Heart className={`h-5 w-5 ${isInWishlist(product._id) ? "fill-black" : ""}`} />
          </Button>
        </div>
        
        <div className="border-t pt-6 mt-6 space-y-4 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Availability:</span>
            <span className={product.inStock ? "text-green-600" : "text-red-600"}>
              {product.inStock ? "In Stock" : "Sold Out"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Free worldwide shipping</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
