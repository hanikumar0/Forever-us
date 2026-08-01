"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, Infinity as InfinityIcon, ArrowRight } from "lucide-react";

interface LoveCounterProps {
  stages: number[];
  message: string;
  onNext?: () => void;
}

export default function LoveCounter({ stages, message, onNext }: LoveCounterProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    let activeInterval: NodeJS.Timeout | null = null;
    let nextStageTimeout: NodeJS.Timeout | null = null;
    
    const runStage = (stageIdx: number) => {
      if (stageIdx >= stages.length) return;
      const target = stages[stageIdx];
      const start = currentValue;
      
      // Calculate speed based on distance
      const duration = stageIdx === 3 ? 2000 : 800; // spin final stage fast
      const steps = 50;
      const increment = (target - start) / steps;
      let step = 0;

      activeInterval = setInterval(() => {
        step++;
        setCurrentValue((prev) => {
          if (step >= steps) {
            if (activeInterval) clearInterval(activeInterval);
            setCurrentStageIdx(stageIdx);
            // Delay before starting next stage
            nextStageTimeout = setTimeout(() => {
              runStage(stageIdx + 1);
            }, 800);
            return target;
          }
          return Math.floor(start + increment * step);
        });
      }, duration / steps);
    };

    runStage(0);

    return () => {
      if (activeInterval) clearInterval(activeInterval);
      if (nextStageTimeout) clearTimeout(nextStageTimeout);
    };
  }, [isInView, stages]);

  const isFinalStage = currentStageIdx >= stages.length - 1 && currentValue === stages[stages.length - 1];

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-20 bg-[#07000B] flex flex-col items-center justify-between px-6 text-center select-none overflow-hidden">
      
      {/* Neon Heart Tunnel rings (glowing background circles/hearts) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 2], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute w-[200px] h-[200px] border border-rose/30 rounded-full flex items-center justify-center shadow-[0_0_20px_#FF4D8D]"
        >
          <Heart className="w-12 h-12 text-rose/10 fill-current" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 2], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1 }}
          className="absolute w-[200px] h-[200px] border border-lavender/30 rounded-full flex items-center justify-center shadow-[0_0_20px_#B388FF]"
        >
          <Heart className="w-12 h-12 text-lavender/10 fill-current" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 2], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 2 }}
          className="absolute w-[200px] h-[200px] border border-romantic-pink/30 rounded-full flex items-center justify-center shadow-[0_0_20px_#FF7AA2]"
        >
          <Heart className="w-12 h-12 text-romantic-pink/10 fill-current" />
        </motion.div>
      </div>

      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col items-center justify-center z-10">
        {/* Pulsing Climax Heart */}
        <motion.div
          animate={
            isFinalStage
              ? { scale: [1, 1.25, 0.98, 1.35, 1], filter: "drop-shadow(0 0 35px rgba(255, 77, 141, 0.95))" }
              : { scale: [1, 1.12, 1, 1.18, 1] }
          }
          transition={{ repeat: Infinity, duration: isFinalStage ? 0.7 : 1.3, ease: "easeInOut" }}
          className="text-romantic-pink mb-8 cursor-pointer"
        >
          <Heart className="w-24 h-24 fill-current" />
        </motion.div>

        {/* Counter value */}
        <h2 className="font-sans text-5xl sm:text-7xl font-bold tracking-tight text-white select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          {currentValue.toLocaleString()}%
        </h2>

        {/* Dynamic labels */}
        <div className="h-8 mt-4">
          <p className="font-sans text-rose/65 text-xs font-bold tracking-widest uppercase">
            {!hasStarted.current && "Synchronizing neon heartbeat..."}
            {hasStarted.current && currentStageIdx === 0 && "Connecting neon pathways..."}
            {hasStarted.current && currentStageIdx === 1 && "Charge levels expanding..."}
            {hasStarted.current && currentStageIdx === 2 && "Exceeding safety indicators..."}
            {isFinalStage && "TUNNEL SYNCHRONIZATION COMPLETED 🚨"}
          </p>
        </div>

        {/* Climax message scroll */}
        <div className="h-20 mt-6 flex items-center justify-center">
          {isFinalStage && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="flex flex-col items-center"
            >
              <p className="font-greatvibes text-4xl text-rose tracking-wide drop-shadow-[0_0_8px_rgba(255,77,141,0.5)]">
                &quot;{message}&quot;
              </p>
              <InfinityIcon className="w-6 h-6 text-rose mt-2 animate-pulse" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Proceed Button */}
      <div className="z-10 h-16 flex items-center justify-center">
        <AnimatePresence>
          {isFinalStage && onNext && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 77, 141, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-romantic-pink to-rose text-white font-semibold text-xs tracking-widest uppercase border border-rose-400 cursor-pointer shadow-md flex items-center gap-1.5 animate-pulse"
              >
                Proceed Chapter <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
