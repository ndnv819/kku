import type { Session } from 'next-auth';
import type { ReactNode } from 'react';

export interface AuthProviderProps {
  session?: Session | null;
  children: ReactNode;
}
