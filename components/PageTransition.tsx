"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface PageTransitionProps {
  currentPage: number;
  transitionType: string;
  onTransitionComplete: () => void;
}

export default function PageTransition({ 
  currentPage, 
  transitionType, 
  onTransitionComplete 
}: PageTransitionProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayPage, setDisplayPage] = useState(currentPage);

  const callbackRef = useRef(onTransitionComplete);

  useEffect(() => {
    callbackRef.current = onTransitionComplete;
  }, [onTransitionComplete]);

  useEffect(() => {
    if (currentPage !== displayPage) {
      setIsAnimating(true);
      
      // Halfway through the transition (500ms), swap the displayed page index
      const swapTimer = setTimeout(() => {
        setDisplayPage(currentPage);
      }, 500);

      // Finish transition after 1000ms
      const endTimer = setTimeout(() => {
        setIsAnimating(false);
        callbackRef.current();
      }, 1000);

      return () => {
        clearTimeout(swapTimer);
        clearTimeout(endTimer);
      };
    }
  }, [currentPage, displayPage]);

  // Transition variants based on types
  const getTransitionVariants = () => {
    switch (transitionType) {
      case "starfield":
        return {
          initial: { scale: 0, opacity: 0, borderRadius: "100%" },
          animate: { 
            scale: [0, 1.5, 1.5, 0], 
            opacity: [0, 1, 1, 0],
            borderRadius: ["100%", "0%", "0%", "100%"]
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }
        };
      case "curtain":
        return {
          leftCurtain: {
            initial: { x: "-100%" },
            animate: { x: ["-100%", "0%", "0%", "-100%"] },
            transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }
          },
          rightCurtain: {
            initial: { x: "100%" },
            animate: { x: ["100%", "0%", "0%", "100%"] },
            transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }
          }
        };
      case "paperfold":
        return {
          initial: { rotateX: 90, opacity: 0, skewY: 10 },
          animate: { 
            rotateX: [90, 0, 0, -90], 
            opacity: [0, 1, 1, 0],
            skewY: [10, 0, 0, -10]
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }
        };
      case "rosepetals":
        return {
          initial: { y: "-100%", opacity: 0 },
          animate: { 
            y: ["-100%", "0%", "0%", "100%"],
            opacity: [0, 1, 1, 0]
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }
        };
      case "portal":
        return {
          initial: { scale: 0, rotate: 0, opacity: 0 },
          animate: { 
            scale: [0, 2.5, 2.5, 0], 
            rotate: [0, 720, 720, 1440],
            opacity: [0, 1, 1, 0]
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "backIn" }
        };
      case "laser":
        return {
          initial: { scaleY: 0, x: "-100%" },
          animate: { 
            scaleY: [0, 1, 1, 0],
            x: ["-100%", "0%", "0%", "100%"]
          },
          transition: { duration: 1, times: [0, 0.35, 0.65, 1], ease: "easeInOut" }
        };
      case "cloud":
        return {
          initial: { y: "100%", opacity: 0 },
          animate: { 
            y: ["100%", "0%", "0%", "-100%"],
            opacity: [0.5, 1, 1, 0.5]
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }
        };
      case "zoom":
        return {
          initial: { scale: 0.5, filter: "blur(20px)", opacity: 0 },
          animate: { 
            scale: [0.5, 1, 1, 1.5], 
            filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"],
            opacity: [0, 1, 1, 0]
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }
        };
      case "glitch":
        return {
          initial: { opacity: 0, skewX: 0 },
          animate: {
            opacity: [0, 1, 1, 0],
            skewX: [0, 30, -30, 0],
            scaleY: [1, 1.2, 0.8, 1]
          },
          transition: { duration: 1, times: [0, 0.35, 0.65, 1], ease: "linear" }
        };
      case "notebook":
        return {
          initial: { rotate: -45, y: "-100%", opacity: 0 },
          animate: { 
            rotate: [-45, 0, 0, 45],
            y: ["-100%", "0%", "0%", "100%"],
            opacity: [0, 1, 1, 0]
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }
        };
      case "sparkle":
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: [0, 1, 1, 0],
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1] }
        };
      case "lightburst":
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { 
            scale: [0, 3, 3, 0], 
            opacity: [0, 1, 1, 0]
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }
        };
      case "ripple":
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { 
            scale: [0, 2.5, 2.5, 0], 
            opacity: [0, 1, 1, 0]
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1], ease: "easeOut" }
        };
      case "aurora":
        default:
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: [0, 1, 1, 0],
            filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(360deg)", "hue-rotate(0deg)"]
          },
          transition: { duration: 1, times: [0, 0.4, 0.6, 1] }
        };
    }
  };

  const variants = getTransitionVariants() as unknown as Variants;

  return (
    <AnimatePresence>
      {isAnimating && (
        <div className="fixed inset-0 z-[999] pointer-events-none overflow-hidden flex items-center justify-center">
          {transitionType === "curtain" ? (
            <>
              {/* Left Curtain */}
              <motion.div
                variants={(variants as unknown as { leftCurtain: Variants }).leftCurtain}
                initial="initial"
                animate="animate"
                className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-deep-purple to-rose border-r border-gold/30 shadow-2xl pointer-events-auto"
                style={{ originX: 0 }}
              />
              {/* Right Curtain */}
              <motion.div
                variants={(variants as unknown as { rightCurtain: Variants }).rightCurtain}
                initial="initial"
                animate="animate"
                className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-deep-purple to-rose border-l border-gold/30 shadow-2xl pointer-events-auto"
                style={{ originX: 1 }}
              />
            </>
          ) : transitionType === "rosepetals" ? (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-rose/95 flex flex-col items-center justify-center pointer-events-auto"
            >
              <div className="text-white font-greatvibes text-5xl animate-bounce">🌹 Petals falling... 🌹</div>
            </motion.div>
          ) : transitionType === "cloud" ? (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-b from-lavender/90 to-romantic-pink/90 pointer-events-auto flex items-center justify-center"
            >
              <div className="text-white font-dancing text-4xl animate-pulse">Floating through dreams... ☁️</div>
            </motion.div>
          ) : transitionType === "glitch" ? (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-black pointer-events-auto flex flex-col items-center justify-center font-mono text-romantic-pink tracking-widest text-lg"
              style={{
                backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                backgroundSize: "100% 2px, 3px 100%"
              }}
            >
              <div>ERROR: CHEMISTRY OVERFLOW...</div>
            </motion.div>
          ) : transitionType === "starfield" ? (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className="absolute w-full h-full bg-[#0D0D14] flex items-center justify-center pointer-events-auto"
            >
              <div className="text-gold font-greatvibes text-5xl tracking-widest animate-pulse">Flying through stars... ✨</div>
            </motion.div>
          ) : transitionType === "laser" ? (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className="absolute top-0 bottom-0 w-[40px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_#22d3ee] pointer-events-auto"
            />
          ) : transitionType === "notebook" ? (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-[#FAF8F5] border-4 border-gold/30 pointer-events-auto flex flex-col items-center justify-center text-deep-purple"
              style={{
                backgroundImage: "radial-gradient(#F3EFE9 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            >
              <div className="font-dancing text-4xl animate-bounce">Writing our story... 📖</div>
            </motion.div>
          ) : (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className={`absolute inset-0 pointer-events-auto ${
                transitionType === "portal" 
                  ? "bg-gradient-to-tr from-deep-purple via-rose to-lavender rounded-full"
                  : transitionType === "lightburst"
                  ? "bg-white"
                  : transitionType === "ripple"
                  ? "bg-rose/80 rounded-full"
                  : "bg-gradient-to-tr from-rose to-deep-purple"
              }`}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
