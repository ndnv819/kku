import { useGeolocation } from '@application/hooks/common/use_geolocation';
import { NaverMap } from '@presentation/components/atoms/naverMap';
import type { JSX } from 'react';
import { useEffect } from 'react';

import styles from './home.module.scss';

export function Home(): JSX.Element {
  const { getCurrentPosition } = useGeolocation();

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <div className={styles['home-wrapper']}>
      <div className={styles['home-list-wrapper']}>asdasd</div>
      <div className={styles['home-map-wrapper']}>
        <NaverMap lat={35.1553364} lng={129.0639798} />
      </div>
    </div>
  );
}
