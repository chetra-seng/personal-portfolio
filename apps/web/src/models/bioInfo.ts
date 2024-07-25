import { Social } from "./social";

export type BioInfo = {
  name: string;
  jobTitle: string;
  shortDesc: string;
  email: string;
  bio: string;
  profileUrl: string;
  coverUrl: string;
  socials: Social[];
};
