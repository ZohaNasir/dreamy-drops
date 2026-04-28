"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Parallax Effect using GSAP
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Hero Text Fade Out using GSAP
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <div 
        ref={containerRef} 
        className="relative h-screen w-full flex items-center justify-center bg-[#fcfcfc] overflow-hidden"
      >
        <div 
          ref={bgRef}
          className="absolute inset-0 z-0 h-[120%]"
        >
          <Image
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000"
            alt="Dreamy Drops Hero"
            fill
            className="object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-[#fcfcfc]" />
        </div>

        <div ref={textRef} className="relative z-10 text-center px-4 flex flex-col items-center max-w-4xl mx-auto mt-20">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-widest uppercase text-gray-900 mb-6"
          >
            Dreamy Drops
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 max-w-xl font-light mb-10"
          >
            Elevate your everyday with our curated collection of exclusive luxury fashion, designer handbags, and premium accessories.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors uppercase tracking-widest text-sm font-medium"
            >
              Explore Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="py-32 bg-white px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl font-light tracking-wide uppercase">Featured Pieces</h2>
            <div className="w-12 h-px bg-black mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                id: 1,
                title: "Lady Dior Editorial",
                price: "View Collection",
                image: "/Products/Models/Model Editorial - Lady Dior Bag/img.png"
              },
              {
                id: 2,
                title: "Rolex Submariner Date",
                price: "$14,500",
                image: "/Products/Watches/Rolex Submariner Date/rolex.png"
              },
              {
                id: 3,
                title: "Gucci Platform Editorial",
                price: "View Collection",
                image: "/Products/Models/Model Editorial - Gucci Platform Shoes/img.png"
              }
            ].map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-light">{item.title}</h3>
                  <span className="text-sm font-medium">{item.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
             <Link href="/shop" className="px-8 py-4 bg-black text-white text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors">
               Explore Full Catalog
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
