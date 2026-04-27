"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    // Simulate Stripe payment
    setTimeout(() => {
      setLoading(false);
      clearCart();
      toast.success("Payment successful! Order placed.");
      router.push("/success");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-4 text-center min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-light mb-4">Checkout</h1>
        <p className="text-gray-500 mb-8">Your cart is empty.</p>
        <Button onClick={() => router.push("/shop")} className="rounded-none px-8">Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <div className="w-full lg:w-3/5">
          <h1 className="text-3xl font-light tracking-wide mb-8">Checkout</h1>
          
          <form onSubmit={handleCheckout} className="space-y-8">
            <div>
              <h2 className="text-lg font-medium mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" required className="mt-1 rounded-sm" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required className="mt-1 rounded-sm" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required className="mt-1 rounded-sm" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required className="mt-1 rounded-sm" />
                </div>
                <div>
                  <Label htmlFor="postal">Postal Code</Label>
                  <Input id="postal" required className="mt-1 rounded-sm" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Payment (Test Mode)</h2>
              <div className="p-4 border rounded-sm bg-gray-50 mb-4">
                <p className="text-sm text-gray-500">This is a mock checkout. No real payment will be processed.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="card">Card number</Label>
                  <Input id="card" placeholder="4242 4242 4242 4242" required className="mt-1 rounded-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="exp">Expiration date</Label>
                    <Input id="exp" placeholder="MM/YY" required className="mt-1 rounded-sm" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required className="mt-1 rounded-sm" />
                  </div>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-base rounded-none bg-black hover:bg-gray-800 text-white transition-colors"
            >
              {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-gray-50 p-6 rounded-md lg:sticky lg:top-32">
            <h2 className="text-lg font-medium mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <div className="relative h-16 w-12 bg-white rounded border overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full z-10">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  </div>
                  <p className="text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 mt-2 flex justify-between font-medium text-gray-900 text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
