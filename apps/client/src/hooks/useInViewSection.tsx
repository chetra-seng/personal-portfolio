"use client";

import React from "react";
import { useInView } from "framer-motion";
import useActiveSection from "./useActiveSection";

export default function useInviewSection(
	ref: React.RefObject<HTMLElement>,
	section: string,
	amount: number,
) {
	const inView = useInView(ref, { amount });
	const { setActiveSection, lastTime } = useActiveSection();

	React.useEffect(() => {
		if (inView && Date.now() - lastTime > 1000) {
			setActiveSection(section);
		}
	}, [inView, setActiveSection, lastTime, section]);
}
