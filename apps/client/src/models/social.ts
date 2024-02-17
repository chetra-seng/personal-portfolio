export type SocialPlatform =
  | "Facebook"
  | "Instagram"
  | "Github"
  | "Twitter"
  | "Youtube"
  | "Linkedin";

export type Social = {
  platform: SocialPlatform;
  link: string;
};
