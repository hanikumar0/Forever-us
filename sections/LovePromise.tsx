"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

interface LovePromiseProps {
  promises: string[];
  onNext?: () => void;
}

interface FlowerParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  duration: number;
  delay: number;
}

export default function LovePromise({ promises, onNext }: LovePromiseProps) {
  const [particles, setParticles] = useState<FlowerParticle[]>([]);

  useEffect(() => {
    // Generate 12 falling white blossom particles
    const initialParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * -30 - 10,
      scale: Math.random() * 0.4 + 0.6,
      rotation: Math.random() * 360,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 2,
    }));
    setParticles(initialParticles);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="relative w-full min-h-screen py-20 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#FFFDF9] px-4 md:px-8 flex flex-col justify-between select-none overflow-hidden text-center">
      
      {/* Falling White Flower Petal Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-rose-300/40 text-lg font-bold"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            animate={{
              y: ["-50px", "100vh"],
              x: [`${p.x}%`, `${p.x + (Math.random() * 20 - 10)}%`],
              rotate: [p.rotation, p.rotation + 360],
              scale: p.scale
            }}
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: "linear"
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Elegant Wedding Curtains outline (CSS background overlay) */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />
      
      {/* Candle pillars on sides */}
      <div className="absolute bottom-10 left-6 flex items-end gap-2 pointer-events-none opacity-40">
        <div className="flex flex-col items-center">
          <div className="w-2.5 h-4 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full animate-bounce" style={{ animationDuration: "1.4s" }} />
          <div className="w-3.5 h-16 bg-white border border-neutral-300 rounded-b shadow" />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2.5 h-4 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full animate-bounce" style={{ animationDuration: "1.8s", animationDelay: "0.2s" }} />
          <div className="w-3.5 h-20 bg-white border border-neutral-300 rounded-b shadow" />
        </div>
      </div>
      <div className="absolute bottom-10 right-6 flex items-end gap-2 pointer-events-none opacity-40">
        <div className="flex flex-col items-center">
          <div className="w-2.5 h-4 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full animate-bounce" style={{ animationDuration: "1.6s", animationDelay: "0.3s" }} />
          <div className="w-3.5 h-20 bg-white border border-neutral-300 rounded-b shadow" />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2.5 h-4 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full animate-bounce" style={{ animationDuration: "1.5s" }} />
          <div className="w-3.5 h-16 bg-white border border-neutral-300 rounded-b shadow" />
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto z-10 flex flex-col items-center flex-1 justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto mb-4 border border-rose-200">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h2 className="font-greatvibes text-5xl md:text-6xl text-neutral-800 mb-2 drop-shadow-sm">
            My Vows to You 💍
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-3" />
          <p className="font-sans text-rose-800/50 text-xs tracking-widest uppercase">
            Holy commitments I declare under the altar
          </p>
        </motion.div>

        {/* Promises Staggered List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full space-y-4 max-w-xl mx-auto"
        >
          {promises.map((promise, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/80 border border-rose-100 rounded-2xl p-4 md:p-5 flex items-start gap-4 hover:border-rose-300 transition-colors shadow-sm group"
            >
              <div className="mt-1 w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
              </div>
              <p className="font-dancing text-2xl text-neutral-700 leading-relaxed italic select-none text-left font-semibold">
                &quot;{promise}&quot;
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Continuation controls */}
      <div className="z-10 h-16 mt-8 flex items-center justify-center">
        {onNext && (
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(244, 63, 94, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose to-rose-600 text-white font-semibold text-xs tracking-widest uppercase border border-rose-400 cursor-pointer shadow-md flex items-center gap-1.5 animate-pulse"
          >
            Leave Altar <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>
    </section>
  );
}
