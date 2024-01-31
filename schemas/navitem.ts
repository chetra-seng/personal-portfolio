import {defineType} from 'sanity'

export default defineType({
  name: 'navitem',
  title: 'Navitem',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      description: "The label of the nav item",
      type: 'string',
    },
    {
      name: 'index',
      title: 'Index',
      description: "The index specifying order of the nav item",
      type: 'number',
    },
    {
      name: 'link',
      title: 'Link',
      description: "The link to the nav item",
      type: 'string',
    },
  ],
})
