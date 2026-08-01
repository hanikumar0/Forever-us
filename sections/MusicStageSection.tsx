"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, Radio, Volume2, Sparkles } from "lucide-react";

interface MusicStageProps {
  onNext: () => void;
}

export default function MusicStage({ onNext }: MusicStageProps) {
  const [equalizerBars, setEqualizerBars] = useState<number[]>([]);

  useEffect(() => {
    // Initializer 16 bars
    setEqualizerBars(Array(16).fill(20));

    const interval = setInterval(() => {
      setEqualizerBars((prev) => 
        prev.map(() => Math.floor(Math.random() * 80) + 15) // random heights between 15px and 95px
      );
    }, 150); // fast beats equalizing

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#050014] overflow-hidden px-6 text-center select-none">
      {/* Concert Spotlight Beams */}
      <div 
        className="absolute top-0 left-[15%] w-[120px] h-[300px] bg-gradient-to-b from-rose/25 via-rose/5 to-transparent origin-top rotate-[-15deg] blur-[40px] pointer-events-none animate-pulse"
        style={{ animationDuration: "3.5s" }}
      />
      <div 
        className="absolute top-0 right-[15%] w-[120px] h-[300px] bg-gradient-to-b from-lavender/25 via-lavender/5 to-transparent origin-top rotate-[15deg] blur-[40px] pointer-events-none animate-pulse"
        style={{ animationDuration: "4s", animationDelay: "0.5s" }}
      />

      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,77,141,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,141,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-xl z-10 flex flex-col items-center">
        {/* Neon Radio Circle */}
        <motion.div
          animate={{
            scale: [1, 1.05, 0.98, 1.08, 1],
            boxShadow: [
              "0 0 15px rgba(255, 77, 141, 0.3)",
              "0 0 30px rgba(255, 77, 141, 0.6)",
              "0 0 15px rgba(255, 77, 141, 0.3)"
            ]
          }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full bg-romantic-pink/15 flex items-center justify-center text-romantic-pink border border-romantic-pink/50 mb-8"
        >
          <Radio className="w-8 h-8 animate-pulse" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-greatvibes text-5xl sm:text-6xl text-white mb-2 tracking-wide drop-shadow-[0_0_10px_rgba(255,77,141,0.5)]"
        >
          Our Love Theme Stage 🎵
        </motion.h2>

        <p className="font-sans text-rose text-xs font-semibold tracking-widest uppercase mb-8 flex items-center gap-1.5 justify-center">
          <Sparkles className="w-3.5 h-3.5 fill-current" /> Concert Equalizer synchronized
        </p>

        {/* Equalizer Visualizer Container */}
        <div className="glass-premium rounded-3xl p-8 border border-white/5 shadow-2xl relative w-[320px] sm:w-[400px] min-h-[160px] flex items-end justify-center gap-1.5 bg-black/40">
          
          {/* Visualizer bars */}
          {equalizerBars.map((height, idx) => (
            <motion.div
              key={idx}
              animate={{ height }}
              transition={{ type: "tween", duration: 0.15 }}
              className={`w-3.5 sm:w-4 rounded-t-full bg-gradient-to-t ${
                idx % 3 === 0 
                  ? "from-romantic-pink to-rose shadow-[0_0_8px_#FF4D8D]" 
                  : idx % 3 === 1 
                  ? "from-rose to-lavender shadow-[0_0_8px_#FF7AA2]" 
                  : "from-lavender to-cyan-400 shadow-[0_0_8px_#B388FF]"
              }`}
              style={{ minHeight: "10px" }}
            />
          ))}

          {/* Glowing bar behind */}
          <div className="absolute inset-x-8 bottom-4 h-0.5 bg-gradient-to-r from-romantic-pink via-rose to-lavender opacity-40 blur-[4px]" />
        </div>

        {/* Action description card */}
        <div className="mt-6 max-w-sm">
          <p className="font-sans text-white/50 text-xs leading-relaxed">
            Adjust the volume controls on the floating header player at the top right to set the soundtrack for our journey!
          </p>
        </div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 77, 141, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-romantic-pink to-rose text-white font-semibold text-sm tracking-widest uppercase border border-white/10 cursor-pointer shadow-lg transition-all duration-300"
          >
            Play Next Chapter 🚀
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
