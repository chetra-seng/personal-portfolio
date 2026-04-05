"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import useTheme from "@/hooks/use-theme";
import { cn } from "@/utils/cn";

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

  const [gradientColors, setGradientColors] = useState(colors);

  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "light") {
      setGradientColors(["#1e293b", "#0f172a", "#334155", "#0ea5e9"]);
    } else {
      setGradientColors(colors);
    }
  }, [theme, colors]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = document.body.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      setTgX(percentX * 100);
      setTgY(percentY * 100);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const interval = setInterval(() => {
      setCurX((prev) => prev + (tgX - prev) / motionSpeed);
      setCurY((prev) => prev + (tgY - prev) / motionSpeed);
    }, 16);
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
        className={cn("absolute inset-0 z-0 opacity-50 transition-opacity duration-500", className)}
        style={{
          background: `radial-gradient(circle at ${50 + curX / 20}% ${
            50 + curY / 20
          }%, ${gradientColors[0]} 0%, transparent 60%),
          radial-gradient(circle at ${50 + curX / 10}% ${50 + curY / 5}%, ${gradientColors[1]} 0%, transparent 50%), 
          radial-gradient(circle at ${50 - curX / 10}% ${50 - curY / 5}%, ${gradientColors[2]} 0%, transparent 40%),
          radial-gradient(circle at ${50 - curX / 15}% ${50 - curY / 10}%, ${gradientColors[3]} 0%, transparent 50%)`,
          filter: `blur(${blurRadius}px)`,
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </Comp>
  );
}
