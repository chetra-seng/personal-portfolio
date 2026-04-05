"use client";

import React from "react";
import { getThemeCookie } from "@/utils/cookie";

type Theme = "light" | "dark";

type Props = {
  theme: Theme;
};

export const ThemeContext = React.createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

const ThemeContextProvider: React.FC<React.PropsWithChildren & Props> = ({
  children,
  theme: defaultTheme,
}) => {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.cookie = `theme=dark; path=/; max-age=31536000`;
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.cookie = `theme=light; path=/; max-age=31536000`;
      document.documentElement.classList.remove("dark");
    }
  };

  React.useEffect(() => {
    const localTheme = getThemeCookie();

    if (localTheme) {
      setTheme(localTheme);

      if (localTheme === "light") {
        document.documentElement.classList.remove("dark");
        return;
      }

      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
