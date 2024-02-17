"use client";

import useTheme from "@/hooks/useTheme";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed bottom-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 border border-black/[0.05] dark:border-white/[0.1]"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeSwitch;
