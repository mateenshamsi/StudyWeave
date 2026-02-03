import type { Config } from "drizzle-kit";

export default {
  schema: "./app/config/schema.tsx",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
