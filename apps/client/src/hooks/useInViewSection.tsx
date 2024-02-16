import { useActiveSection } from "@/context/ActiveSectionContext";
import { useInView } from "framer-motion";
import { useEffect } from "react";
import { RefObject } from "react";

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
  }, [inView, setActiveSection]);
};

export default useInviewSection;
