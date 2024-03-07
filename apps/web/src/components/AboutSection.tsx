"use client";

import React from "react";
import { motion } from "framer-motion";
import useInviewSection from "@/hooks/useInViewSection";
import Image from "next/image";

type Props = {
	bio: string;
	cover: string;
};

const AboutSection: React.FC<Props> = ({ bio, cover }) => {
	const ref = React.useRef<React.ComponentRef<"section">>(null);
	useInviewSection(ref, "About", 0.8);

	return (
		<motion.section
			ref={ref}
			id="about"
			className="mb-28 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-40"
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.18 }}
		>
			<h2 className="section-header">About me</h2>
			<Image
				className="mx-auto my-3 h-[25rem] w-[20rem] rounded-lg sm:h-[30rem] sm:w-[24rem]"
				src={`${cover}?h=700`}
				width={560}
				height={700}
				quality={100}
				alt="Profile"
				priority
			/>
			<p className="mb-3">{bio}</p>
		</motion.section>
	);
};

export default AboutSection;
