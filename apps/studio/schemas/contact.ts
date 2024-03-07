import {defineType} from 'sanity'
import {FaAddressCard} from 'react-icons/fa6'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: FaAddressCard,
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
