"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FutureDream } from "../types/config";
import { ArrowRight, Sparkles } from "lucide-react";

interface FutureDreamsProps {
  dreams: FutureDream[];
  onNext?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FutureDreams({ dreams, onNext }: FutureDreamsProps) {
  const [magicParticles, setMagicParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 15 sparkling magic particles
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      size: Math.random() * 4 + 1.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }));
    setMagicParticles(initialParticles);
  }, []);

  return (
    <section className="relative w-full min-h-screen py-20 bg-gradient-to-b from-[#1D0A35] via-[#4A0E4E] to-[#1D0A35] px-4 md:px-8 flex flex-col justify-between select-none overflow-hidden text-center">
      
      {/* Fantasy Rainbow Sky & Castle Silhouette */}
      <div className="absolute top-[10%] inset-x-0 h-40 bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-amber-500/20 blur-[50px] pointer-events-none" />
      
      {/* Castle Silhouette at the bottom */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-black/15 pointer-events-none flex items-end justify-center z-0 opacity-40">
        {/* Simple CSS shape outline representation of a castle */}
        <div className="w-[180px] h-[100px] bg-[#1a0822] relative rounded-t-xl flex items-end justify-around">
          <div className="w-[30px] h-[140px] bg-[#1a0822] absolute left-[-20px] bottom-0 rounded-t-full border-t border-gold/10" />
          <div className="w-[40px] h-[160px] bg-[#14061a] absolute center bottom-0 rounded-t-full border-t border-gold/15" />
          <div className="w-[30px] h-[140px] bg-[#1a0822] absolute right-[-20px] bottom-0 rounded-t-full border-t border-gold/10" />
        </div>
      </div>

      {/* Floating Magic Sparks */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {magicParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold shadow-[0_0_10px_#FFD166]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`
            }}
            animate={{
              scale: [0.5, 1.3, 0.5],
              opacity: [0.2, 0.8, 0.2],
              y: [0, -20, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
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
          <h2 className="font-greatvibes text-5xl md:text-6xl text-gold mb-2 tracking-wide drop-shadow-[0_0_10px_rgba(255,209,102,0.4)]">
            Our Kingdom of Future Dreams ✨
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-3" />
          <p className="font-sans text-gold/60 text-xs tracking-widest uppercase">
            Milestones and fantasy kingdoms we will build side by side
          </p>
        </motion.div>

        {/* Fantasy Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center max-w-4xl mx-auto">
          {dreams.map((dream, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ 
                y: -6, 
                borderColor: "rgba(255, 209, 102, 0.5)",
                boxShadow: "0 10px 30px rgba(255, 209, 102, 0.15)"
              }}
              className="glass rounded-3xl p-6 border border-gold/20 flex flex-col justify-start items-center text-center cursor-pointer transition-all duration-300 min-h-[220px]"
              style={{
                background: "linear-gradient(135deg, rgba(255, 209, 102, 0.04) 0%, rgba(255, 209, 102, 0.01) 100%)"
              }}
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-3 border border-gold/30">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>

              <h3 className="font-sans text-base font-bold text-white mb-3">
                {dream.title}
              </h3>

              <div className="w-10 h-0.5 bg-gold/20 mb-4" />

              <p className="font-sans text-white/60 text-[11px] leading-relaxed">
                {dream.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continuation controls */}
      <div className="z-10 h-16 mt-12 flex items-center justify-center">
        {onNext && (
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 209, 102, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-gold to-yellow-600 text-white font-semibold text-xs tracking-widest uppercase border border-gold/30 cursor-pointer shadow-md flex items-center gap-1.5"
          >
            Enter Secret Cave <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>
    </section>
  );
}
