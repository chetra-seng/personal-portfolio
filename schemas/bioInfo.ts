import {defineType} from 'sanity'

export default defineType({
  name: 'bioInfo',
  title: 'Bio Info',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: "Your name",
      type: 'string',
    },
    {
      name: 'jobTitle',
      title: 'Job Title',
      description: "Your job title",
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      description: "Your location",
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      description: "Your email",
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      description: "Your phone number",
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      description: "Your short bio",
      type: 'text',
    },
    {
      name: 'profile',
      title: 'Profile',
      description: "Your profile image",
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'cover',
      title: 'Cover',
      description: "Your cover image",
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'socials',
      title: 'Socials',
      description: "Your social media links",
      type: 'array',
      of: [{type: 'reference', to: {type: 'social'}}]
    }
  ]
}) 