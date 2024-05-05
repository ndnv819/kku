import { Bookmark } from '@presentation/features/bookmark';
import { AuthLayout } from '@presentation/layouts/auth';
import type { NextPage } from 'next';

const BookmarkPage: NextPage = () => {
  return (
    <AuthLayout>
      <Bookmark />
    </AuthLayout>
  );
};

export default BookmarkPage;
