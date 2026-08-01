"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  type: "heart" | "firefly" | "star";
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles on client side
    const initialParticles: Particle[] = [];
    
    // 15 Floating Hearts
    for (let i = 0; i < 15; i++) {
      initialParticles.push({
        id: i,
        type: "heart",
        size: Math.random() * 15 + 10,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 15 + 15,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    // 25 Fireflies
    for (let i = 0; i < 25; i++) {
      initialParticles.push({
        id: i + 15,
        type: "firefly",
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 8,
        opacity: Math.random() * 0.6 + 0.3,
      });
    }

    // 8 Shooting Stars
    for (let i = 0; i < 8; i++) {
      initialParticles.push({
        id: i + 40,
        type: "star",
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    setParticles(initialParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dark Ambient Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-deep-purple/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-romantic-pink/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-lavender/10 blur-[100px] pointer-events-none" />

      {/* Rendered Particles */}
      {particles.map((p) => {
        if (p.type === "heart") {
          return (
            <div
              key={p.id}
              className="absolute bottom-[-50px] text-rose/30 animate-float pointer-events-none"
              style={{
                left: `${p.left}%`,
                fontSize: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                opacity: p.opacity,
                filter: "drop-shadow(0 0 5px rgba(255, 122, 162, 0.3))",
              }}
            >
              ❤️
            </div>
          );
        } else if (p.type === "firefly") {
          return (
            <div
              key={p.id}
              className="absolute rounded-full bg-gold/80 animate-pulse pointer-events-none"
              style={{
                left: `${p.left}%`,
                top: `${Math.random() * 90 + 5}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                opacity: p.opacity,
                boxShadow: "0 0 10px #FFD166, 0 0 20px #FFD166",
              }}
            />
          );
        } else {
          // Shooting Star (diagonal translation)
          return (
            <div
              key={p.id}
              className="absolute w-[2px] h-[80px] bg-gradient-to-b from-white to-transparent rotate-[35deg] pointer-events-none opacity-0 animate-pulse-glow"
              style={{
                left: `${p.left}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                transform: "rotate(35deg) scale(0.8)",
              }}
            />
          );
        }
      })}
    </div>
  );
}
