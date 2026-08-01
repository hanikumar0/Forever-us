"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface LoadingScreenProps {
  onEnter: () => void;
}

export default function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [dots, setDots] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Show interactive "Enter" button after 1.5 seconds to unlock audio
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1500);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D0D14] overflow-hidden select-none">
      {/* Background soft glowing red bubble */}
      <div className="absolute w-[300px] h-[300px] bg-rose/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />

      {/* Floating Sparkles in the background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-rose rounded-full animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute bottom-[30%] right-[20%] w-2 h-2 bg-rose rounded-full animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute top-[60%] right-[40%] w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: "2.5s" }} />
      </div>

      <div className="text-center px-6 flex flex-col items-center max-w-md">
        {/* Pulsing Heartbeat */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1.05, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="text-romantic-pink drop-shadow-[0_0_15px_rgba(255,77,141,0.6)] cursor-pointer mb-6"
        >
          <Heart className="w-16 h-16 fill-current" />
        </motion.div>

        {/* Text prompt */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-greatvibes text-4xl md:text-5xl text-white mb-3"
        >
          Someone made this just for you ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-sans text-white/50 text-sm tracking-widest uppercase mb-8"
        >
          Preparing your story{dots}
        </motion.p>

        {/* Enter Our Story Button */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={onEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-romantic-pink to-rose text-white text-sm font-semibold tracking-wider uppercase shadow-lg shadow-romantic-pink/20 hover:shadow-romantic-pink/40 border border-white/10 backdrop-blur-md transition-all duration-300 pointer-events-auto"
            >
              Open Love Note 💌
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
