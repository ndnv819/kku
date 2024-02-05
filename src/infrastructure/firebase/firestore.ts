import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = !getApps().length
  ? initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FB_APP_ID,
    })
  : getApp();

export const db = getFirestore(app);
