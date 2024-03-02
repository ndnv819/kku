/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useGeolocation } from '@application/hooks/common/use_geolocation';
import { NaverMap } from '@presentation/components/atoms/naverMap';
import { BottomNavigation } from '@presentation/components/organism/bottomNavigation';
import type { JSX } from 'react';
import { useEffect } from 'react';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import styles from './home.module.scss';

interface Shops {
  shops: ShopDTO[];
}

export function Home({ shops }: Shops): JSX.Element {
  const { location, getCurrentPosition } = useGeolocation();

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <>
      <section className={styles['home-wrapper']}>
        <div className={styles['home-map-wrapper']}>
          <NaverMap
            markers={shops.map((shop) => ({
              name: shop.name,
              lat: parseFloat(shop.latitude),
              lng: parseFloat(shop.longitude),
            }))}
            lat={location.data?.coords.latitude!}
            lng={location.data?.coords.longitude!}
          />
        </div>
      </section>
      <BottomNavigation />
    </>
  );
}
