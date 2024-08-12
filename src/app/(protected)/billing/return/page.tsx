"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2Icon } from "lucide-react";

export default function Success() {
  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <CheckCircle2Icon className="h-24 w-24 text-green-500" />
      <h1 className="mt-4 text-4xl font-bold text-green-700">Payment Successful</h1>
      <p className="mt-2 text-lg text-green-600">Thank you for your purchase!</p>
    </div>
  );
}