/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useGetShops } from '@application/hooks/api/shop/use_get_shops';
import { useGeolocation } from '@application/hooks/common/use_geolocation2';
import { useShopFilterCategory } from '@application/hooks/logics/shopFilter/use_shop_filter_category';
import { useShopFilterStaus } from '@application/hooks/logics/shopFilter/use_shop_filter_status';
import { useLocation } from '@application/hooks/store/location/use_location';
import { Typography } from '@presentation/components/atoms/typography';
import { Appbar } from '@presentation/components/organism/appbar';
import { LoadingView } from '@presentation/components/organism/loadingView';
import { ShopView } from '@presentation/components/templates/shopView';
import Link from 'next/link';
import type { JSX } from 'react';
import { useEffect } from 'react';

import styles from './home.module.scss';
import type { HomeProps } from './types';

export function Home({ shops }: HomeProps): JSX.Element {
  const { locationState, setLocation } = useLocation();
  const { location, getCurrentPosition } = useGeolocation();
  const { filteredShops } = useGetShops(shops);
  const { status } = useShopFilterStaus();
  const { category } = useShopFilterCategory();

  useEffect(() => {
    if (!locationState.lat) {
      getCurrentPosition();
    }
  }, [locationState]);

  useEffect(() => {
    if (location.data) {
      setLocation(
        location.data.coords.latitude,
        location.data.coords.longitude,
      );
    }
  }, [location]);

  if (location?.isLoading) {
    return <LoadingView />;
  }

  return (
    <>
      <Appbar>
        <Typography as="h3" status="primary">
          멍꾹
        </Typography>
        <Link href="/my">MY</Link>
      </Appbar>
      <section className={styles['home-wrapper']}>
        <ShopView
          lat={location.data?.coords!.latitude ?? locationState.lat}
          lng={location.data?.coords!.longitude ?? locationState.lng}
          shops={filteredShops(status, category)}
        />
      </section>
    </>
  );
}
