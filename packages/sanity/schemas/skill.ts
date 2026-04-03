import { FaLaptopCode } from "react-icons/fa6";
import { defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  icon: FaLaptopCode,
  fields: [
    {
      name: "name",
      title: "Name",
      description: "The name of the skill",
      type: "string",
    },
    {
      name: "level",
      title: "Level",
      description: "The level of the skill in percentage (0-100)",
      type: "number",
    },

    {
      name: "slug",
      title: "Slug",
      description: "Simple icon name",
      type: "string",
    },
  ],
});
