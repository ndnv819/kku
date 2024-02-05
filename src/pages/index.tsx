import { Home } from '@presentation/features/home';
import { BaseLayout } from '@presentation/layouts/base';
import type { NextPage } from 'next';

export const HomePage: NextPage = () => {
  return (
    <BaseLayout>
      <Home />
    </BaseLayout>
  );
};

export default HomePage;
