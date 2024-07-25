import React from "react";
import { Tailwind } from "@react-email/tailwind";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Preview,
  Img,
} from "@react-email/components";

type Props = {
  message: string;
  email: string;
};

const ContactEmail: React.FC<Props> = ({ email, message }) => {
  return (
    <Html>
      <Head />
      <Preview>New email from portfolio</Preview>
      <Tailwind>
        <Body className="bg-gray-100">
          <Container>
            <Section className="custom-border my-10 rounded-md bg-white px-10 py-4">
              <Img
                src={process.env.RESEND_LOGO_URL}
                width={"64"}
                height={"64"}
                alt="Logo"
                className="mx-auto self-center"
              />
              <Heading className="my-4 self-center text-center leading-tight">
                New Message
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>Sender&apos;s email: {email}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
