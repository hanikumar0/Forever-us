"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReasonItem } from "../types/config";
import { ArrowRight, Leaf } from "lucide-react";

interface ReasonsListProps {
  reasons: ReasonItem[];
  onNext?: () => void;
}

interface Butterfly {
  id: number;
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
}

export default function ReasonsList({ reasons, onNext }: ReasonsListProps) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    // Generate 6 butterflies
    const initialButterflies = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      scale: Math.random() * 0.4 + 0.7,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 2,
    }));
    setButterflies(initialButterflies);
  }, []);

  const toggleFlip = (idx: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="relative w-full min-h-screen py-20 bg-gradient-to-b from-[#FFF5F7] via-[#FFFDF9] to-[#FFF5F7] px-4 md:px-8 flex flex-col justify-between select-none overflow-hidden">
      
      {/* Morning Sunlight Radial Ray Overlay */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-amber-200/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-rose-200/25 rounded-full blur-[80px] pointer-events-none" />

      {/* Fluttering Butterflies */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {butterflies.map((b) => (
          <motion.div
            key={b.id}
            className="absolute text-rose/60 text-xl font-bold"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
              scale: b.scale
            }}
            transition={{
              repeat: Infinity,
              duration: b.duration,
              delay: b.delay,
              ease: "easeInOut"
            }}
          >
            🦋
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-greatvibes text-5xl md:text-6xl text-rose mb-2 drop-shadow-sm animate-pulse-glow" style={{ animationDuration: "3s" }}>
            The Rose Garden of Reasons 🌹
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-3" />
          <p className="font-sans text-rose-800/50 text-xs tracking-widest uppercase">
            Click each leaf card to see why you are my whole world
          </p>
        </motion.div>

        {/* Garden Flip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center max-w-4xl mx-auto">
          {reasons.map((reason, idx) => {
            const isFlipped = flippedCards[idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="w-full h-[240px] cursor-pointer"
                onClick={() => toggleFlip(idx)}
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative w-full h-full duration-700 transition-all"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT (Leaf Plaque) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl flex flex-col items-center justify-center p-6 text-center shadow-lg border border-rose-100"
                    style={{ 
                      backfaceVisibility: "hidden",
                      background: "linear-gradient(135deg, #FFFDFB 0%, #FFF5F7 100%)"
                    }}
                  >
                    <div className="w-12 h-12 rounded-full bg-rose/10 flex items-center justify-center text-rose mb-3">
                      <Leaf className="w-6 h-6 fill-current animate-pulse" />
                    </div>
                    <h3 className="font-greatvibes text-3xl text-rose font-semibold tracking-wide">
                      {reason.title}
                    </h3>
                    <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-rose-400 mt-4 block">
                      Reveal Secret 🌹
                    </span>
                  </div>

                  {/* BACK (Rose petalled description) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-tr from-rose to-rose-400 border border-rose-300 flex flex-col items-center justify-center p-6 text-center rotate-y-180 shadow-lg text-white"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="text-3xl mb-3 animate-bounce">🌹</div>
                    <p className="font-sans text-xs leading-relaxed max-w-[200px] font-medium">
                      {reason.description}
                    </p>
                    <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-white/70 mt-4 block">
                      Flip back
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Continuation controls */}
      <div className="z-10 h-16 mt-12 flex items-center justify-center">
        {onNext && (
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(244, 63, 94, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-rose to-rose-600 text-white font-semibold text-xs tracking-widest uppercase border border-rose-400 cursor-pointer shadow-md flex items-center gap-1.5"
          >
            Leave Garden <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>
    </section>
  );
}
