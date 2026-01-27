import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { JourneyItems } from './collections/JourneyItems'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, JourneyItems],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '9fZxQ9RrK1X8lq0M5A+VYtY6wRk4cC7n',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.NETLIFY_DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
  localization: {
    defaultLocale: 'en',
    locales: [{ code: 'en', label: 'English' }, { code: 'ar', label: 'Arabic', rtl: true }],
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: {
      en,
      ar,
    },

  }
})
