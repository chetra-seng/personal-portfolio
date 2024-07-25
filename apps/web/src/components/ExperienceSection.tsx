"use client";

import React from "react";
import useInviewSection from "@/hooks/useInViewSection";
import useTheme from "@/hooks/useTheme";
import { Experience } from "@/models/experience";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { formatDate } from "@/utils/date";

type Props = {
  experiences: Experience[];
};

const ExperienceSection: React.FC<Props> = ({ experiences }) => {
  const ref = React.useRef<React.ComponentRef<"section">>(null);
  useInviewSection(ref, "Experience", 0.5);
  const { theme } = useTheme();

  return (
    <section ref={ref} id="experience" className="mb-28 scroll-mt-28 sm:mb-40">
      <h2 className="section-header text-center">My Experience</h2>
      <VerticalTimeline lineColor="">
        {experiences.map((experience) => (
          <React.Fragment key={experience._id}>
            <VerticalTimelineElement
              visible={true}
              date={`${formatDate(experience.startDate)} - ${experience.endDate ? formatDate(experience.endDate) : "Present"}`}
              iconStyle={{
                background: theme === "light" ? "white" : "#333333FF",
                fontSize: "1.5rem",
              }}
              icon={
                <div className="flex items-center justify-center p-2 lg:p-3">
                  <Image
                    src={
                      theme === "light"
                        ? experience.iconUrl
                        : experience.darkIconUrl
                    }
                    alt={experience.title}
                    width={300}
                    height={300}
                  />
                </div>
              }
              contentStyle={{
                background:
                  theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: `1px solid ${theme === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.5)"}`,
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{ borderRight: "0.4rem solid #9ca3af" }}
            >
              <h3 className="font-semibold capitalize">{experience.title}</h3>
              <h4 className="!mt-0 font-normal">{experience.company}</h4>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {experience.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default ExperienceSection;
