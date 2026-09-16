import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'published', 'createdAt'],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },

    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },

    {
      name: 'content',
      type: 'richText',
      required: true,
    },

    {
      name: 'category',
      type: 'select',
      options: [
        'AI Marketing',
        'Digital Marketing',
        'Technology',
        'Business',
      ],
      defaultValue: 'AI Marketing',
    },

    {
      name: 'author',
      type: 'text',
      required: true,
    },

    {
      name: 'publishedDate',
      type: 'date',
    },

    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}