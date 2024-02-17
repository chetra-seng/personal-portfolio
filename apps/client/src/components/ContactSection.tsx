"use client";

import useInviewSection from "@/hooks/useInViewSection";
import React, { ComponentRef, FC, useEffect, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { motion } from "framer-motion";
import { useFormState } from "react-dom";
import { sendEmail } from "@/actions/sendEmail";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

type Props = {
  email: string;
};

const ContactSection: FC<Props> = ({ email }) => {
  const [state, formAction] = useFormState(sendEmail, null);
  const ref = useRef<ComponentRef<"section">>(null);
  useInviewSection(ref, "Contact", 0.8);

  useEffect(() => {
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
      className="mb-20 sm:mb-28 w-[min(100%, 38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="section-header text-center">Contact me</h2>
      <p className="text-gray-700 -mt-6">
        Feel free to reach out to me at{" "}
        <a className="underline" href={`mailto:${email}`}>
          {email}
        </a>{" "}
        or through the form below.
      </p>

      <form className="mt-10 flex flex-col" action={formAction}>
        <input
          type="email"
          name="email"
          className="h-14 rounded-lg custom-border px-4"
          placeholder="Your email"
          maxLength={100}
          required
        />
        <textarea
          name="message"
          className="h-52 my-3 rounded-lg custom-border p-4"
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
