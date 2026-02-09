import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Categories } from './collections/Categories'
import { JourneyItems } from './collections/JourneyItems'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { TechStack } from './collections/TechStack'
import { Users } from './collections/Users'
import { env } from './utils/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, JourneyItems, TechStack, Categories],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.NETLIFY_DATABASE_URL,
    },
  }),
  sharp,
  plugins: [
    uploadthingStorage({
      collections: {
        media: {
          prefix: 'media',
          generateFileURL: (filename) => `${env.SITE_URL}/api/${filename.prefix}/file/${filename.filename}`
        },
      },
      options: {
        token: env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    })
  ],
  cors: {
    origins: ["http://localhost:3000", "*"],
  },
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
