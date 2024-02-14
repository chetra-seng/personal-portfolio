"use client";

import { FC } from "react";
import { motion } from "framer-motion";

type Props = {
  bio: string;
};

const AboutSection: FC<Props> = ({ bio }) => {
  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40"
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
