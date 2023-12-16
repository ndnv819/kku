/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  NEXT_PUBLIC_WEB_DOMAIN: z.string(),
  NEXT_PUBLIC_BACKEND_URL: z.string(),
});

const envParsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_WEB_DOMAIN: process.env.NEXT_PUBLIC_WEB_DOMAIN,
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

if (!envParsed.success) {
  console.error(envParsed.error.issues);
  throw new Error('There is an error with the environment variables');
}

export const envServerSchema = envParsed.data;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
