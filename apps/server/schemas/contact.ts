import {defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      description: 'Your email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      description: 'Your phone number',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      description: 'Your address',
      type: 'string',
    },
  ],
})
