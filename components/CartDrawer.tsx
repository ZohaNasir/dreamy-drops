"use client";

import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-white/95 backdrop-blur-xl border-l-0">
        <SheetHeader className="px-1 text-left">
          <SheetTitle className="text-2xl font-light tracking-wide uppercase">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden mt-6 flex flex-col">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="relative h-24 w-20 overflow-hidden rounded-md bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-sm text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-1 border rounded-md hover:bg-gray-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-1 border rounded-md hover:bg-gray-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-6 pb-2 space-y-4">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <Link href="/checkout" onClick={() => onOpenChange(false)}>
                <Button className="w-full text-lg h-12 uppercase tracking-wide bg-black text-white hover:bg-gray-900 rounded-none">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
