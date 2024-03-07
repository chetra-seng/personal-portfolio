"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SocialIcon from "./SocialIcon";
import Link from "next/link";
import { Social } from "@/models/social";
import { FC, useRef, ComponentRef } from "react";
import useInviewSection from "@/hooks/useInViewSection";

type Props = {
	name: string;
	profileUrl: string;
	shortDesc: string;
	socials: Social[];
	jobTitle: string;
};

const HeroSection: FC<Props> = ({
	name,
	profileUrl,
	shortDesc,
	socials,
	jobTitle,
}) => {
	const ref = useRef<ComponentRef<"section">>(null);
	useInviewSection(ref, "Home", 0.8);

	const socialParent = {
		initial: {
			y: 100,
			opacity: 0,
		},
		animate: {
			y: 0,
			opacity: 1,
			transition: {
				staggerChildren: 0.04,
				type: "spring",
				stiffness: 125,
				delay: 0.05,
				duration: 0.5,
			},
		},
	};

	const socialChildren = {
		initial: {
			y: 20,
			opacity: 0,
		},
		animate: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<section
			ref={ref}
			id="home"
			className="mb-28 max-w-[50rem] scroll-mt-[100rem] text-center sm:mb-0"
		>
			<div className="flex items-center justify-center">
				<motion.div
					className="relative"
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ type: "tween", duration: 0.2 }}
				>
					<Image
						width={192}
						height={192}
						alt="Profile"
						src={profileUrl}
						quality={95}
						priority
						className="h-24 w-24 rounded-full border-[0.35rem] border-white object-cover shadow-xl"
					/>
					<motion.span
						className="absolute bottom-0 right-0 text-4xl"
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 125,
							delay: 0.1,
							duration: 0.7,
						}}
					>
						👋🏻
					</motion.span>
				</motion.div>
			</div>
			<motion.h1
				className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<span className="font-bold">Hi, I&apos;m {name}.</span> <br />
				<span className="text-xl sm:text-2xl">
					<span className="font-bold italic">{jobTitle}</span>,{" "}
					<span>{shortDesc}</span>
				</span>
			</motion.h1>
			<motion.div
				className="flex items-center justify-center gap-2 px-4 text-lg font-medium"
				variants={socialParent}
				initial={"initial"}
				animate={"animate"}
			>
				{socials.map((social) => (
					<motion.div
						key={social.platform}
						variants={socialChildren}
						whileHover={{ scale: 1.15 }}
						className="rounded-full bg-white p-2 text-[1.5rem] text-gray-700 dark:bg-white/10 dark:text-white/80"
					>
						<Link
							href={social.link}
							referrerPolicy="no-referrer"
							target="_blank"
							aria-label={social.platform}
						>
							{SocialIcon(social.platform)}
						</Link>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
};

export default HeroSection;
