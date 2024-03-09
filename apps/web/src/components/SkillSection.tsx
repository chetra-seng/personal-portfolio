"use client";

import React from "react";
import useInviewSection from "@/hooks/useInViewSection";
import { Skill } from "@/models/skill";
import { motion } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HoverCardArrow } from "@radix-ui/react-hover-card";

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
				<HoverCard>
					<HoverCardTrigger asChild>
						<button className="cursor-pointer rounded-xl border border-black/[0.1] bg-white px-5 py-3 dark:bg-white/10 dark:text-white/80">
							{skill.name}
						</button>
					</HoverCardTrigger>
					<HoverCardContent className="w-64">
						<HoverCardArrow asChild>
							<div className="border-x-[6px] border-t-[8px] border-solid border-x-transparent border-t-gray-400 dark:border-t-gray-500" />
						</HoverCardArrow>
						<div className="flex justify-center space-x-4 text-left">
							<Avatar className="bg-white dark:bg-white/10">
								<AvatarImage src={`${skill.skillLogo}?h=100`} />
								<AvatarFallback>{skill.name}</AvatarFallback>
							</Avatar>
							<div className="space-y-1">
								<h4 className="text-sm font-semibold">{skill.name}</h4>
								<p className="text-sm">
									Skill proficiency:{" "}
									<span className="font-semibold">{skill.level}%</span>
								</p>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</motion.li>
		));
	}, [skills, skillAnimation]);

	const ref = React.useRef<React.ComponentRef<"section">>(null);
	useInviewSection(ref, "Skills", 0.5);

	return (
		<section
			ref={ref}
			id="skill"
			className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
		>
			<h2 className="section-header text-center">Skills</h2>
			<ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
				{skillList}
			</ul>
		</section>
	);
};

export default SkillSection;
