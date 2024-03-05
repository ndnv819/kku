import { useChangeView } from '@application/hooks/logics/view';
import { Button } from '@presentation/components/atoms/button';
import { NaverMap } from '@presentation/components/atoms/naverMap';
import { BottomNavigation } from '@presentation/components/organism/bottomNavigation';
import { useState } from 'react';

import { ListView } from '../../components/organism/listView';
import styles from './styles.module.scss';

export function Bookmark(): JSX.Element {
  const { isMapView, changeView } = useChangeView();
  const [isOpened, _setIsOpened] = useState<boolean>(false);

  return (
    <>
      <section className={styles['bookmark-wrapper']}>
        <Button onClick={() => console.log('click')}>
          {isOpened ? '영업 중' : '전체'}
        </Button>
        {isMapView ? (
          <NaverMap lat={0} lng={0} minZoom={6} />
        ) : (
          <ListView shops={undefined} />
        )}
        <Button
          onClick={changeView}
          className="fixed bottom-[80px] left-[50%] translate-x-[-50%] bg-orange-500 text-white"
        >
          {isMapView ? '리스트 보기' : '지도 보기'}
        </Button>
      </section>
      <BottomNavigation />
    </>
  );
}
