"use client";

import useInviewSection from "@/hooks/useInViewSection";
import useTheme from "@/hooks/useTheme";
import { Experience } from "@/models/experience";
import moment from "moment";
import Image from "next/image";
import React, { ComponentRef, FC, Fragment, useRef } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

type Props = {
  experiences: Experience[];
};

const ExperienceSection: FC<Props> = ({ experiences }) => {
  const ref = useRef<ComponentRef<"section">>(null);
  useInviewSection(ref, "Experience", 0.5);
  const { theme } = useTheme();

  return (
    <section ref={ref} id="experience" className="scroll-mt-28 mb-28 sm:mb-40">
      <h2 className="section-header text-center">My Experience</h2>
      <VerticalTimeline lineColor="">
        {experiences.map((experience) => (
          <Fragment key={experience._id}>
            <VerticalTimelineElement
              visible={true}
              date={`${moment(experience.startDate).format("MMM YYYY")} - ${experience.endDate ? moment(experience.endDate).format("MMM YYYY") : "Present"}`}
              iconStyle={{
                background: theme === "light" ? "white" : "#d1d1d1",
                fontSize: "1.5rem",
              }}
              icon={
                <div className="flex justify-center items-center p-3.5">
                  <Image
                    src={experience.iconUrl}
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
              <h4 className="font-normal !mt-0">{experience.company}</h4>
              <p className="!mt-1 !font-normal text-gray-700 text-white/75">
                {experience.description}
              </p>
            </VerticalTimelineElement>
          </Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default ExperienceSection;
