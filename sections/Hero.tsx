"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onBegin: () => void;
}

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

export default function Hero({ title, subtitle, buttonText, onBegin }: HeroProps) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate starfield coordinates (30 random stars)
    const initialStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 3,
    }));
    setStars(initialStars);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#030014] overflow-hidden px-6 text-center select-none">
      
      {/* Animated Deep Space Nebula */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,35,90,0.35)_0%,rgba(13,13,20,1)_70%)] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-romantic-pink/15 rounded-full blur-[110px] pointer-events-none animate-pulse" style={{ animationDuration: "5s" }} />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-lavender/10 rounded-full blur-[110px] pointer-events-none animate-pulse" style={{ animationDuration: "6s", animationDelay: "1s" }} />

      {/* Starfield Flying Effect */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 rounded-full bg-white animate-ping"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              opacity: 0.8,
              boxShadow: "0 0 8px #ffffff",
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl z-10 flex flex-col items-center">
        {/* Heart Icon container */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-14 h-14 rounded-full bg-rose/10 flex items-center justify-center text-rose border border-rose/30 shadow-lg shadow-rose/20 mb-8"
        >
          <Heart className="w-6 h-6 fill-current animate-pulse" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-greatvibes text-6xl sm:text-7xl md:text-8xl text-white font-bold leading-tight select-none tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-rose to-romantic-pink drop-shadow-[0_0_15px_rgba(255,77,141,0.3)]"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans text-white/70 text-lg md:text-xl font-light leading-relaxed mt-6 max-w-lg select-none"
        >
          &quot;{subtitle}&quot;
        </motion.p>

        {/* Begin Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <motion.button
            onClick={() => {
              console.log("Begin Our Story button clicked!");
              onBegin();
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 77, 141, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-romantic-pink via-rose to-lavender text-white font-semibold text-base tracking-widest uppercase cursor-pointer border border-white/10 shadow-xl transition-all duration-300 flex items-center gap-2 group"
          >
            {buttonText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating cue */}
      <div className="absolute bottom-8 text-center pointer-events-none opacity-30">
        <span className="text-[10px] uppercase tracking-widest text-white font-semibold font-sans">
          Magical Space Chapter 🌌
        </span>
      </div>
    </section>
  );
}
