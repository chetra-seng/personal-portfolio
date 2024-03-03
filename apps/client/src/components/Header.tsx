"use client";

import useActiveSection from "@/hooks/useActiveSection";
import { NavItem } from "@/models/navitem";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { FC } from "react";

type Props = {
	items: NavItem[];
};

const Header: FC<Props> = ({ items }) => {
	const { activeSection, setActiveSection, setLastTime } = useActiveSection();
	const parentVarient = {
		initial: {
			y: -100,
			opacity: 0,
		},
		animate: {
			y: 0,
			opacity: 1,
			transition: {
				staggerChildren: 0.04,
			},
		},
	};

	const childrenVarient = {
		initial: {
			x: -100,
			opacity: 0,
		},
		animate: {
			x: 0,
			opacity: 1,
		},
	};

	return (
		<header className="relative z-[999]">
			<motion.div
				className="fixed left-1/2 top-0 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:border-black/40 dark:bg-gray-950 dark:bg-opacity-75 sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"
				initial={{
					x: "-50%",
					y: -100,
					opacity: 0,
				}}
				animate={{
					x: "-50%",
					y: 0,
					opacity: 1,
				}}
			/>

			<nav className="fixed left-1/2 top-[0.15rem] flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
				<motion.ul
					className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5"
					initial={"initial"}
					animate={"animate"}
					variants={parentVarient}
				>
					{items.map((item) => (
						<motion.li
							variants={childrenVarient}
							className="relative flex h-3/4 items-center justify-center"
							key={item._id}
						>
							<Link
								className={clsx(
									"flex w-full items-center justify-center px-3 py-3 transition hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-300 ",
									{
										"text-gray-950 dark:text-gray-200":
											activeSection === item.label,
									},
								)}
								href={item.link}
								onClick={() => {
									setActiveSection(item.label);
									setLastTime(Date.now());
								}}
							>
								{item.label}
								{activeSection === item.label && (
									<motion.span
										className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-gray-800"
										layoutId="activeSection"
										transition={{
											type: "spring",
											stiffness: 380,
											damping: 30,
										}}
									/>
								)}
							</Link>
						</motion.li>
					))}
				</motion.ul>
			</nav>
		</header>
	);
};

export default Header;
