"use client";

import useTheme from "@/hooks/useTheme";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const ThemeSwitch = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			className="fixed bottom-5 right-5 flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-black/[0.05] bg-white bg-opacity-80 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] active:scale-105 dark:border-white/[0.1] dark:bg-gray-950"
			onClick={toggleTheme}
		>
			{theme === "dark" ? <FaSun /> : <FaMoon />}
		</button>
	);
};

export default ThemeSwitch;
