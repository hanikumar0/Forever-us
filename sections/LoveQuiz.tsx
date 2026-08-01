"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Heart, X, Check, Award, ArrowRight, Zap } from "lucide-react";
import { QuizQuestion } from "../types/config";

interface LoveQuizProps {
  quiz: QuizQuestion[];
  onNext?: () => void;
}

export default function LoveQuiz({ quiz, onNext }: LoveQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (optIdx: number) => {
    if (showFeedback) return;
    setSelectedOpt(optIdx);
    const correct = optIdx === quiz[currentIdx].correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOpt(null);
    if (currentIdx + 1 < quiz.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowFeedback(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section className="relative w-full min-h-screen py-20 bg-[#090214] flex flex-col justify-between px-6 text-center select-none overflow-hidden">
      
      {/* Game Show Stage Neon Highlights */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-rose to-fuchsia-500 shadow-[0_0_20px_#ff007f] z-10" />
      
      {/* Spotlight Cones */}
      <div className="absolute top-0 left-[-10%] w-[250px] h-[400px] bg-gradient-to-b from-fuchsia-500/10 to-transparent rotate-[-25deg] blur-[40px] pointer-events-none" />
      <div className="absolute top-0 right-[-10%] w-[250px] h-[400px] bg-gradient-to-b from-cyan-500/10 to-transparent rotate-[25deg] blur-[40px] pointer-events-none" />

      <div className="w-full max-w-xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="font-greatvibes text-5xl md:text-6xl text-white mb-2 tracking-wide drop-shadow-[0_0_12px_rgba(255,77,141,0.6)]">
            The Couple Show Quiz 🏆
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose to-transparent mx-auto mb-3" />
          <p className="font-sans text-rose text-xs font-semibold tracking-widest uppercase">
            Let's see if you can hit the ultimate jackpot score!
          </p>
        </motion.div>
      </div>

      {/* Quiz Panel Wrapper */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex-1 flex flex-col justify-center">
        <div className="relative min-h-[380px] w-full bg-black/45 backdrop-blur-xl rounded-3xl p-6 border-[2px] border-rose/30 shadow-[0_0_30px_rgba(255,77,141,0.1)] flex flex-col justify-between">
          
          {/* LED lights header */}
          <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 bg-rose text-white px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-md">
            LIVE BROADCAST 📡
          </div>

          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between"
              >
                {/* Score Header */}
                <div>
                  <div className="flex justify-between items-center mb-6 mt-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-cyan-400">
                      Round {currentIdx + 1} / {quiz.length}
                    </span>
                    <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-rose fill-current" /> Points: {score * 100}
                    </span>
                  </div>

                  <h3 className="font-sans text-base sm:text-lg font-bold leading-relaxed text-white mb-6">
                    {quiz[currentIdx].question}
                  </h3>
                </div>

                {/* Option Buttons */}
                <div className="space-y-3">
                  {quiz[currentIdx].options.map((option, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isRight = optIdx === quiz[currentIdx].correctIndex;
                    let buttonClass = "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-rose-400/40";

                    if (showFeedback) {
                      if (isSelected) {
                        buttonClass = isCorrect
                          ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                          : "bg-rose-500/10 border-rose-500/60 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.2)]";
                      } else if (isRight) {
                        buttonClass = "bg-emerald-500/5 border-emerald-500/30 text-emerald-300/80";
                      } else {
                        buttonClass = "bg-white/2 border-transparent text-white/15";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={showFeedback}
                        onClick={() => handleAnswerSelect(optIdx)}
                        className={`w-full p-4 rounded-xl text-left border text-sm font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer ${buttonClass}`}
                      >
                        <span>{option}</span>
                        {showFeedback && isSelected && (
                          isCorrect ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback screen */}
                <div className="h-24 mt-6 flex flex-col justify-end">
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center text-center"
                    >
                      <p className="text-xs font-sans font-medium text-white/80 mb-3 px-2">
                        {isCorrect ? quiz[currentIdx].correctResponse : quiz[currentIdx].wrongResponse}
                      </p>
                      
                      <button
                        onClick={handleNext}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-romantic-pink to-rose text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-rose/25"
                      >
                        {currentIdx + 1 < quiz.length ? "Submit Next round" : "Finish Broadcast"}
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              // Stage Results Summary
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-4"
              >
                <div className="w-16 h-16 rounded-full bg-rose/10 flex items-center justify-center text-rose mb-6 animate-bounce border border-rose/30">
                  <Award className="w-8 h-8" />
                </div>

                <h3 className="font-greatvibes text-4xl text-white mb-2">Jackpot Achieved! 🏆</h3>
                
                <p className="font-sans text-white/70 text-sm mb-6 max-w-xs leading-relaxed">
                  You collected <span className="text-rose font-bold">{score * 100} points</span>. 
                  {score === quiz.length 
                    ? " Perfect sweep! You are the absolute queen of my memory vaults. ❤️" 
                    : " Excellent performance! Every shared moment is a winner. 😘"}
                </p>

                <button
                  onClick={restartQuiz}
                  className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Replay Round 🔄
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Continuation controls */}
      <div className="z-10 h-16 mt-8 flex items-center justify-center">
        {quizFinished && onNext && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 77, 141, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-romantic-pink to-rose text-white font-semibold text-xs tracking-widest uppercase border border-rose-400 cursor-pointer shadow-md flex items-center gap-1.5"
            >
              Proceed Chapter <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
