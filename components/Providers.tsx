"use client";

import { SessionProvider } from "next-auth/react";
import SmoothScroll from "./SmoothScroll";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SmoothScroll>
        {children}
        <Toaster position="bottom-right" />
      </SmoothScroll>
    </SessionProvider>
  );
}
