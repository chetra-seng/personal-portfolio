"use client";

import { motion } from "framer-motion";
import React, { useActionState } from "react";
import toast from "react-hot-toast";
import { sendEmail } from "@/actions/sendEmail";
import useInviewSection from "@/hooks/useInViewSection";
import SubmitButton from "./SubmitButton";

type Props = {
  email: string;
};

const ContactSection: React.FC<Props> = ({ email }) => {
  const [state, formAction] = useActionState(sendEmail, null);
  const ref = React.useRef<React.ComponentRef<"section">>(null);
  const [emailValue, setEmailValue] = React.useState("");
  const [messageValue, setMessageValue] = React.useState("");
  useInviewSection(ref, "Contact", 0.8);

  React.useEffect(() => {
    if (state) {
      if (state.error) {
        toast.error(state.error);
      } else if (state.message) {
        toast.success(state.message);
        setEmailValue("");
        setMessageValue("");
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
      <p className="text-gray-700 dark:text-white/80">
        Feel free to reach out to me at{" "}
        <a className="underline" href={`mailto:${email}`}>
          {email}
        </a>{" "}
        or through the form below.
      </p>

      <form className="mt-10 flex flex-col dark:text-black" action={formAction}>
        <div className="flex flex-col">
          <input
            name="email"
            className="custom-border h-14 rounded-lg px-4 transition-all dark:bg-white dark:bg-opacity-85 dark:outline-none dark:focus:bg-opacity-100"
            placeholder="Your email"
            maxLength={100}
            required
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          {state?.fieldErrors?.email && (
            <p className="mt-1 text-left text-sm text-red-500">{state.fieldErrors.email}</p>
          )}
        </div>
        <div className="my-3 flex flex-col">
          <textarea
            name="message"
            className="custom-border h-52 rounded-lg p-4 transition-all dark:bg-white dark:bg-opacity-85 dark:outline-none dark:focus:bg-opacity-100"
            placeholder="Your message (min. 20 characters)"
            maxLength={500}
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          {state?.fieldErrors?.message && (
            <p className="mt-1 text-left text-sm text-red-500">{state.fieldErrors.message}</p>
          )}
        </div>
        <SubmitButton />
      </form>
    </motion.section>
  );
};

export default ContactSection;
