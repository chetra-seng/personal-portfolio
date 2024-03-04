"use client";
import {
	TiSocialFacebook,
	TiSocialInstagram,
	TiSocialGithub,
	TiSocialYoutube,
	TiSocialTwitter,
	TiSocialLinkedin,
	TiPower,
} from "react-icons/ti";

const SocialIcon = (
	platform:
		| "Facebook"
		| "Instagram"
		| "Github"
		| "Twitter"
		| "Youtube"
		| "Linkedin",
) => {
	switch (platform) {
		case "Facebook":
			return <TiSocialFacebook />;
		case "Instagram":
			return <TiSocialInstagram />;
		case "Github":
			return <TiSocialGithub />;
		case "Twitter":
			return <TiSocialTwitter />;
		case "Youtube":
			return <TiSocialYoutube />;
		case "Linkedin":
			return <TiSocialLinkedin />;
		default:
			return <TiPower />;
	}
};

export default SocialIcon;
