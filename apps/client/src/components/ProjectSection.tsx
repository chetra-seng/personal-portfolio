"use client";

import { Project } from "@/models/project";
import { FC, Fragment, useCallback, useRef, ComponentRef } from "react";
import ProjectCard from "./ProjectCard";
import useInviewSection from "@/hooks/useInViewSection";

type Props = {
  projects: Project[];
};

const ProjectSection: FC<Props> = ({ projects }) => {
  const renderProjects = useCallback(() => {
    return projects.map((project) => (
      <Fragment key={project._id}>
        <ProjectCard {...project} />
      </Fragment>
    ));
  }, [projects]);

  const ref = useRef<ComponentRef<"section">>(null);
  useInviewSection(ref, "Projects", 0.5);

  return (
    <section ref={ref} id="project" className="scroll-mt-28 mb-28">
      <h2 className="section-header text-center">Projects</h2>
      <div>{renderProjects()}</div>
    </section>
  );
};

export default ProjectSection;
