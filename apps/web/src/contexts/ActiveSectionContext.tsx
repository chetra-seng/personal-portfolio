"use client";

import React from "react";

export const ActiveSectionContext = React.createContext<{
  activeSection: string;
  setActiveSection: (section: string) => void;
  lastTime: number;
  setLastTime: (time: number) => void;
} | null>(null);

const ActiveSectionContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [activeSection, setActiveSection] = React.useState("Home");
  const [lastTime, setLastTime] = React.useState(0);

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

export default ActiveSectionContextProvider;
