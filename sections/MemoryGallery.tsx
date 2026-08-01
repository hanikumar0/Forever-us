"use client";

import React, { useState, useRef, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getGoogleDriveDirectLink } from "../lib/drive";
import { GalleryItem } from "../types/config";
import { Image, Video, X, ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";

interface MemoryGalleryProps {
  gallery: GalleryItem[];
  onNext?: () => void;
}

export default function MemoryGallery({ gallery, onNext }: MemoryGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [loadedMedia, setLoadedMedia] = useState<Record<number, boolean>>({});
  
  // Touch coordinates for swipe support
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleMediaLoad = (idx: number) => {
    setLoadedMedia((prev) => ({ ...prev, [idx]: true }));
  };

  const openViewer = (idx: number) => {
    setSelectedIdx(idx);
  };

  const closeViewer = () => {
    setSelectedIdx(null);
  };

  const nextMedia = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % gallery.length);
  };

  const prevMedia = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + gallery.length) % gallery.length);
  };

  // Mobile swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // pixels

    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        nextMedia(); // swiped left
      } else {
        prevMedia(); // swiped right
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen py-20 bg-[#FAF9F6] px-4 md:px-8 flex flex-col justify-between select-none"
      style={{
        backgroundImage: "radial-gradient(#EAE6DF 1.5px, transparent 0)",
        backgroundSize: "36px 36px"
      }}
    >
      {/* Spotlight illumination effects in top header */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FFFDF9]/60 to-transparent pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-greatvibes text-5xl md:text-6xl text-neutral-800 mb-2 drop-shadow-sm">
            The Exhibition of Us 🖼️
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-neutral-400 to-transparent mx-auto mb-3" />
          <p className="font-sans text-neutral-500/70 text-xs tracking-widest uppercase">
            Walk through the framed memories of our love museum
          </p>
        </motion.div>

        {/* Gallery Hanging Art grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-8 space-y-8">
          {gallery.map((item, idx) => {
            const isImage = item.type === "image";
            const directUrl = getGoogleDriveDirectLink(item.url, item.type);
            const isLoaded = loadedMedia[idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => openViewer(idx)}
                className="relative break-inside-avoid rounded-xl overflow-hidden bg-[#181818] p-3 shadow-2xl border-t-[8px] border-l-[8px] border-r-[8px] border-b-[12px] border-[#222222] hover:border-[#C5A880] transition-all duration-300 group cursor-pointer flex flex-col gap-2"
              >
                {/* Spotlights glowing indicator */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#fffae0] rounded blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Skeleton Loader */}
                {!isLoaded && (
                  <div className="w-full min-h-[220px] aspect-video bg-neutral-900 animate-pulse flex items-center justify-center text-white/10">
                    {isImage ? <Image className="w-8 h-8" /> : <Video className="w-8 h-8" />}
                  </div>
                )}

                {/* Media frame */}
                <div className="relative rounded-lg overflow-hidden border border-black shadow-inner">
                  {isImage ? (
                    <img
                      src={directUrl}
                      alt={item.caption}
                      onLoad={() => handleMediaLoad(idx)}
                      onError={() => handleMediaLoad(idx)}
                      loading="lazy"
                      className="w-full h-auto object-cover max-h-[480px] transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative">
                      <video
                        src={directUrl}
                        preload="metadata"
                        onLoadedData={() => handleMediaLoad(idx)}
                        onError={() => handleMediaLoad(idx)}
                        className="w-full h-auto object-cover max-h-[480px]"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-85 group-hover:opacity-95 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-[#C5A880] flex items-center justify-center text-white shadow-lg">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Caption plaque at the bottom of frame */}
                <div className="mt-2 text-center border-t border-neutral-800/40 pt-2 pb-1">
                  <p className="text-[11px] text-[#F3EFE9] font-medium tracking-wide truncate px-1">
                    {item.caption}
                  </p>
                  <span className="text-[8px] text-[#C5A880] font-bold tracking-widest uppercase mt-0.5 block">
                    {isImage ? "Oil Canvas" : "Live Reel"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Continuation controls */}
      <div className="z-10 h-16 mt-12 flex items-center justify-center">
        {onNext && (
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(197, 168, 128, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-neutral-800 to-neutral-900 text-white font-semibold text-xs tracking-widest uppercase border border-neutral-700 cursor-pointer shadow-md flex items-center gap-1.5"
          >
            Leave Gallery <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX VIEWER */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeViewer}
            className="fixed inset-0 z-[99] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50">
              <span className="text-xs text-white/50 tracking-wider font-semibold font-sans">
                {selectedIdx + 1} / {gallery.length}
              </span>
              <button
                onClick={closeViewer}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Media Box */}
            <div 
              className="relative w-full max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {gallery[selectedIdx].type === "image" ? (
                <motion.img
                  key={selectedIdx}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  src={getGoogleDriveDirectLink(gallery[selectedIdx].url, "image")}
                  alt={gallery[selectedIdx].caption}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10"
                />
              ) : (
                <motion.video
                  key={selectedIdx}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  src={getGoogleDriveDirectLink(gallery[selectedIdx].url, "video")}
                  controls
                  autoPlay
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10"
                />
              )}

              {/* Plaque Description */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-6 max-w-xl"
              >
                <p className="font-sans text-[#FAF9F6] text-base md:text-lg">
                  {gallery[selectedIdx].caption}
                </p>
              </motion.div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors hidden md:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors hidden md:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Swipe prompt for mobile */}
            <div className="absolute bottom-4 text-center block md:hidden">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold font-sans">
                Swipe left / right to navigate
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
