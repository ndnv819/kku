import { My } from '@presentation/features/my';
import { AuthLayout } from '@presentation/layouts/auth';
import type { NextPage } from 'next';

const MyPage: NextPage = () => {
  return (
    <AuthLayout>
      <My />
    </AuthLayout>
  );
};

export default MyPage;
