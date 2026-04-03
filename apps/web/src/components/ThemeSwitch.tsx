"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import type React from "react";
import useTheme from "@/hooks/useTheme";

const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      className="fixed bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.05] bg-white bg-opacity-80 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] active:scale-105 dark:border-white/[0.1] dark:bg-gray-950"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </button>
  );
};

export default ThemeSwitch;
