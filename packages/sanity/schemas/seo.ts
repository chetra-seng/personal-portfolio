import { defineType } from "sanity";
import { FaRegObjectUngroup} from "react-icons/fa6"

const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "document",
  icon: FaRegObjectUngroup,
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Your SEO title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      description: "Your SEO description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "keywords",
      title: "Keywords",
      description: "Your SEO keywords",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ogTitle",
      title: "Open Graph Title",
      description: "Your Open Graph title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ogDescription",
      title: "Open Graph Description",
      description: "Your Open Graph description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ogImage",
      title: "Open Graph Image",
      description: "Your Open Graph image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ogImageAlt",
      title: "Open Graph Image Alt",
      description: "Your Open Graph image alt",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ogImageWidth",
      title: "Open Graph Image Width",
      description: "Your Open Graph image width",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ogImageHeight",
      title: "Open Graph Image Height",
      description: "Your Open Graph image height",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ogImageType",
      title: "Open Graph Image Type",
      description: "Your Open Graph image type",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "twitterTitle",
      title: "Twitter Title",
      description: "Your Twitter title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "twitterDescription",
      title: "Twitter Description",
      description: "Your Twitter description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "twitterImage",
      title: "Twitter Image",
      description: "Your Twitter image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "twitterImageAlt",
      title: "Twitter Image Alt",
      description: "Your Twitter image alt",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "twitterImageWidth",
      title: "Twitter Image Width",
      description: "Your Twitter image width",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "twitterImageHeight",
      title: "Twitter Image Height",
      description: "Your Twitter image height",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "twitterCreator",
      title: "Twitter Creator",
      description: "Your Twitter creator",
      type: "string",
    }
  ],
});

export default seo;