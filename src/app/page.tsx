import BioSection from "@/components/BioSection";
import { BioInfo } from "@/model/bioInfo";
import { client } from "@/utils/sanity";

export default async function Home() {
  const bio = await client.fetch<BioInfo>(
    `*[_type == 'bioInfo'][0] {
        name, jobTitle, bio,
        socials[]->{platform, link},
        "profileUrl": profile.asset->url,
        "coverUrl": cover.asset->url,
    }`
  );

  console.log(bio);

  return (
    <main className="flex flex-col items-center px-4">
      <BioSection
        name={bio.name}
        profileUrl={bio.profileUrl}
        bio={bio.bio}
        socials={bio.socials}
      />
    </main>
  );
}
