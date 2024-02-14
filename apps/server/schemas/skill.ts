import { defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      description: "The name of the skill",
      type: "string"
    },
    {
      name: "level",
      title: "Level",
      description: "The level of the skill in percentage (0-100)",
      type: "number"
    },
    {
      name: "icon",
      title: "Icon",
      description: "The icon of the skill",
      type: "image",
      options: {
        hotspot: true
      }
    }
  ]
})