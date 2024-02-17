"use client";

import useInviewSection from "@/hooks/useInViewSection";
import { Skill } from "@/models/skill";
import React, { ComponentRef, FC, useMemo, useRef } from "react";
import { motion } from "framer-motion";

type Props = {
  skills: Skill[];
};

const SkillSection: FC<Props> = ({ skills }) => {
  const skillAnimation = useMemo(
    () => ({
      initial: {
        opacity: 0,
        y: 100,
      },
      animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.05,
        },
      }),
    }),
    []
  );

  const skillList = useMemo(() => {
    return skills.map((skill, index) => (
      <motion.li
        key={skill._id}
        className="bg-white border border-black/[0.1] rounded-xl px-5 py-3"
        variants={skillAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        custom={index}
      >
        {skill.name}
      </motion.li>
    ));
  }, [skills, skillAnimation]);

  const ref = useRef<ComponentRef<"section">>(null);
  useInviewSection(ref, "Skills", 0.5);

  return (
    <section
      ref={ref}
      id="skill"
      className="mb-28 sm:mb-40 scroll-mt-28 max-w-[53rem] text-center"
    >
      <h2 className="section-header text-center">Skills</h2>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skillList}
      </ul>
    </section>
  );
};

export default SkillSection;
