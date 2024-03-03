"use client";

import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from "react";

type Theme = "light" | "dark";

export const ThemeContext = createContext<{
	theme: Theme;
	toggleTheme: () => void;
} | null>(null);

const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>("dark");

	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
			window.localStorage.setItem("theme", "dark");
			document.documentElement.classList.add("dark");
		} else {
			setTheme("light");
			window.localStorage.setItem("theme", "light");
			document.documentElement.classList.remove("dark");
		}
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem("theme") as Theme | null;

		if (localTheme) {
			setTheme(localTheme);

			if (localTheme === "dark") {
				document.documentElement.classList.add("dark");
			}
		} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
			setTheme("light");
			document.documentElement.classList.remove("dark");
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
			document.documentElement.classList.add("dark");
		}
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
