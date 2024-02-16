"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { useEffect } from "react";
import { useRef } from "react";
import { ComponentRef } from "react";
import { useInView } from "framer-motion";
import useInviewSection from "@/hooks/useInViewSection";
import { set } from "sanity/migrate";

type Props = {
  bio: string;
};

const AboutSection: FC<Props> = ({ bio }) => {
  const ref = useRef<ComponentRef<"section">>(null);
  useInviewSection(ref, "About", 0.8);

  return (
    <motion.section
      ref={ref}
      id="about"
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
    >
      <h2 className="section-header">About me</h2>
      <p className="mb-3">{bio}</p>
    </motion.section>
  );
};

export default AboutSection;
