"use client";

import { createContext } from "react";
import { useContext } from "react";
import { PropsWithChildren } from "react";
import { FC } from "react";
import { useState } from "react";

export const ActiveSectionContext = createContext<{
  activeSection: string;
  setActiveSection: (section: string) => void;
  lastTime: number;
  setLastTime: (time: number) => void;
} | null>(null);

const ActiveSectionContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeSection, setActiveSection] = useState("Home");
  const [lastTime, setLastTime] = useState(0);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        lastTime,
        setLastTime,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
};

export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error(
      "useActiveSection must be used within a ActiveSectionContextProvider"
    );
  }
  return context;
}

export default ActiveSectionContextProvider;
