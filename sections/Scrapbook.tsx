"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Heart, ArrowRight } from "lucide-react";
import { ScrapbookPage } from "../types/config";

interface ScrapbookProps {
  scrapbook: ScrapbookPage[];
  onNext?: () => void;
}

export default function Scrapbook({ scrapbook, onNext }: ScrapbookProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextPage = () => {
    if (page < scrapbook.length - 1) {
      setDirection(1);
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setDirection(-1);
      setPage((prev) => prev - 1);
    }
  };

  const isLastPage = page === scrapbook.length - 1;

  // Sliding variations for page turns
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotateY: dir > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      rotateY: dir < 0 ? 45 : -45,
    }),
  };

  return (
    <section className="relative w-full min-h-screen py-20 bg-[#422D1D] px-4 md:px-8 flex flex-col justify-between overflow-hidden select-none"
      style={{
        backgroundImage: "radial-gradient(#2E1E12 2px, transparent 0)",
        backgroundSize: "30px 30px",
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)"
      }}
    >
      {/* Table desk clutter (doodle illustrations) */}
      <div className="absolute top-10 left-10 text-5xl opacity-20 pointer-events-none">✏️</div>
      <div className="absolute bottom-10 right-10 text-5xl opacity-20 pointer-events-none">☕</div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center flex-1 justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="font-greatvibes text-5xl md:text-6xl text-[#F9F6F0] mb-2 drop-shadow-md">
            Our Cozy Handmade Scrapbook 📖
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent mx-auto mb-3" />
          <p className="font-sans text-[#EAE6DF]/60 text-xs tracking-widest uppercase">
            Flip through the pages of our memory journal
          </p>
        </motion.div>

        {/* Outer book container */}
        <div className="relative w-full max-w-3xl min-h-[460px] bg-[#FAF8F5] rounded-3xl border-[3px] border-[#C5A880]/50 shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8 items-stretch text-deep-purple">
          
          {/* Binder rings in center */}
          <div className="hidden md:flex absolute top-6 bottom-6 left-1/2 -translate-x-1/2 flex-col justify-between items-center z-25 pointer-events-none w-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-8 h-3.5 rounded-full bg-gradient-to-r from-neutral-400 via-neutral-300 to-neutral-500 border border-neutral-400/30 shadow-md transform -rotate-12" />
            ))}
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex flex-col md:flex-row gap-8 flex-1"
            >
              {/* LEFT PAGE (PHOTO & STICKER) */}
              <div className="flex-1 flex flex-col justify-center items-center relative min-h-[220px]">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border-[6px] border-white p-1 bg-white transform -rotate-2">
                  <img
                    src={scrapbook[page].image}
                    alt={scrapbook[page].title}
                    className="w-full h-full object-cover rounded-md"
                  />
                  {/* Tape sticker decoration */}
                  <div className="absolute -top-3 left-6 w-16 h-7 bg-amber-400/30 backdrop-blur-[1px] transform -rotate-12 flex items-center justify-center text-[9px] text-[#5c4033] font-sans uppercase font-bold tracking-wider rounded border border-amber-300/30 shadow-sm">
                    ✨ Memory
                  </div>
                </div>

                {/* Scrapbook sticker */}
                {scrapbook[page].sticker && (
                  <div className="absolute bottom-4 right-4 bg-rose/90 text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transform rotate-6 shadow-md border border-rose-300">
                    {scrapbook[page].sticker}
                  </div>
                )}
              </div>

              {/* RIGHT PAGE (TITLE, DATE, CAPTION) */}
              <div className="flex-1 flex flex-col justify-between p-2 md:pl-6 relative">
                <div>
                  {/* Date */}
                  <span className="font-sans text-[10px] uppercase font-bold text-neutral-400 tracking-widest">
                    {scrapbook[page].date}
                  </span>
                  
                  {/* Page Title */}
                  <h3 className="font-greatvibes text-4xl text-rose font-bold mt-1">
                    {scrapbook[page].title}
                  </h3>

                  <div className="w-16 h-0.5 bg-rose/30 my-4" />

                  {/* Caption */}
                  <p className="font-dancing text-2xl leading-relaxed text-[#4A3B32] italic font-bold">
                    &quot;{scrapbook[page].caption}&quot;
                  </p>
                </div>

                {/* Page number footer */}
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-neutral-200/50">
                  <span className="font-sans text-[9px] uppercase font-bold text-neutral-400 tracking-widest">
                    Handmade Log
                  </span>
                  <span className="font-sans text-xs font-bold text-[#C5A880]">
                    Page {page + 1} / {scrapbook.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Book binding center shadow */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none hidden md:block" />
        </div>

        {/* Page controllers */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="p-3 rounded-full bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-[#FAF8F5] border border-[#FAF8F5]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextPage}
            disabled={page === scrapbook.length - 1}
            className="p-3 rounded-full bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-[#FAF8F5] border border-[#FAF8F5]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Continuation controls */}
      <div className="z-10 h-16 mt-8 flex items-center justify-center">
        {isLastPage && onNext && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(197, 168, 128, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C5A880] to-[#aa8e67] text-white font-semibold text-xs tracking-widest uppercase border border-amber-600/30 cursor-pointer shadow-md flex items-center gap-1.5"
            >
              Close Scrapbook <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
