import { defineConfig } from "drizzle-kit";
import "dotenv/config";


if(!process.env.DATABASE_URL){
    throw new Error('DATABASE_URI is not set in the .env file');
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
