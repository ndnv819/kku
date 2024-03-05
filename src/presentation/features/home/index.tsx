/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useGetShops } from '@application/hooks/api/shop';
import { useGeolocation } from '@application/hooks/common/use_geolocation2';
import { useChangeView } from '@application/hooks/logics/view';
import { LocationActions } from '@application/store/location/slice';
import { Button } from '@presentation/components/atoms/button';
import { DefaultLoader } from '@presentation/components/atoms/loader';
import { NaverMap } from '@presentation/components/atoms/naverMap';
import type { NaverMapMarker } from '@presentation/components/atoms/naverMap/types';
import { BottomNavigation } from '@presentation/components/organism/bottomNavigation';
import type { JSX } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import { ListView } from '../../components/organism/listView';
import { DEFAULT_LAT, DEFAULT_LNG } from './constant';
import styles from './home.module.scss';

interface Shops {
  shops: ShopDTO[];
}

export function Home({ shops }: Shops): JSX.Element {
  const { location, getCurrentPosition } = useGeolocation();
  const { isLoading, isFetching, groupByIsInBusiness } = useGetShops(shops);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { isMapView, changeView } = useChangeView();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      LocationActions.changeType({
        lat: location.data?.coords.latitude,
        lng: location.data?.coords.longitude,
      }),
    );
  }, []);

  useEffect(() => {
    // 매번 getCurrentPosition을 하는 게 아니라 location 값 확인해서 진행
    if (!location) {
      getCurrentPosition();
    }
  }, [location]);

  const onFilteredShops = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  const markers = useMemo((): NaverMapMarker[] | undefined => {
    if (!groupByIsInBusiness!(isOpened)) {
      return undefined;
    }

    return groupByIsInBusiness!(isOpened)!.map((d) => ({
      name: d.name,
      lat: parseFloat(d.latitude),
      lng: parseFloat(d.longitude),
    }));
  }, [groupByIsInBusiness, isOpened]);

  const filteredCoords = useMemo((): { lat: number; lng: number } => {
    if (!location.data) {
      return {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG,
      };
    }
    return {
      lat: location.data.coords.latitude,
      lng: location.data.coords.longitude,
    };
  }, [location]);

  if (location.isLoading || isLoading || isFetching || !groupByIsInBusiness) {
    return (
      <div className="flex h-screen items-center justify-center">
        <DefaultLoader />
      </div>
    );
  }

  return (
    <>
      <section className={styles['home-wrapper']}>
        <Button onClick={onFilteredShops}>
          {isOpened ? '영업 중' : '전체'}
        </Button>
        <div className={styles['home-map-wrapper']}>
          {isMapView ? (
            <NaverMap
              markers={markers}
              lat={filteredCoords.lat}
              lng={filteredCoords.lng}
              minZoom={6}
            />
          ) : (
            <ListView shops={groupByIsInBusiness(isOpened)} />
          )}
        </div>
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
