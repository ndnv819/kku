import { requestGet } from '@infrastructure/network';
import { Home } from '@presentation/features/home';
import { BaseLayout } from '@presentation/layouts/base';
import type { GetStaticProps, NextPage } from 'next';

import type { ShopDTO } from './api/shop/dtos';

interface Shops {
  shops: ShopDTO[];
}

export const HomePage: NextPage<Shops> = ({ shops }) => {
  return (
    <BaseLayout>
      <Home shops={shops} />
    </BaseLayout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const shops = await requestGet('/api/shop');

    return {
      props: {
        shops,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        shops: [],
      },
    };
  }
};
