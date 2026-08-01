"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import PageTransition from "./PageTransition";
import configData from "../data/config.json";
import MusicPlayer from "./MusicPlayer";
import ParticleBackground from "./ParticleBackground";
import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react";

const routes = [
  "/",
  "/palace",
  "/letter",
  "/reasons",
  "/counter",
  "/stats",
  "/memories",
  "/music",
  "/quiz",
  "/scrapbook",
  "/dreams",
  "/treasure",
  "/countdown",
  "/promise",
  "/proposal",
  "/finale",
];

interface NavigationContextProps {
  navigateNext: () => void;
  navigatePrev: () => void;
  navigateTo: (route: string) => void;
  musicStarted: boolean;
  startMusic: () => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export function useAppNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useAppNavigation must be used within a NavigationProvider");
  }
  return context;
}

export default function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [targetPageIdx, setTargetPageIdx] = useState(routes.indexOf(pathname));
  const [transitionType, setTransitionType] = useState("starfield");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  // Sync state with manual page refreshes / direct URLs
  useEffect(() => {
    const idx = routes.indexOf(pathname);
    if (idx !== -1) {
      setTargetPageIdx(idx);
    }
  }, [pathname]);

  const startMusic = useCallback(() => {
    setMusicStarted(true);
  }, []);

  const triggerTransition = useCallback((nextIdx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const currentIdx = routes.indexOf(pathname);
    
    // Choose transition type based on current page index
    let type = "starfield";
    switch (currentIdx + 1) {
      case 1: type = "starfield"; break;
      case 2: type = "curtain"; break;
      case 3: type = "paperfold"; break;
      case 4: type = "rosepetals"; break;
      case 5: type = "portal"; break;
      case 6: type = "laser"; break;
      case 7: type = "cloud"; break;
      case 8: type = "zoom"; break;
      case 9: type = "glitch"; break;
      case 10: type = "notebook"; break;
      case 11: type = "sparkle"; break;
      case 12: type = "lightburst"; break;
      case 13: type = "ripple"; break;
      case 14: type = "rosepetals"; break;
      case 15: type = "aurora"; break;
      default: type = "starfield";
    }

    setTransitionType(type);
    setTargetPageIdx(nextIdx);

    // Halfway through (500ms), perform the route push
    setTimeout(() => {
      router.push(routes[nextIdx]);
    }, 500);

    // Complete transition (1000ms)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, [pathname, isTransitioning, router]);

  const navigateNext = useCallback(() => {
    const currentIdx = routes.indexOf(pathname);
    if (currentIdx < routes.length - 1) {
      triggerTransition(currentIdx + 1);
    }
  }, [pathname, triggerTransition]);

  const navigatePrev = useCallback(() => {
    const currentIdx = routes.indexOf(pathname);
    if (currentIdx > 0) {
      triggerTransition(currentIdx - 1);
    }
  }, [pathname, triggerTransition]);

  const navigateTo = useCallback((route: string) => {
    const targetIdx = routes.indexOf(route);
    if (targetIdx !== -1) {
      triggerTransition(targetIdx);
    }
  }, [triggerTransition]);

  const currentPage = routes.indexOf(pathname) + 1;

  return (
    <NavigationContext.Provider value={{ navigateNext, navigatePrev, navigateTo, musicStarted, startMusic }}>
      {/* Background Particles System */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParticleBackground />
      </div>

      {/* Global Floating Music Player */}
      <MusicPlayer url={configData.musicUrl} autoPlayTriggered={musicStarted} />

      {/* Page transition overlay */}
      <PageTransition
        currentPage={targetPageIdx + 1}
        transitionType={transitionType}
        onTransitionComplete={() => {}}
      />

      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        <div className="flex-1 w-full relative">
          {children}
        </div>

        {/* Global Floating Glass Control Bar (Hidden on Page 1 / loading states / Finale) */}
        {currentPage > 1 && currentPage < 16 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[280px] sm:w-[320px] bg-[#0D0D14]/90 backdrop-blur-xl rounded-full px-4 py-2.5 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-105 border border-white/20">
            {/* Back Arrow */}
            <button
              onClick={navigatePrev}
              disabled={currentPage === 1}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Progress Text */}
            <span className="text-[11px] tracking-widest uppercase font-bold text-white flex items-center gap-1.5 drop-shadow-md">
              <Bookmark className="w-3.5 h-3.5 text-romantic-pink fill-romantic-pink/20" /> Chapter {currentPage} of 15
            </span>

            {/* Next Arrow (Disabled on proposal section to enforce button escape play) */}
            <button
              onClick={navigateNext}
              disabled={currentPage === 15}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </NavigationContext.Provider>
  );
}
