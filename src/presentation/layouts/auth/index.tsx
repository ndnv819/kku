import { BaseLayout } from '../base';
import type { AuthLayoutProps } from './types';

export function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  // TODO:: next-auth session 유무 체크, 없으면 signUp page routing
  return <BaseLayout>{children}</BaseLayout>;
}
