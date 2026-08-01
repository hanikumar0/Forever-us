"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { getGoogleDriveDirectLink } from "../lib/drive";

interface MusicPlayerProps {
  url: string;
  autoPlayTriggered: boolean;
}

export default function MusicPlayer({ url, autoPlayTriggered }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audioUrl = getGoogleDriveDirectLink(url, "audio");
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;

      const updateProgress = () => {
        if (audioRef.current) {
          const duration = audioRef.current.duration || 1;
          setProgress((audioRef.current.currentTime / duration) * 100);
        }
      };

      audioRef.current.addEventListener("timeupdate", updateProgress);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", updateProgress);
          audioRef.current.pause();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    const tryAutoplay = () => {
      if (!audioRef.current || isPlaying) return;

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          removeInteractionListeners();
        })
        .catch(() => {
          // Autoplay blocked by browser policy — add interaction fallbacks
          addInteractionListeners();
        });
    };

    const handleUserInteraction = () => {
      if (!audioRef.current) return;

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          removeInteractionListeners();
        })
        .catch(() => {});
    };

    const addInteractionListeners = () => {
      window.addEventListener("click", handleUserInteraction);
      window.addEventListener("touchstart", handleUserInteraction);
      window.addEventListener("keydown", handleUserInteraction);
      window.addEventListener("scroll", handleUserInteraction);
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };

    tryAutoplay();

    return () => {
      removeInteractionListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (autoPlayTriggered && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay blocked or failed:", err));
    }
  }, [autoPlayTriggered, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Play failed:", err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    audioRef.current.currentTime = percentage * (audioRef.current.duration || 0);
    setProgress(percentage * 100);
  };

  return (
    <div className="fixed top-4 right-4 z-50 glass-premium rounded-full px-4 py-2 flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg max-w-[280px] md:max-w-[320px]">
      <div className={`p-1.5 rounded-full bg-romantic-pink text-white ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }}>
        <Music className="w-4 h-4" />
      </div>

      <div className="flex flex-col flex-1 min-w-[80px]">
        <span className="text-[10px] text-rose font-medium tracking-wider uppercase truncate">
          Romantic Melody
        </span>
        {/* Progress Bar */}
        <div 
          className="h-1 bg-white/10 rounded-full cursor-pointer relative mt-1" 
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-rose rounded-full transition-all duration-100" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Play/Pause */}
        <button 
          onClick={togglePlay}
          className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Mute/Volume controls */}
        <div className="flex items-center gap-1 group/vol">
          <button 
            onClick={toggleMute}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-0 overflow-hidden group-hover/vol:w-16 transition-all duration-300 h-1 bg-white/25 rounded-lg appearance-none cursor-pointer accent-rose"
          />
        </div>
      </div>
    </div>
  );
}
