"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CheckCircle, Cloud, ArrowRight } from "lucide-react";

interface FloatingMemoriesProps {
  memories: string[];
  onNext?: () => void;
}

interface Bubble {
  id: number;
  text: string;
  x: number; // percentage left
  y: number; // percentage top
  scale: number;
  duration: number;
  delay: number;
}

export default function FloatingMemories({ memories, onNext }: FloatingMemoriesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedMemory, setPoppedMemory] = useState<string | null>(null);
  const [poppedIds, setPoppedIds] = useState<number[]>([]);

  useEffect(() => {
    // Generate bubbles with random layout and floating speeds
    const initialBubbles = memories.map((text, idx) => ({
      id: idx,
      text,
      x: Math.random() * 70 + 10,
      y: Math.random() * 50 + 20,
      scale: Math.random() * 0.4 + 0.8,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 2,
    }));
    setBubbles(initialBubbles);
  }, [memories]);

  const handlePop = (bubble: Bubble) => {
    if (!poppedIds.includes(bubble.id)) {
      setPoppedIds((prev) => [...prev, bubble.id]);
    }
    setPoppedMemory(bubble.text);
  };

  const allPopped = poppedIds.length === memories.length && memories.length > 0;

  return (
    <section className="relative w-full min-h-screen py-20 bg-gradient-to-b from-[#E0EAFC] via-[#CFDEF3] to-[#E0EAFC] px-4 md:px-8 flex flex-col justify-between select-none overflow-hidden">
      
      {/* Drifting Clouds Background */}
      <div className="absolute inset-0 pointer-events-none opacity-35 z-0">
        <motion.div
          animate={{ x: ["-100vw", "100vw"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute top-[10%] text-white text-9xl font-bold"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ x: ["100vw", "-100vw"] }}
          transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
          className="absolute top-[45%] text-white text-8xl font-bold"
        >
          ☁️
        </motion.div>
      </div>

      {/* Floating Hot Air Balloon illustration */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-[15%] right-[10%] text-5xl pointer-events-none opacity-60 z-0 select-none"
      >
        🎈
      </motion.div>

      <div className="w-full max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="font-greatvibes text-5xl md:text-6xl text-slate-800 mb-2 drop-shadow-sm">
            The Floating Clouds of Memories ☁️
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-3" />
          <p className="font-sans text-slate-700/60 text-xs tracking-widest uppercase">
            Pop each heart-cloud bubble to reveal a special moment
          </p>
          <div className="mt-2 text-xs font-bold text-slate-800 font-sans tracking-widest uppercase">
            {poppedIds.length} / {memories.length} Memories Popped
          </div>
        </motion.div>
      </div>

      {/* Cloud Bubble Floating Area */}
      <div className="relative flex-1 w-full max-w-4xl mx-auto min-h-[380px] bg-white/25 rounded-3xl border border-white/40 overflow-hidden backdrop-blur-sm p-4 z-10 shadow-lg">
        {bubbles.map((b) => {
          const isPopped = poppedIds.includes(b.id);
          return (
            <AnimatePresence key={b.id}>
              {!isPopped && (
                <motion.button
                  onClick={() => handlePop(b)}
                  className="absolute pointer-events-auto cursor-pointer focus:outline-none flex flex-col items-center justify-center"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 8, 0],
                    scale: b.scale,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: b.duration,
                    delay: b.delay,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: b.scale * 1.2 }}
                  whileTap={{ scale: b.scale * 0.9 }}
                >
                  <div className="relative w-16 h-12 flex items-center justify-center bg-white/60 rounded-full border border-white shadow-md flex-col text-rose/70">
                    <Cloud className="w-8 h-8 fill-current opacity-20 absolute inset-0 m-auto text-rose/10" />
                    <Heart className="w-6 h-6 fill-current relative z-10 animate-pulse" />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          );
        })}

        {/* Congratulatory layer when all are popped */}
        {allPopped && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 bg-[#E0EAFC]/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-20"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600 mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-greatvibes text-4xl text-slate-800 mb-2">Every Memory Unlocked! ❤️</h3>
            <p className="font-sans text-slate-700/80 text-sm max-w-sm">
              My favorite cloud nine is just being by your side, building these dreams together.
            </p>
          </motion.div>
        )}
      </div>

      {/* Continuation controls */}
      <div className="z-10 h-16 mt-8 flex items-center justify-center">
        <AnimatePresence>
          {allPopped && onNext && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(74, 85, 104, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold text-xs tracking-widest uppercase border border-slate-600 cursor-pointer shadow-md flex items-center gap-1.5"
              >
                Proceed Chapter <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Memory Card Popup Overlay */}
      <AnimatePresence>
        {poppedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md p-6 bg-white border border-slate-200 rounded-3xl text-center shadow-2xl flex flex-col items-center text-slate-800"
            >
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 animate-pulse">
                <Heart className="w-5 h-5 fill-current" />
              </div>

              <h3 className="font-greatvibes text-3xl text-rose-500 mb-1">Drifting Thought ☁️</h3>
              
              <p className="font-sans text-slate-700 text-base italic leading-relaxed my-4 px-2 select-none">
                &quot;{poppedMemory}&quot;
              </p>

              <button
                onClick={() => setPoppedMemory(null)}
                className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Let It Drift
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
