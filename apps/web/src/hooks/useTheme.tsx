import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function useTheme() {
	const themeContext = useContext(ThemeContext);

	if (!themeContext) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return themeContext;
}
