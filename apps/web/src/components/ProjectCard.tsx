"use client";

import React from "react";
import { Project } from "@/models/project";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = Project;

const ProjectCard: React.FC<Props> = ({
  title,
  description,
  imageUrl,
  skills,
}) => {
  const ref = React.useRef<React.ComponentRef<"div">>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const renderSkills = React.useMemo(() => {
    return skills.map((skill) => (
      <li
        key={skill._id}
        className="rounded-full bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:text-white/80"
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
      className="group mb-3 last:mb-0 sm:mb-8"
    >
      <section className="relative max-w-[42rem] overflow-hidden rounded-lg border border-black/5 bg-gray-100 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:h-[22.5rem] sm:pr-8 sm:group-even:pl-8">
        <div className="flex h-full flex-col px-5 pb-7 pt-4 sm:max-w-[50%] sm:pl-10 sm:pr-2 sm:pt-10 sm:group-even:ml-[18rem]">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
            {renderSkills}
          </ul>
        </div>
        <Image
          className="absolute -right-40 top-8 hidden h-auto w-[30rem] rounded-t-lg shadow-2xl transition group-even:-left-40 group-even:right-[initial] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-[1.04] group-even:group-hover:translate-x-3 group-even:group-hover:rotate-2 sm:block"
          alt={title}
          src={`${imageUrl}?w=800`}
          quality={100}
          width={800}
          height={800}
        />
      </section>
    </motion.div>
  );
};

export default ProjectCard;
