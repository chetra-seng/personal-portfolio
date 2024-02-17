"use client";

import { Project } from "@/models/project";
import Image from "next/image";
import React, { ComponentRef, FC, useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = Project;

const ProjectCard: FC<Props> = ({ title, description, imageUrl, skills }) => {
  const ref = useRef<ComponentRef<"div">>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const renderSkills = useCallback(() => {
    return skills.map((skill) => (
      <li
        key={skill._id}
        className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full"
      >
        {skill.name}
      </li>
    ));
  }, [skills]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="relative bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 sm:h-[20rem] hover:bg-gray-200 group-even:pl-8 transition">
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full group-even:ml-[18rem]">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700">{description}</p>
          <ul className="flex flex-wrap gap-2 mt-4 sm:mt-auto">
            {renderSkills()}
          </ul>
        </div>
        <Image
          className="absolute top-8 -right-40 w-[28.25rem] h-auto rounded-t-lg shadow-2xl group-even:right-[initial] group-even:-left-40 group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-even:group-hover:translate-x-3 group-even:group-hover:rotate-2 group-hover:scale-[1.04] transition"
          alt={title}
          src={imageUrl}
          quality={95}
          width={700}
          height={700}
        />
      </section>
    </motion.div>
  );
};

export default ProjectCard;
