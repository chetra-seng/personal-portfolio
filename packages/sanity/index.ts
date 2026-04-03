import bioInfo from "./schemas/bioInfo";
import contact from "./schemas/contact";
import experience from "./schemas/experience";
import navitem from "./schemas/navitem";
import project from "./schemas/project";
import seo from "./schemas/seo";
import skill from "./schemas/skill";
import social from "./schemas/social";

export const schemaTypes = [bioInfo, contact, experience, navitem, project, seo, social, skill];

export * from "sanity";
export * as structure from "sanity/structure";
export * as bioinfo from "./schemas/bioInfo";
export * as contact from "./schemas/contact";
export * as experience from "./schemas/experience";
export * as navitem from "./schemas/navitem";
export * as project from "./schemas/project";
export * as seo from "./schemas/seo";
export * as skill from "./schemas/skill";
export * as social from "./schemas/social";
