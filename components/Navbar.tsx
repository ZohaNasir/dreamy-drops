"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, Search, User, Menu, X, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Button } from "./ui/button";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const pathname = usePathname();
  
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                className="text-gray-900 p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 flex justify-center lg:justify-start">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-48 h-16 overflow-hidden">
                  <Image src="/logo.png" alt="Dreamy Drops Logo" fill className="object-contain" priority />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-10">
              <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Shop All
              </Link>
              <Link href="/shop?category=Handbags" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Handbags
              </Link>
              <Link href="/shop?category=Shoes" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Shoes
              </Link>
              <Link href="/shop?category=Watches" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Watches
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                About
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 lg:space-x-6 justify-end flex-1">
              <button className="text-gray-900 hover:opacity-70 transition-opacity">
                <Search className="h-5 w-5" />
              </button>
              
              <Link href="/admin" className="text-gray-900 hover:opacity-70 transition-opacity hidden sm:block">
                <User className="h-5 w-5" />
              </Link>
              
              <Link href="/wishlist" className="relative text-gray-900 hover:opacity-70 transition-opacity hidden sm:block">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <button 
                className="relative text-gray-900 hover:opacity-70 transition-opacity"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col space-y-4">
              <Link href="/shop" className="text-lg font-medium text-gray-900">Shop All</Link>
              <Link href="/shop?category=Handbags" className="text-lg font-medium text-gray-900">Handbags</Link>
              <Link href="/shop?category=Shoes" className="text-lg font-medium text-gray-900">Shoes</Link>
              <Link href="/shop?category=Watches" className="text-lg font-medium text-gray-900">Watches</Link>
              <Link href="/about" className="text-lg font-medium text-gray-900">About</Link>
              <Link href="/admin" className="text-lg font-medium text-gray-900">Account</Link>
            </div>
          </motion.div>
        )}
      </motion.header>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
