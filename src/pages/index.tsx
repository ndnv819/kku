import { parseJson } from '@application/helpers/json/parse_json';
import { Home } from '@presentation/features/home';
import { BaseLayout } from '@presentation/layouts/base';
import type { GetStaticProps, NextPage } from 'next';

import type { ShopDTO } from './api/shop/dtos';

interface HomePageProps {
  shops: ShopDTO[];
}

const HomePage: NextPage<HomePageProps> = ({ shops }: HomePageProps) => {
  return (
    <BaseLayout>
      <Home shops={shops} />
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const result = await parseJson();

    return {
      props: {
        shops: result,
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
