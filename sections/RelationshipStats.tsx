"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Phone, Camera, Moon, Smile, LucideIcon, ArrowRight, LineChart } from "lucide-react";
import { RelationshipStat } from "../types/config";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Phone,
  Camera,
  Moon,
  Smile,
};

interface RelationshipStatsProps {
  stats: RelationshipStat[];
  onNext?: () => void;
}

export default function RelationshipStats({ stats, onNext }: RelationshipStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000; // 2s
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setCounts(() => {
        return stats.map((stat) => {
          if (step >= steps) {
            return stat.value;
          }
          return Math.floor((stat.value / steps) * step);
        });
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isInView, stats]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-20 bg-[#060A14] flex flex-col justify-between px-6 text-center select-none overflow-hidden">
      
      {/* Cyberpunk Grid & glowing laser overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-fuchsia-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-greatvibes text-5xl md:text-6xl text-white mb-2 tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            Our Love Telemetry Dashboard 📊
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-3" />
          <p className="font-sans text-cyan-400/60 text-xs tracking-widest uppercase">
            Real-time analytics of our relationship metrics
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, idx) => {
            const IconComponent = iconMap[stat.icon] || HeartIconFallback;
            const isSpecialLarge = stat.value > 99999;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-between text-center hover:border-cyan-400/40 transition-all duration-300 shadow-2xl hover:scale-[1.03]"
              >
                {/* Neon Icon wrapper */}
                <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 border border-cyan-400/30 mb-4 animate-pulse">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                    {isSpecialLarge && counts[idx] >= stat.value ? "∞" : counts[idx].toLocaleString()}
                  </h3>
                  <span className="font-sans text-[10px] text-cyan-400 font-bold tracking-widest uppercase block mb-2">
                    {stat.label}
                  </span>
                </div>

                <p className="font-sans text-[9px] text-white/40 leading-relaxed min-h-[30px] flex items-center">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Vector SVG line graph showing love trajectory */}
        <div className="w-full max-w-2xl mx-auto mt-12 bg-white/2 border border-white/5 rounded-3xl p-4 backdrop-blur-sm relative h-36">
          <div className="absolute top-3 left-4 text-[9px] font-sans font-bold text-cyan-400/60 uppercase flex items-center gap-1.5">
            <LineChart className="w-3.5 h-3.5" /> Affinity Index Trajectory
          </div>
          <svg className="w-full h-full pt-6" viewBox="0 0 500 100" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

            {/* Glowing path */}
            <motion.path
              d="M 0 90 Q 100 80, 200 65 T 400 30 T 500 5"
              fill="none"
              stroke="url(#loveGradient)"
              strokeWidth="3.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="loveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#ff4d8d" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Proceed Button */}
      <div className="z-10 h-16 mt-12 flex items-center justify-center">
        {onNext && (
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-semibold text-xs tracking-widest uppercase border border-cyan-400/30 cursor-pointer shadow-md flex items-center gap-1.5"
          >
            Leave Terminal <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>
    </section>
  );
}

function HeartIconFallback(props: React.ComponentProps<LucideIcon>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
