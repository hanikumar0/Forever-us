"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";

interface RoyalPalaceProps {
  girlfriendName: string;
  onNext: () => void;
}

export default function RoyalPalace({ girlfriendName, onNext }: RoyalPalaceProps) {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1A0F00] via-[#0D0D14] to-[#0D0D14] overflow-hidden px-6 text-center select-none">
      {/* Background Arch Details */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[85vw] h-[80vh] rounded-t-full border-[2px] border-gold/40 shadow-[0_0_50px_rgba(255,209,102,0.15)] flex items-center justify-center">
          <div className="w-[75vw] h-[70vh] rounded-t-full border-[1px] border-gold/25" />
        </div>
      </div>

      {/* Hanging Chandeliers (CSS animations) */}
      <div className="absolute top-0 left-12 w-[80px] h-[150px] flex flex-col items-center pointer-events-none origin-top animate-float" style={{ animationDuration: "8s" }}>
        <div className="w-[1px] h-[100px] bg-gold/50" />
        <div className="w-[30px] h-[30px] bg-gold/20 rounded-full border border-gold/40 flex items-center justify-center shadow-[0_0_15px_#FFD166]">
          <div className="w-2.5 h-2.5 bg-gold rounded-full" />
        </div>
      </div>

      <div className="absolute top-0 right-12 w-[80px] h-[150px] flex flex-col items-center pointer-events-none origin-top animate-float" style={{ animationDuration: "9s", animationDelay: "1s" }}>
        <div className="w-[1px] h-[100px] bg-gold/50" />
        <div className="w-[30px] h-[30px] bg-gold/20 rounded-full border border-gold/40 flex items-center justify-center shadow-[0_0_15px_#FFD166]">
          <div className="w-2.5 h-2.5 bg-gold rounded-full" />
        </div>
      </div>

      {/* Golden sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] left-[20%] w-1.5 h-1.5 bg-gold rounded-full animate-ping" style={{ animationDuration: "3.5s" }} />
        <div className="absolute bottom-[35%] right-[25%] w-2 h-2 bg-gold rounded-full animate-ping" style={{ animationDuration: "5s" }} />
        <div className="absolute top-[65%] right-[15%] w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: "2.8s" }} />
      </div>

      <div className="max-w-xl z-10 flex flex-col items-center">
        {/* Crown Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/40 shadow-lg shadow-gold/20 mb-8"
        >
          <Crown className="w-8 h-8 animate-pulse" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-greatvibes text-5xl sm:text-6xl text-gold mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(255,209,102,0.4)]"
        >
          Welcome to the Palace, My Queen 👑
        </motion.h2>

        {/* Scroll invitation scroll card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="glass-premium rounded-3xl p-8 border border-gold/30 shadow-2xl relative max-w-md mx-auto"
          style={{
            background: "linear-gradient(135deg, rgba(255, 209, 102, 0.05) 0%, rgba(255, 209, 102, 0.01) 100%)",
            boxShadow: "0 10px 40px rgba(255, 209, 102, 0.05)"
          }}
        >
          {/* Sparkles decoration */}
          <div className="absolute -top-3 -right-3 text-gold">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <p className="font-sans text-white/80 text-sm sm:text-base leading-relaxed font-light mb-6">
            Sweetheart, you deserve nothing less than a kingdom. Today, this entire palace stands in honor of your beautiful presence, your kind heart, and the absolute joy you bring to my life.
          </p>

          <p className="font-dancing text-2xl text-gold font-bold">
            - Your Royal Highness, {girlfriendName}
          </p>
        </motion.div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 209, 102, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold via-yellow-600 to-amber-700 text-white font-semibold text-sm tracking-widest uppercase border border-gold/30 cursor-pointer shadow-lg transition-all duration-300"
          >
            Enter the chambers 🗝️
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
