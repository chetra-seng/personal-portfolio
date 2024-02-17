import React, { FC } from "react";
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
} from "@react-email/components";

type Props = {
  message: string;
  email: string;
};

const ContactEmail: FC<Props> = ({ email, message }) => {
  return (
    <Html>
      <Head />
      <Preview>New email from portfolio</Preview>
      <Tailwind>
        <Body className="bg-gray-100">
          <Container>
            <Section className="bg-white custom-border my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                You received an email from your portfolio
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
