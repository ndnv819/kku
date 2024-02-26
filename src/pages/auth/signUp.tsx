import { SignUp } from '@presentation/features/auth/signUp';
import { BaseLayout } from '@presentation/layouts/base';
import type { NextPage } from 'next';

const SignUpPage: NextPage = () => {
  return (
    <BaseLayout>
      <SignUp />
    </BaseLayout>
  );
};

export default SignUpPage;
