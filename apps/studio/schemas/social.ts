import {defineType} from 'sanity'

export default defineType({
  name: 'social',
  title: 'Social',
  type: 'document',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      description: 'The name of the social media platform',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      description: 'The link to the social media platform',
      type: 'string',
    },
  ],
})
