import HeroSection from "@/components/HeroSection";
import { BioInfo } from "@/model/bioInfo";
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

  return (
    <main className="flex flex-col items-center px-4">
      <HeroSection
        name={bio.name}
        profileUrl={bio.profileUrl}
        shortDesc={bio.shortDesc}
        socials={bio.socials}
        jobTitle={bio.jobTitle}
      />
    </main>
  );
}
