import * as simpleIcons from "simple-icons";
import { slugToVariableName } from "simple-icons/sdk";
import { Toaster } from "react-hot-toast";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import ExperienceSection from "@/components/experience-section";
import HeroSection from "@/components/hero-section";
import ProjectSection from "@/components/project-section";
import SectionDivider from "@/components/section-divider";
import SkillSection from "@/components/skill-section";
import type { BioInfo } from "@/models/bioInfo";
import type { Experience } from "@/models/experience";
import type { Project } from "@/models/project";
import type { Skill } from "@/models/skill";
import { client } from "@/utils/sanity";

export const revalidate = 300;

export default async function Home() {
  const bio = await client.fetch<BioInfo>(
    `*[_type == 'bioInfo'][0] {
        name, jobTitle, bio, shortDesc,
        socials[]->{platform, link},
        "email": contact->email,
        "profileUrl": profile.asset->url,
        "coverUrl": cover.asset->url,
    }`,
  );

  const projects = await client.fetch<Project[]>(
    `*[_type == "project"] | order(_updatedAt desc) {
        _id,
        title,
        description,
        featured,
        skills[] -> {_id, name},
        "imageUrl": image.asset->url
    }`,
  );

  const skills = await client.fetch<Skill[]>(
    `*[_type == "skill"] | order(name) {
        _id,
        name,
			  level,
        slug
    }`,
  );

  const skillIcons = Object.fromEntries(
    skills.map((skill) => {
      const varName = slugToVariableName(skill.slug);
      const icon = (simpleIcons as Record<string, unknown>)[varName];
      if (icon && typeof icon === "object" && "path" in icon && "hex" in icon) {
        return [skill.slug, { path: icon.path as string, color: `#${icon.hex as string}` }];
      }
      return [skill.slug, null];
    }),
  );

  const experiences = await client.fetch<Experience[]>(
    `*[_type == "experience"] | order(_updatedAt desc) {
        _id, title, company,
        startDate, endDate, description,
    }`,
  );

  return (
    <main className="flex flex-col items-center px-4">
      <HeroSection
        name={bio.name}
        profileUrl={bio.profileUrl}
        shortDesc={bio.shortDesc}
        socials={bio.socials}
        jobTitle={bio.jobTitle}
      />
      <SectionDivider />
      <AboutSection bio={bio.bio} cover={bio.coverUrl} />
      <ProjectSection projects={projects} />
      <SkillSection skills={skills} icons={skillIcons} />
      <ExperienceSection experiences={experiences} />
      <ContactSection email={bio.email} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
        }}
      />
    </main>
  );
}
