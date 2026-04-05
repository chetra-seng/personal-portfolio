"use server";

import React from "react";
import { z } from "zod";
import ContactEmail from "@/components/ContactEmail";
import { resend } from "@/utils/resend";

const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(500, "Message must be at most 500 characters"),
});

export type ContactFormState = {
  error?: string;
  fieldErrors?: { email?: string; message?: string };
  message?: string;
} | null;

export async function sendEmail(_: ContactFormState, data: FormData): Promise<ContactFormState> {
  const result = contactSchema.safeParse({
    email: data.get("email"),
    message: data.get("message"),
  });

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      fieldErrors: {
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  const { email, message } = result.data;

  try {
    await resend.emails.send({
      from: "Personal Portfolio <onboarding@resend.dev>",
      to: process.env.RESEND_EMAIL as string,
      subject: "New message from Personal Portfolio",
      reply_to: email,
      react: React.createElement(ContactEmail, { email, message }),
    });

    return { message: "Email sent successfully" };
  } catch (err) {
    if (err instanceof Error) {
      console.error("Send email error:", err.message);
      return { error: err.message };
    }

    console.error("Send email error:", err);
    return { error: "An error occurred while sending the email" };
  }
}
