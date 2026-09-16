import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Users } from './collections/User'
import { Posts } from './collections/Posts'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  editor: lexicalEditor(),

  admin: {
    user: 'users',
  },

  collections: [Users, Posts],

  serverURL: 'http://localhost:3000',
})