"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { CountdownConfig } from "../types/config";

interface CountdownSectionProps {
  countdown: CountdownConfig;
  onNext?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function CountdownSection({ countdown, onNext }: CountdownSectionProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(countdown.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [countdown.targetDate]);

  const timeBlocks = [
    { label: "Days", value: timeRemaining.days },
    { label: "Hours", value: timeRemaining.hours },
    { label: "Minutes", value: timeRemaining.minutes },
    { label: "Seconds", value: timeRemaining.seconds },
  ];

  return (
    <section className="relative w-full min-h-screen py-20 bg-[#02050E] flex flex-col justify-between px-4 md:px-8 text-center select-none overflow-hidden">
      
      {/* Golden Full Moon */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[12%] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-gradient-to-tr from-gold to-white shadow-[0_0_50px_rgba(255,209,102,0.5)] pointer-events-none z-0"
      />

      {/* Lake Reflection Ripples at the bottom */}
      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none z-0 bg-gradient-to-t from-[#020C1F] to-transparent">
        <div className="w-full h-full flex flex-col justify-around opacity-30 mt-10">
          <div className="h-0.5 w-[80vw] bg-gold/30 mx-auto rounded-full blur-[1px] animate-pulse" />
          <div className="h-0.5 w-[60vw] bg-gold/20 mx-auto rounded-full blur-[1px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="h-0.5 w-[40vw] bg-gold/15 mx-auto rounded-full blur-[1px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-greatvibes text-5xl md:text-6xl text-white mb-2 tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            {countdown.label}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-3" />
          <p className="font-sans text-gold/60 text-xs tracking-widest uppercase">
            Silent nights ticking down to our next embrace
          </p>
        </motion.div>

        {/* Ticking Countdown */}
        {timeRemaining.isPast ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-premium rounded-3xl p-8 text-center max-w-md border border-gold/30"
          >
            <Calendar className="w-10 h-10 text-gold mx-auto mb-4 animate-bounce" />
            <h3 className="font-greatvibes text-3xl text-white mb-2">The Moment Has Arrived! 🎉</h3>
            <p className="font-sans text-white/70 text-sm">
              Today is our special milestone day. The countdown is finished, and a new journey begins.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl justify-center">
            {timeBlocks.map((block, idx) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg hover:border-gold/30 duration-300"
              >
                <span className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1 select-none">
                  {block.value.toString().padStart(2, "0")}
                </span>
                <span className="font-sans text-[10px] text-gold font-bold uppercase tracking-widest">
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Continuation controls */}
      <div className="z-10 h-16 flex items-center justify-center">
        {onNext && (
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 209, 102, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-gold to-yellow-600 text-white font-semibold text-xs tracking-widest uppercase border border-gold/30 cursor-pointer shadow-md flex items-center gap-1.5"
          >
            Continue Journey <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>
    </section>
  );
}
