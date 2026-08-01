"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface EnvelopeProps {
  sender: string;
  paragraphs: string[];
}

export default function Envelope({ sender, paragraphs }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [currentParaIdx, setCurrentParaIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);

  const startOpening = () => {
    setIsOpen(true);
    // After flap opens, slide the letter out
    setTimeout(() => {
      setShowLetter(true);
    }, 800);
  };

  // Typewriter effect logic
  useEffect(() => {
    if (!showLetter) return;
    if (currentParaIdx >= paragraphs.length) return;

    const currentParagraph = paragraphs[currentParaIdx];
    if (currentCharIdx < currentParagraph.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText((prev) => {
          const next = [...prev];
          if (!next[currentParaIdx]) {
            next[currentParaIdx] = "";
          }
          next[currentParaIdx] += currentParagraph[currentCharIdx];
          return next;
        });
        setCurrentCharIdx((prev) => prev + 1);
      }, 35); // speed of typing
      return () => clearTimeout(typingTimer);
    } else {
      // Move to next paragraph after a short pause
      const nextParaTimer = setTimeout(() => {
        setCurrentParaIdx((prev) => prev + 1);
        setCurrentCharIdx(0);
      }, 700);
      return () => clearTimeout(nextParaTimer);
    }
  }, [showLetter, currentParaIdx, currentCharIdx, paragraphs]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[500px]">
      <AnimatePresence mode="wait">
        {!showLetter ? (
          // ENVELOPE DESIGN
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={startOpening}
            className="relative w-[320px] sm:w-[380px] h-[220px] bg-gradient-to-br from-rose/90 to-romantic-pink/90 rounded-b-xl shadow-2xl cursor-pointer group"
          >
            {/* Top Flap */}
            <div
              className={`absolute top-0 left-0 right-0 h-0 w-0 border-l-[160px] sm:border-l-[190px] border-l-transparent border-r-[160px] sm:border-r-[190px] border-r-transparent border-t-[110px] border-t-rose origin-top transition-transform duration-700 z-20 ${
                isOpen ? "rotate-x-180 -translate-y-[110px]" : "rotate-x-0"
              }`}
              style={{
                perspective: "800px",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Letter peek card (inside envelope) */}
            <motion.div
              animate={isOpen ? { y: -40 } : { y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-4 left-4 right-4 bottom-4 bg-[#FDFBF7] rounded shadow-inner flex flex-col items-center justify-center p-4 z-10"
            >
              <Heart className="w-8 h-8 text-rose fill-rose/25 animate-pulse" />
              <p className="font-dancing text-xl text-deep-purple/80 font-bold mt-2">Tap to Open Love Note</p>
            </motion.div>

            {/* Left and Right inner flaps (front layers) */}
            <div className="absolute inset-0 bg-transparent border-l-[160px] sm:border-l-[190px] border-l-rose/80 border-b-[110px] border-b-rose/80 rounded-bl-xl z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-transparent border-r-[160px] sm:border-r-[190px] border-r-rose/80 border-b-[110px] border-b-rose/80 rounded-br-xl z-20 pointer-events-none" />

            {/* Bottom Flap Cover */}
            <div className="absolute bottom-0 left-0 right-0 h-[110px] bg-gradient-to-t from-romantic-pink to-rose/90 rounded-b-xl z-25 pointer-events-none" />
            
            {/* Envelope shadow hover */}
            <div className="absolute inset-0 rounded-xl group-hover:bg-white/5 transition-colors" />
          </motion.div>
        ) : (
          // EXPANDED HANDWRITTEN LETTER
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-[#FDFBF7] text-deep-purple p-8 md:p-12 rounded-2xl border border-gold/40 shadow-2xl relative"
            style={{
              backgroundImage: "radial-gradient(#F3EFE9 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          >
            {/* Cute heart sticker */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Heart className="w-3.5 h-3.5 fill-current" /> Especially For You
            </div>

            {/* Letter content */}
            <div className="font-dancing text-2xl md:text-3xl leading-relaxed space-y-6 md:space-y-8 select-none whitespace-pre-wrap">
              {displayedText.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Sign-off */}
            {currentParaIdx >= paragraphs.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-12 flex flex-col items-end text-right pr-4"
              >
                <span className="font-sans text-xs uppercase tracking-widest text-deep-purple/45 font-bold">Sender</span>
                <span className="font-dancing text-3xl text-rose font-bold mt-1">{sender}</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
