import { SessionProvider } from 'next-auth/react';

import type { AuthProviderProps } from './types';

export function AuthProvider({
  session,
  children,
}: AuthProviderProps): JSX.Element {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
