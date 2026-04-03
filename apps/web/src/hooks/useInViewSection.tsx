"use client";

import { useInView } from "framer-motion";
import React from "react";
import useActiveSection from "./useActiveSection";

export default function useInviewSection(
  ref: React.RefObject<HTMLElement | null>,
  section: string,
  amount: number,
) {
  const inView = useInView(ref, { amount });
  const { setActiveSection, lastTime } = useActiveSection();

  React.useEffect(() => {
    if (inView && Date.now() - lastTime > 1000) {
      setActiveSection(section);
    }
  }, [inView, setActiveSection, lastTime, section]);
}
