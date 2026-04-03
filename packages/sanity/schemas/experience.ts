import { FaBook } from "react-icons/fa6";
import { defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: FaBook,
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Your job title",
      type: "string",
    },
    {
      name: "company",
      title: "Company",
      description: "The company you worked for",
      type: "string",
    },
    {
      name: "startDate",
      title: "Start Date",
      description: "The date you started working",
      type: "date",
    },
    {
      name: "endDate",
      title: "End Date",
      description: "The date you stopped working",
      type: "date",
    },
    {
      name: "description",
      title: "Description",
      description: "A brief description of your experience",
      type: "text",
    },
  ],
});
