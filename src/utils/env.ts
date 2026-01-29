import { cleanEnv, str, url } from "envalid";

export const env = cleanEnv(process.env, {
  NETLIFY_DATABASE_URL: str(),
  UPLOADTHING_TOKEN: str(),
  PAYLOAD_SECRET: str(),
  SITE_URL: url(),
});