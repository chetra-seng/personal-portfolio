"use client";

import { cn } from "@/utils/cn";
import type React from "react";

import { useEffect, useRef, useState } from "react";

export function BackgroundGradientAnimation({
  children,
  className,
  containerClassName,
  colors = ["#c084fc", "#818cf8", "#38bdf8", "#22d3ee"],
  blurRadius = 100,
  motionSpeed = 50,
  renderAsChild = false,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  blurRadius?: number;
  motionSpeed?: number;
  renderAsChild?: boolean;
}) {
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const rect = document.body.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      const tgXNew = percentX * 100;
      const tgYNew = percentY * 100;
      setTgX(tgXNew);
      setTgY(tgYNew);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurX((prev) => {
        const diff = tgX - prev;
        return prev + diff / motionSpeed;
      });
      setCurY((prev) => {
        const diff = tgY - prev;
        return prev + diff / motionSpeed;
      });
    }, 1);
    return () => clearInterval(interval);
  }, [tgX, tgY, motionSpeed]);

  const Comp = renderAsChild ? "div" : "section";

  return (
    <Comp
      className={cn(
        "absolute h-[80vh] inset-x-0 top-0 z-0 opacity-50 transition-opacity duration-500 border-none",
        containerClassName,
      )}
    >
      <div
        ref={gradientRef}
        className={cn(
          "absolute inset-0 z-0 opacity-50 transition-opacity duration-500",
          className,
        )}
        style={{
          background: `radial-gradient(circle at ${50 + curX / 20}% ${
            50 + curY / 20
          }%, ${colors[0]} 0%, transparent 60%), 
          radial-gradient(circle at ${50 + curX / 10}% ${50 + curY / 5}%, ${colors[1]} 0%, transparent 50%), 
          radial-gradient(circle at ${50 - curX / 10}% ${50 - curY / 5}%, ${colors[2]} 0%, transparent 40%),
          radial-gradient(circle at ${50 - curX / 15}% ${50 - curY / 10}%, ${colors[3]} 0%, transparent 50%)`,
          filter: `blur(${blurRadius}px)`,
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </Comp>
  );
}
