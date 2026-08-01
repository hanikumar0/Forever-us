"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "../sections/LoadingScreen";
import Hero from "../sections/Hero";
import { useAppNavigation } from "../components/NavigationProvider";
import configData from "../data/config.json";
import { AppConfig } from "../types/config";

const config = configData as AppConfig;

export default function Home() {
  const { navigateNext, startMusic } = useAppNavigation();
  const [isEntering, setIsEntering] = useState(true);

  const handleEnter = () => {
    setIsEntering(false);
    startMusic();
  };

  return (
    <>
      <AnimatePresence>
        {isEntering && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, pointerEvents: "none" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <LoadingScreen onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isEntering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full min-h-screen"
        >
          <Hero
            title={config.heroTitle}
            subtitle={config.heroSubtitle}
            buttonText={config.heroButtonText}
            onBegin={navigateNext}
          />
        </motion.div>
      )}
    </>
  );
}
