import {defineType} from 'sanity'

export default defineType({
  name: 'navitem',
  title: 'Navitem',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'index',
      title: 'Index',
      type: 'number',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
  ],
})
