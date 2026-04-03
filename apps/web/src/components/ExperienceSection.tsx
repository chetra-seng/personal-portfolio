"use client";

import React from "react";
import useInviewSection from "@/hooks/useInViewSection";
import type { Experience } from "@/models/experience";
import "react-vertical-timeline-component/style.min.css";
import { formatDate } from "@/utils/date";
import { Timeline } from "./ui/timeline";

type Props = {
  experiences: Experience[];
};

const ExperienceSection: React.FC<Props> = ({ experiences }) => {
  const ref = React.useRef<React.ComponentRef<"section">>(null);
  useInviewSection(ref, "Experience", 0.5);

  return (
    <section ref={ref} id="experience" className="mb-28 scroll-mt-28 sm:mb-40">
      <h2 className="section-header text-center">My Experience</h2>
      <p className="text-center text-gray-700 dark:text-white/80">
        Here is my work experience timeline
      </p>
      <Timeline
        data={experiences.map((exp) => ({
          title: `${formatDate(exp.startDate)} - ${exp?.endDate ? formatDate(exp.endDate) : "Present"}`,
          content: (
            <div className="text-left">
              <h3 className="font-semibold capitalize">{exp.title}</h3>
              <h4 className="mt-0 font-normal mb-2">{exp.company}</h4>
              <p className="mt-1 font-normal text-gray-700 dark:text-white/75">{exp.description}</p>
            </div>
          ),
        }))}
      />
    </section>
  );
};

export default ExperienceSection;
