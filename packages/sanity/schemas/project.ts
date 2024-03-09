import {defineType} from 'sanity'
import {FaDiceD6} from "react-icons/fa6"

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: FaDiceD6,
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'The title of the project',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      description: 'The description of the project',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      description: 'The image of the project',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'link',
      title: 'Link',
      description: 'The link to the project',
      type: 'string',
    },
    {
      name: 'skills',
      title: 'Skills',
      description: 'The skills used in the project',
      type: 'array',
      of: [{type: 'reference', to: {type: 'skill'}}],
    },
  ],
})
