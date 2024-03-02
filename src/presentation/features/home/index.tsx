/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useGeolocation } from '@application/hooks/common/use_geolocation';
import { MapMarkersAtom } from '@application/recoils/map';
import { NaverMap } from '@presentation/components/atoms/naverMap';
import type { NaverMapMarker } from '@presentation/components/atoms/naverMap/types';
import { BottomNavigation } from '@presentation/components/organism/bottomNavigation';
import type { JSX } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import type { RawShopItem } from 'scripts/scraper';

import styles from './home.module.scss';

interface Shops {
  shops: RawShopItem[];
}

export function Home({ shops }: Shops): JSX.Element {
  const { location, getCurrentPosition } = useGeolocation();
  const [markers, setMarkers] = useRecoilState<NaverMapMarker[] | undefined>(
    MapMarkersAtom,
  );

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    if (shops) {
      setMarkers(
        shops.map((shop) => ({
          name: shop.name,
          lat: parseFloat(shop.latitude),
          lng: parseFloat(shop.longitude),
        })),
      );
    }
  }, [shops]);

  return (
    <>
      <section className={styles['home-wrapper']}>
        <div className={styles['home-map-wrapper']}>
          <NaverMap
            markers={markers}
            lat={location.data?.coords.latitude!}
            lng={location.data?.coords.longitude!}
          />
        </div>
      </section>
      <BottomNavigation />
    </>
  );
}
