/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  NEXT_PUBLIC_WEB_DOMAIN: z.string(),
  NEXT_PUBLIC_BACKEND_URL: z.string(),
  NEXT_PUBLIC_NAVER_CLIENT_ID: z.string(),
  NEXT_PUBLIC_FB_API_KEY: z.string(),
  NEXT_PUBLIC_FB_AUTH_DOMAIN: z.string(),
  NEXT_PUBLIC_FB_PROJECT_ID: z.string(),
  NEXT_PUBLIC_FB_STORAGE_BUCKET: z.string(),
  NEXT_PUBLIC_FB_MESSAGING_SENDER_ID: z.string(),
  NEXT_PUBLIC_FB_APP_ID: z.string(),
  NEXT_PUBLIC_KAKAO_CLIENT_ID: z.string(),
  NEXT_PUBLIC_KAKAO_CLIENT_SECRET: z.string(),
});

const envParsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_WEB_DOMAIN: process.env.NEXT_PUBLIC_WEB_DOMAIN,
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_NAVER_CLIENT_ID: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
  NEXT_PUBLIC_FB_API_KEY: process.env.NEXT_PUBLIC_FB_API_KEY,
  NEXT_PUBLIC_FB_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  NEXT_PUBLIC_FB_PROJECT_ID: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  NEXT_PUBLIC_FB_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  NEXT_PUBLIC_FB_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FB_APP_ID: process.env.NEXT_PUBLIC_FB_APP_ID,
  NEXT_PUBLIC_KAKAO_CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_CLIENT_SECRET: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
});

if (!envParsed.success) {
  // console.error(envParsed.error.issues);
  // throw new Error('There is an error with the environment variables');
}

// export const envServerSchema = envParsed.data;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
