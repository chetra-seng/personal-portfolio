"use client";

import Image from "next/image";
import React from "react";
import useInviewSection from "@/hooks/useInViewSection";
import type { Project } from "@/models/project";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

type Props = {
  projects: Project[];
};

const ProjectSection: React.FC<Props> = ({ projects }) => {
  const ref = React.useRef<React.ComponentRef<"section">>(null);
  useInviewSection(ref, "Projects", 0.5);

  return (
    <section ref={ref} id="project" className="mb-28 w-full max-w-4xl scroll-mt-28">
      <h2 className="section-header text-center">Projects</h2>
      <BentoGrid>
        {projects.map((project) => (
          <BentoGridItem
            key={project._id}
            className={project.featured ? "md:col-span-2" : ""}
            title={project.title}
            description={<p className="line-clamp-3 leading-relaxed">{project.description}</p>}
            header={
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                {project.imageUrl && (
                  <Image
                    src={`${project.imageUrl}?w=800`}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-300 group-hover/bento:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
            }
            icon={
              <ul className="mb-2 flex flex-wrap gap-1">
                {project.skills.map((skill) => (
                  <li
                    key={skill._id}
                    className="rounded-full bg-black/[0.7] px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-white dark:text-white/80"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            }
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default ProjectSection;
