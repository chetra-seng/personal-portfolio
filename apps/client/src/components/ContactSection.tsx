"use client";

import useInviewSection from "@/hooks/useInViewSection";
import React from "react";
import { motion } from "framer-motion";
import { useFormState } from "react-dom";
import { sendEmail } from "@/actions/sendEmail";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

type Props = {
	email: string;
};

const ContactSection: React.FC<Props> = ({ email }) => {
	const [state, formAction] = useFormState(sendEmail, null);
	const ref = React.useRef<React.ComponentRef<"section">>(null);
	useInviewSection(ref, "Contact", 0.8);

	React.useEffect(() => {
		if (state) {
			if (state.error) {
				toast.error(state.error);
			} else if (state.message) {
				toast.success(state.message);
			}
		}
	}, [state]);

	return (
		<motion.section
			ref={ref}
			id="contact"
			className="w-[min(100%, 38rem)] mb-20 text-center sm:mb-28"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
		>
			<h2 className="section-header text-center">Contact me</h2>
			<p className="-mt-6 text-gray-700 dark:text-white/80">
				Feel free to reach out to me at{" "}
				<a className="underline" href={`mailto:${email}`}>
					{email}
				</a>{" "}
				or through the form below.
			</p>

			<form className="mt-10 flex flex-col dark:text-black" action={formAction}>
				<input
					type="email"
					name="email"
					className="custom-border h-14 rounded-lg px-4 transition-all dark:bg-white dark:bg-opacity-85 dark:outline-none dark:focus:bg-opacity-100"
					placeholder="Your email"
					maxLength={100}
					required
				/>
				<textarea
					name="message"
					className="custom-border my-3 h-52 rounded-lg p-4 transition-all dark:bg-white dark:bg-opacity-85 dark:outline-none dark:focus:bg-opacity-100"
					placeholder="Your message"
					maxLength={500}
					required
				/>
				<SubmitButton />
			</form>
		</motion.section>
	);
};

export default ContactSection;
