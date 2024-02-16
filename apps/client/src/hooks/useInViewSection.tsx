"use client";

import { useInView } from "framer-motion";
import { useEffect, RefObject } from "react";
import useActiveSection from "./useActiveSection";

const useInviewSection = (
  ref: RefObject<HTMLElement>,
  section: string,
  amount: number
) => {
  const inView = useInView(ref, { amount });
  const { setActiveSection, lastTime } = useActiveSection();

  useEffect(() => {
    if (inView && Date.now() - lastTime > 1000) {
      setActiveSection(section);
    }
  }, [inView, setActiveSection, lastTime, section]);
};

export default useInviewSection;
