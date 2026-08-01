"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";

interface SecretHeartsProps {
  messages: string[];
}

export default function SecretHearts({ messages }: SecretHeartsProps) {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [foundHearts, setFoundHearts] = useState<number[]>([]);

  // Fixed positions across sections to avoid absolute chaos, but still feels "hidden"
  const heartPositions = [
    { id: 1, top: "25%", left: "85%", size: 18, color: "text-rose/20 hover:text-rose/80" },
    { id: 2, top: "45%", left: "5%", size: 16, color: "text-romantic-pink/15 hover:text-romantic-pink/80" },
    { id: 3, top: "65%", left: "92%", size: 20, color: "text-lavender/25 hover:text-lavender/80" },
    { id: 4, top: "82%", left: "3%", size: 18, color: "text-gold/20 hover:text-gold/80" },
    { id: 5, top: "93%", left: "80%", size: 22, color: "text-rose/15 hover:text-rose/80" },
  ];

  const handleHeartClick = (id: number, index: number) => {
    if (!foundHearts.includes(id)) {
      setFoundHearts((prev) => [...prev, id]);
    }
    // Loop messages if we have more hearts than messages
    const message = messages[index % messages.length];
    setActiveMessage(message);
  };

  return (
    <>
      {/* Hidden hearts placed fixed on viewport container stack */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {heartPositions.map((heart, idx) => {
          const isFound = foundHearts.includes(heart.id);
          return (
            <motion.button
              key={heart.id}
              onClick={() => handleHeartClick(heart.id, idx)}
              className={`absolute pointer-events-auto cursor-pointer p-2 focus:outline-none transition-all duration-300 ${heart.color} ${
                isFound ? "animate-pulse scale-110 text-rose/90" : "scale-100"
              }`}
              style={{
                top: heart.top,
                left: heart.left,
              }}
              whileHover={{ scale: 1.3, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                size={heart.size}
                className={isFound ? "fill-current" : "fill-transparent stroke-current"}
              />
              {!isFound && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose/30"></span>
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Secret Message Overlay Modal */}
      <AnimatePresence>
        {activeMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md p-6 glass-premium rounded-2xl text-center flex flex-col items-center border border-rose/30 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMessage(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-rose/10 flex items-center justify-center text-rose mb-4 animate-bounce">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="font-greatvibes text-3xl text-rose mb-2">Secret Message Found! 💌</h3>
              
              <p className="font-dancing text-2xl text-white/90 leading-relaxed italic my-4 px-2 select-none">
                &quot;{activeMessage}&quot;
              </p>

              <motion.button
                onClick={() => setActiveMessage(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-romantic-pink to-rose text-white text-sm font-medium tracking-wide shadow-md shadow-romantic-pink/20 hover:opacity-90"
              >
                Keep Searching ❤️
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
