"use client";

import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconNotification,
  IconX,
} from "@tabler/icons-react";

const SocialIcon = (
  platform: "Facebook" | "Instagram" | "Github" | "Twitter" | "Youtube" | "Linkedin" | "X",
) => {
  switch (platform) {
    case "Facebook":
      return <IconBrandFacebook />;
    case "Instagram":
      return <IconBrandInstagram />;
    case "Github":
      return <IconBrandGithub />;
    case "Twitter":
      return <IconBrandX />;
    case "Youtube":
      return <IconBrandYoutube />;
    case "Linkedin":
      return <IconBrandLinkedin />;
    case "X":
      return <IconX />;
    default:
      return <IconNotification />;
  }
};

export default SocialIcon;
