"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { FinaleConfig } from "../types/config";

interface GrandFinaleProps {
  data: FinaleConfig;
  girlfriendName: string;
}

export default function GrandFinale({ data, girlfriendName }: GrandFinaleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Multi-element Canvas (Rose petals + Fireworks particles + floating hearts)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Rose petals definition
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }

    // Firework particle definition
    interface FireworkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      decay: number;
      size: number;
    }

    const petals: Petal[] = [];
    const maxPetals = 30;

    for (let i = 0; i < maxPetals; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * -height,
        size: Math.random() * 10 + 6,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 1.5 + 1.2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 1.5 - 0.75,
        opacity: Math.random() * 0.6 + 0.4,
      });
    }

    let fireworkParticles: FireworkParticle[] = [];
    const colors = ["#ff4d8d", "#ff7aa2", "#b388ff", "#ffd166", "#ffffff", "#22d3ee"];

    const createExplosion = (x: number, y: number) => {
      const count = 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        fireworkParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          size: Math.random() * 2.5 + 1
        });
      }
    };

    let timer = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Randomly spawn fireworks
      timer++;
      if (timer % 90 === 0) {
        createExplosion(Math.random() * width, Math.random() * (height * 0.5));
      }

      // 1. Draw & update fireworks
      fireworkParticles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          fireworkParticles.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw & update rose petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 77, 141, ${p.opacity})`;
        ctx.strokeStyle = `rgba(255, 122, 162, ${p.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
        ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none"
      style={{
        background: "linear-gradient(135deg, #090214 0%, #030a1c 50%, #02110d 100%)",
      }}
    >
      {/* Aurora Waving Overlay */}
      <div 
        className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.2)_0%,transparent_70%)] pointer-events-none filter blur-[60px]"
        style={{
          animation: "pulse-glow 8s infinite ease-in-out"
        }}
      />

      {/* Rose/Firework Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      <div className="w-full max-w-2xl z-20 flex flex-col items-center">
        {/* Glowing Hearts Climax */}
        <motion.div
          animate={{
            scale: [1, 1.22, 1.05, 1.3, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="text-romantic-pink drop-shadow-[0_0_35px_rgba(255,77,141,0.9)] mb-8"
        >
          <Heart className="w-24 h-24 fill-current" />
        </motion.div>

        {/* Finale Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-greatvibes text-5xl sm:text-7xl text-white font-bold leading-tight select-none tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-rose to-romantic-pink mb-4"
        >
          For My Princess, {girlfriendName} ❤️
        </motion.h1>

        {/* Gold Climax Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 md:p-12 border border-rose-400/30 shadow-2xl relative max-w-xl mx-auto"
        >
          {/* Sparkles */}
          <div className="absolute -top-4 -right-4 text-gold animate-pulse">
            <Sparkles className="w-8 h-8 fill-current" />
          </div>

          <p className="font-dancing text-3xl md:text-4xl text-white leading-relaxed italic select-none">
            &quot;{data.message}&quot;
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
