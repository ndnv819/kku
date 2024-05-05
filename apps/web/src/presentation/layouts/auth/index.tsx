// eslint-disable-next-line simple-import-sort/imports
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useEffect } from 'react';
import { BaseLayout } from '../base';
import type { AuthLayoutProps } from './types';

export function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  // TODO:: next-auth session 유무 체크, 없으면 signUp page routing
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.replace('/auth/signIn');
    }
  }, [session]);

  return <BaseLayout>{children}</BaseLayout>;
}
