"use server";

import React from "react";
import ContactEmail from "@/components/ContactEmail";
import { resend } from "@/utils/resend";
import { validateInput } from "@/utils/validateInput";

export async function sendEmail(_: any, data: FormData) {
  const emailResult = validateInput(data.get("email") as string, "email", 100);
  if (!emailResult.result) {
    return { error: emailResult.error };
  }

  const messageResult = validateInput(
    data.get("message") as string,
    "text",
    500,
  );
  if (!messageResult.result) {
    return { error: messageResult.error };
  }

  try {
    await resend.emails.send({
      from: "Personal Portfolio <onboarding@resend.dev>",
      to: process.env.RESEND_EMAIL as string,
      subject: "New message from Personal Portfolio",
      reply_to: emailResult.data as string,
      react: React.createElement(ContactEmail, {
        email: emailResult.data as string,
        message: messageResult.data as string,
      }),
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
