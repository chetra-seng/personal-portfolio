import { Project } from "@/model/project";
import { FC, Fragment, useCallback } from "react";
import ProjectCard from "./ProjectCard";

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

  return (
    <section>
      <h2 className="section-header text-center">Projects</h2>
      <div>{renderProjects()}</div>
    </section>
  );
};

export default ProjectSection;
