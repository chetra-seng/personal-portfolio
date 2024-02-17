import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import ProjectSection from "@/components/ProjectSection";
import SectionDivider from "@/components/SectionDivider";
import SkillSection from "@/components/SkillSection";
import { BioInfo } from "@/models/bioInfo";
import { Experience } from "@/models/experience";
import { Project } from "@/models/project";
import { Skill } from "@/models/skill";
import { client } from "@/utils/sanity";

export default async function Home() {
  const bio = await client.fetch<BioInfo>(
    `*[_type == 'bioInfo'][0] {
        name, jobTitle, bio, shortDesc,
        socials[]->{platform, link},
        "profileUrl": profile.asset->url,
        "coverUrl": cover.asset->url,
    }`
  );

  const projects = await client.fetch<Project[]>(
    `*[_type == "project"] {
      _id,
      title,
      description,
      skills[] -> {_id, name},
      "imageUrl": image.asset->url
    }`
  );

  const skills = await client.fetch<Skill[]>(
    `*[_type == "skill"] {
      _id,
      name
    }`
  );

  const experiences = await client.fetch<Experience[]>(
    `*[_type == "experience"] { 
      _id, title, company, 
      startDate, endDate, description, 
      "iconUrl": icon.asset->url 
    }`
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
      <SkillSection skills={skills} />
      <ExperienceSection experiences={experiences} />
    </main>
  );
}
