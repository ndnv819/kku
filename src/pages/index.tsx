import { requestGet } from '@infrastructure/network';
import { Home } from '@presentation/features/home';
import { BaseLayout } from '@presentation/layouts/base';
import type { GetStaticProps, NextPage } from 'next';

import type { ShopDTO } from './api/shop/dtos';

interface Shops {
  shops: ShopDTO[];
}

const HomePage: NextPage<Shops> = ({ shops }) => {
  return (
    <BaseLayout>
      <Home shops={shops} />
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const shops = await requestGet('/api/shop');

    return {
      props: {
        shops,
      },
    };
  } catch (error) {
    return {
      props: {
        shops: [],
      },
    };
  }
};

export default HomePage;
