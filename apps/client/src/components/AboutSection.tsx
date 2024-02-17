"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ComponentRef } from "react";
import useInviewSection from "@/hooks/useInViewSection";
import Image from "next/image";

type Props = {
  bio: string;
  cover: string;
};

const AboutSection: FC<Props> = ({ bio, cover }) => {
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
      <Image
        className="my-3 rounded-lg w-[20rem] h-[25rem] sm:w-[25rem] sm:h-[30rem] mx-auto"
        src={cover}
        width={1000}
        height={1000}
        quality={95}
        alt="Profile"
      />
      <p className="mb-3">{bio}</p>
    </motion.section>
  );
};

export default AboutSection;
