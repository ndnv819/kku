import { getShopById, getShops } from '@infrastructure/firebase/apis/shop';
import { Home } from '@presentation/features/home';
import { BaseLayout } from '@presentation/layouts/base';
import type { NextPage } from 'next';
import { useEffect } from 'react';

export const HomePage: NextPage = () => {
  useEffect(() => {
    getShops().then((s) => {
      console.log(s);
    });

    getShopById('2vl7qyDE5TJd7UA7Zo8H').then((d) => {
      console.log(d);
    });
  }, []);
  return (
    <BaseLayout>
      <Home />
    </BaseLayout>
  );
};

export default HomePage;
