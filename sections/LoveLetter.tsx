"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "../components/Envelope";
import { LoveLetter as LoveLetterType } from "../types/config";
import { ArrowRight } from "lucide-react";

interface LoveLetterSectionProps {
  data: LoveLetterType;
  onNext?: () => void;
}

export default function LoveLetterSection({ data, onNext }: LoveLetterSectionProps) {
  const [showNextBtn, setShowNextBtn] = useState(false);

  // We will trigger showing the "Next Chapter" button after a delay matching the average reading/typing time
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowNextBtn(true);
    }, 4500); // 4.5 seconds to show continuation
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen py-20 flex flex-col items-center justify-between overflow-hidden px-4 md:px-8 select-none"
      style={{
        background: "linear-gradient(135deg, #1f1107 0%, #120903 100%)",
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)"
      }}
    >
      {/* Candle Light Overlay (Warm Orange Glows) */}
      <div 
        className="absolute top-8 left-8 w-[150px] h-[150px] bg-amber-500/10 rounded-full blur-[50px] animate-pulse pointer-events-none" 
        style={{ animationDuration: "3s" }}
      />
      <div 
        className="absolute bottom-8 right-8 w-[180px] h-[180px] bg-amber-600/10 rounded-full blur-[60px] animate-pulse pointer-events-none" 
        style={{ animationDuration: "4s", animationDelay: "1s" }}
      />

      {/* Flame flickering indicators in corners */}
      <div className="absolute top-10 left-10 flex flex-col items-center pointer-events-none opacity-40">
        {/* Flame */}
        <div className="w-3 h-5 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full animate-bounce blur-[1px]" style={{ animationDuration: "1.5s" }} />
        {/* Candle Body */}
        <div className="w-4 h-16 bg-[#e5c59e] rounded-b border-t border-yellow-600/20 shadow-md" />
      </div>
      <div className="absolute bottom-10 right-10 flex flex-col items-center pointer-events-none opacity-40">
        {/* Flame */}
        <div className="w-3.5 h-6 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full animate-bounce blur-[1px]" style={{ animationDuration: "1.8s", animationDelay: "0.4s" }} />
        {/* Candle Body */}
        <div className="w-5 h-20 bg-[#e5c59e] rounded-b border-t border-yellow-600/20 shadow-md" />
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center z-10 flex-1 justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="font-greatvibes text-5xl md:text-6xl text-amber-100 mb-2 drop-shadow-[0_0_12px_rgba(253,251,247,0.3)]">
            Our Love Story
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-3" />
          <p className="font-sans text-amber-200/50 text-xs tracking-widest uppercase">
            Tap the envelope to read my handwritten letter 📜
          </p>
        </motion.div>

        {/* Envelope containing typewriter letter */}
        <div className="w-full">
          <Envelope sender={data.sender} paragraphs={data.paragraphs} />
        </div>
      </div>

      {/* Button to proceed */}
      <div className="z-10 h-16 flex items-center justify-center">
        <AnimatePresence>
          {showNextBtn && onNext && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(217, 119, 6, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-700 text-white font-semibold text-xs tracking-widest uppercase border border-amber-600/30 cursor-pointer shadow-md flex items-center gap-1.5"
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
