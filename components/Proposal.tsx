"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import { ProposalConfig } from "../types/config";

interface ProposalProps {
  data: ProposalConfig;
  onAccept: () => void;
}

interface FairyLight {
  id: number;
  x: number;
  y: number;
  scale: number;
  delay: number;
}

export default function Proposal({ data, onAccept }: ProposalProps) {
  const [noCount, setNoCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [lights, setLights] = useState<FairyLight[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate 20 glowing fairy light positions
    const initialLights = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 95,
      y: Math.random() * 80,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 3,
    }));
    setLights(initialLights);
  }, []);

  const handleYes = () => {
    // Fire confetti cascade
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
    
    // Extra bursts
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { x: 0.3, y: 0.5 },
      });
    }, 200);
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { x: 0.7, y: 0.5 },
      });
    }, 400);

    onAccept();
  };

  const handleNoInteraction = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    // Pick a message based on count
    let message = "";
    if (nextCount <= 3) {
      message = data.noResponses[0];
    } else if (nextCount <= 6) {
      message = data.noResponses[1];
    } else if (nextCount <= 9) {
      message = data.noResponses[2];
    } else {
      message = data.noTinyText;
    }
    setCurrentMessage(message);

    // Escape math: calculate new position within container bounds
    if (containerRef.current && buttonRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();

      // Safe boundaries to prevent leaving container
      const maxX = containerRect.width - buttonRect.width - 25;
      const maxY = containerRect.height - buttonRect.height - 25;

      const randomX = Math.max(15, Math.random() * maxX);
      const randomY = Math.max(15, Math.random() * maxY);

      setPosition({ x: randomX, y: randomY });
    }
  };

  const handleMouseEnter = () => {
    handleNoInteraction();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleNoInteraction();
  };

  const handleBypass = () => {
    alert("Love has no limits, but since you found the secret door: I still choose you! ❤️");
    handleYes();
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#021107] via-[#051C0C] to-[#0A0D14] overflow-hidden px-4 md:px-8 select-none text-center"
    >
      {/* Dangling Fairy Lights (Glowing lines + stars in the background) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {lights.map((light) => (
          <motion.div
            key={light.id}
            className="absolute rounded-full bg-gold/90 shadow-[0_0_12px_#FFD166]"
            style={{
              left: `${light.x}%`,
              top: `${light.y}%`,
              width: `${light.scale * 6}px`,
              height: `${light.scale * 6}px`
            }}
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [light.scale, light.scale * 1.3, light.scale]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: light.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Fairy-tale Castle silhouette background glow */}
      <div className="absolute top-[25%] left-[50%] -translate-x-1/2 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl text-center z-10 flex flex-col items-center justify-center">
        {/* Pulsing heart ring */}
        <motion.div
          animate={{ scale: [1, 1.15, 0.98, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full bg-rose/10 flex items-center justify-center text-rose border border-rose/30 shadow-lg shadow-rose/25 mb-8"
        >
          <Heart className="w-7 h-7 fill-current" />
        </motion.div>

        {/* Question Title */}
        <h2 className="font-greatvibes text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight drop-shadow-[0_0_12px_rgba(255,77,141,0.5)]">
          {data.title}
        </h2>

        {/* Playful subtitles */}
        <div className="h-10 mt-2">
          <AnimatePresence mode="wait">
            {currentMessage && (
              <motion.p
                key={noCount}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-sans text-rose font-bold text-sm tracking-wide"
              >
                {currentMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Escape Button Box */}
        <div className="relative w-full min-h-[160px] mt-8 flex justify-center items-start gap-6">
          
          {/* YES BUTTON */}
          <motion.button
            onClick={handleYes}
            whileHover={{ scale: 1.1, boxShadow: "0 0 35px rgba(244, 63, 94, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="z-10 px-8 py-4 rounded-full bg-gradient-to-r from-rose via-rose-500 to-amber-500 text-white text-base font-bold tracking-wider uppercase cursor-pointer border border-white/10 shadow-lg"
          >
            Yes 💖
          </motion.button>

          {/* NO BUTTON (ESCAPING) */}
          <motion.button
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleTouchStart}
            onClick={handleNoInteraction}
            animate={{ 
              x: position.x, 
              y: position.y,
              scale: noCount >= 10 ? 0.6 : 1
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            style={{ 
              position: noCount > 0 ? "absolute" : "static",
              left: 0,
              top: 0
            }}
            className="px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white/70 text-sm font-semibold tracking-wider uppercase cursor-pointer"
          >
            {noCount >= 10 ? data.noTinyText : "No 🙈"}
          </motion.button>

        </div>

        {/* Accessibility bypass fallback */}
        {noCount >= 5 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            onClick={handleBypass}
            className="mt-12 text-[10px] text-white/40 underline hover:text-white/70 cursor-pointer"
          >
            Need the real No option?
          </motion.button>
        )}
      </div>
    </section>
  );
}
