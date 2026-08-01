"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Key, X, Lock } from "lucide-react";

interface HiddenTreasureProps {
  secrets: string[];
  onNext: () => void;
}

export default function HiddenTreasure({ secrets, onNext }: HiddenTreasureProps) {
  const [openedChests, setOpenedChests] = useState<number[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const handleChestClick = (idx: number) => {
    if (!openedChests.includes(idx)) {
      setOpenedChests((prev) => [...prev, idx]);
    }
    // Pull the secret message matching chest index (loop if needed)
    setSelectedMessage(secrets[idx % secrets.length]);
  };

  const chests = [
    { label: "Chest of Trust", delay: 0 },
    { label: "Chest of Passion", delay: 0.1 },
    { label: "Chest of Joy", delay: 0.2 },
    { label: "Chest of Dreams", delay: 0.3 },
    { label: "Chest of Eternity", delay: 0.4 },
  ];

  const allChestsOpened = openedChests.length === chests.length;

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#080200] via-[#0D0D14] to-[#0D0D14] overflow-hidden px-4 md:px-8 py-20 text-center select-none">
      
      {/* Swinging Lanterns */}
      <div className="absolute top-0 left-[20%] w-[40px] h-[180px] flex flex-col items-center pointer-events-none origin-top animate-float" style={{ animationDuration: "7s" }}>
        <div className="w-[1px] h-[130px] bg-gold/40" />
        <div className="w-6 h-10 bg-gold/15 border border-gold/40 rounded-t-lg rounded-b-2xl shadow-[0_0_15px_#FFD166] flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
      <div className="absolute top-0 right-[25%] w-[40px] h-[180px] flex flex-col items-center pointer-events-none origin-top animate-float" style={{ animationDuration: "6s", animationDelay: "1s" }}>
        <div className="w-[1px] h-[120px] bg-gold/40" />
        <div className="w-6 h-10 bg-gold/15 border border-gold/40 rounded-t-lg rounded-b-2xl shadow-[0_0_15px_#FFD166] flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
        </div>
      </div>

      {/* Secret Cave Golden Ambient Glow */}
      <div className="absolute bottom-[-10%] left-[5%] w-[320px] h-[320px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-[250px] h-[250px] bg-gold/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="font-greatvibes text-5xl md:text-6xl text-gold mb-3 tracking-wide drop-shadow-[0_0_10px_rgba(255,209,102,0.4)]">
            The Hidden Cave of Secrets 🗝️
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
          <p className="font-sans text-white/50 text-xs tracking-widest uppercase">
            Click each chest to unlock the golden scroll message inside
          </p>
          <div className="mt-2 text-[10px] font-bold text-gold/80 font-sans tracking-wider uppercase">
            {openedChests.length} / {chests.length} Chests Opened
          </div>
        </motion.div>
      </div>

      {/* Cave Chest Grid */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex-1 flex flex-wrap items-center justify-center gap-6 p-4">
        {chests.map((chest, idx) => {
          const isOpened = openedChests.includes(idx);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: chest.delay }}
              onClick={() => handleChestClick(idx)}
              className="flex flex-col items-center group cursor-pointer w-[120px] sm:w-[150px]"
            >
              {/* Box Illustration */}
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-20 h-20 rounded-2xl border flex items-center justify-center transition-all duration-300 ${
                  isOpened 
                    ? "bg-gold/10 border-gold shadow-[0_0_20px_rgba(255,209,102,0.3)]" 
                    : "bg-white/5 border-white/10 group-hover:border-gold/50 shadow-md"
                }`}
              >
                {isOpened ? (
                  <Sparkles className="w-8 h-8 text-gold animate-pulse" />
                ) : (
                  <Lock className="w-7 h-7 text-white/40 group-hover:text-gold/80" />
                )}
              </motion.div>

              {/* Chest Title */}
              <span className={`text-[10px] uppercase font-bold tracking-widest mt-3 transition-colors ${
                isOpened ? "text-gold" : "text-white/40 group-hover:text-white/80"
              }`}>
                {chest.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Continuation controls */}
      <div className="z-10 w-full max-w-xl mx-auto h-20 flex items-center justify-center">
        <AnimatePresence>
          {allChestsOpened && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2"
            >
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 209, 102, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-gold to-yellow-600 text-white font-semibold text-xs tracking-widest uppercase border border-gold/30 cursor-pointer shadow-md"
              >
                Leave Secret Cave 🚶‍♀️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Secret Golden Scroll Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md p-8 bg-[#FAF2E5] border-[3px] border-gold rounded-3xl text-center shadow-2xl flex flex-col items-center text-deep-purple"
              style={{
                backgroundImage: "linear-gradient(rgba(240, 230, 210, 0.3) 1px, transparent 1px)",
                backgroundSize: "100% 20px"
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 text-deep-purple/60 hover:text-deep-purple transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-yellow-700 mb-4 animate-pulse border border-gold/50">
                <Key className="w-6 h-6" />
              </div>

              <h3 className="font-greatvibes text-3xl text-yellow-800 mb-2">Unlocked Golden Scroll! 📜</h3>
              
              <p className="font-dancing text-2xl text-deep-purple/95 leading-relaxed italic my-4 px-2 select-none font-bold">
                &quot;{selectedMessage}&quot;
              </p>

              <button
                onClick={() => setSelectedMessage(null)}
                className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-700 to-amber-800 text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-md shadow-amber-800/20"
              >
                Put Back Scroll
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
