import { useContext } from "react";
import { ThemeContext } from "@/contexts/theme-context";

export default function useTheme() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return themeContext;
}
