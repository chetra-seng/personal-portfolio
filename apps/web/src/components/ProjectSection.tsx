"use client";

import React from "react";
import { Project } from "@/models/project";
import ProjectCard from "./ProjectCard";
import useInviewSection from "@/hooks/useInViewSection";

type Props = {
  projects: Project[];
};

const ProjectSection: React.FC<Props> = ({ projects }) => {
  const renderProjects = React.useCallback(() => {
    return projects.map((project) => (
      <React.Fragment key={project._id}>
        <ProjectCard {...project} />
      </React.Fragment>
    ));
  }, [projects]);

  const ref = React.useRef<React.ComponentRef<"section">>(null);
  useInviewSection(ref, "Projects", 0.5);

  return (
    <section ref={ref} id="project" className="mb-28 scroll-mt-28">
      <h2 className="section-header text-center">Projects</h2>
      <div>{renderProjects()}</div>
    </section>
  );
};

export default ProjectSection;
