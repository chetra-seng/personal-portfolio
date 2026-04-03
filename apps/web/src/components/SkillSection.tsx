"use client";

import { HoverCardArrow } from "@radix-ui/react-hover-card";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import useInviewSection from "@/hooks/useInViewSection";
import type { Skill } from "@/models/skill";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type Props = {
  skills: Skill[];
};

const SkillSection: React.FC<Props> = ({ skills }) => {
  const skillAnimation = React.useMemo(
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
    [],
  );

  const skillList = React.useMemo(() => {
    return skills.map((skill, index) => (
      <motion.li
        key={skill._id}
        variants={skillAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        custom={index}
      >
        <div className="group flex items-center rounded-xl border border-black/[0.1] bg-white px-5 py-3 dark:bg-white/10 dark:text-white/80">
          <Image
            className="mr-2 flex-shrink-0"
            width={20}
            height={20}
            alt={skill.name}
            src={`https://cdn.simpleicons.org/${skill.slug}`}
            unoptimized
          />

          <div className="relative group w-full min-w-[3rem] overflow-hidden">
            {/* Skill Name */}
            <span className="block transition-all duration-500 ease-in-out transform group-hover:translate-y-[-100%] group-hover:opacity-0">
              {skill.name}
            </span>

            {/* Progress Bar */}
            <div className="absolute left-0 top-0 w-full h-full flex items-center gap-2 opacity-0 transform translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="relative w-40 h-1.5 bg-gray-200 dark:bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-in-out bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-sm">{skill.level}%</span>
            </div>
          </div>
        </div>
      </motion.li>
    ));
  }, [skills, skillAnimation]);

  const ref = React.useRef<React.ComponentRef<"section">>(null);
  useInviewSection(ref, "Skills", 0.5);

  return (
    <section ref={ref} id="skill" className="mb-28 max-w-212 scroll-mt-28 text-center sm:mb-40">
      <h2 className="section-header text-center">Skills</h2>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">{skillList}</ul>
    </section>
  );
};

export default SkillSection;
