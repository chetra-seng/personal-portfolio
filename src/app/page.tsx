"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main>
      <Button
        color="primary"
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        Click me
      </Button>
    </main>
  );
}
