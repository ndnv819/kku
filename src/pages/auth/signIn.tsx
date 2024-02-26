import { SignIn } from '@presentation/features/auth/signIn';
import { BaseLayout } from '@presentation/layouts/base';
import type { NextPage } from 'next';

const SignInPage: NextPage = () => {
  return (
    <BaseLayout>
      <SignIn />
    </BaseLayout>
  );
};

export default SignInPage;
