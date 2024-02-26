import { useGeolocation } from '@application/hooks/common/use_geolocation';
import { NaverMap } from '@presentation/components/atoms/naverMap';
import type { JSX } from 'react';
import { useEffect } from 'react';

import styles from './home.module.scss';

export function Home(): JSX.Element {
  const { location, getCurrentPosition } = useGeolocation();

  useEffect(() => {
    getCurrentPosition();
    console.log('location::', location.data?.coords.latitude);
  }, []);

  return (
    <div className={styles['home-wrapper']}>
      <div className={styles['home-list-wrapper']}>asdasd</div>
      <div className={styles['home-map-wrapper']}>
        <NaverMap
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          lat={location.data?.coords.latitude!}
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          lng={location.data?.coords.longitude!}
        />
      </div>
    </div>
  );
}
