/* eslint-disable react/no-array-index-key */
import { useGetShopsById } from '@application/hooks/api/shop';
import { Button } from '@presentation/components/atoms/button';
import { IcMarker } from '@presentation/components/atoms/icons/marker';
import { DefaultLoader } from '@presentation/components/atoms/loader';
import { Typography } from '@presentation/components/atoms/typography';
import { Appbar } from '@presentation/components/organism/appbar';
import { BottomNavigation } from '@presentation/components/organism/bottomNavigation';
import { useCallback, useState } from 'react';

import { MapView } from './mapView';
import type { ShopDetailProps } from './types';

export function ShopDetail({ shop }: ShopDetailProps): JSX.Element {
  const { data, isLoading, isFetching } = useGetShopsById(shop!.id, shop!);
  const [showMapViw, setShowMapView] = useState<boolean>(false);

  const changeView = useCallback((): void => {
    setShowMapView((prev) => !prev);
  }, []);

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <DefaultLoader />
      </div>
    );
  }

  return showMapViw ? (
    <MapView
      name={data!.name}
      lat={data!.latitude}
      lng={data!.longitude}
      changeView={changeView}
    />
  ) : (
    <>
      <Appbar>
        <Appbar.BackButton className="p-[0]" />
        <Appbar.HeartButton
          className="p-[0]"
          onClick={() => console.log('click')}
          // TODO
          iconType="outlined"
        />
      </Appbar>
      <section className="px-[16px] pb-[80px] pt-[64px]">
        <div className="flex items-center gap-[8px]">
          <Typography as="h5">{data?.name}</Typography>
          <Typography>{data?.category}</Typography>
        </div>
        <div className="flex items-center gap-[4px]">
          <IcMarker width={16} height={16} color="orange" type="filled" />
          <Typography category="p2">{data?.address}</Typography>
          <Button
            sizes="tiny"
            appearances="ghost"
            onClick={changeView}
            className="min-w-fit p-[8px]"
          >
            <Typography category="p2">지도보기</Typography>
          </Button>
        </div>
        <Typography as="h6" className="mb-[8px] mt-[36px]">
          영업시간
        </Typography>
        <Typography>{data?.openingTime}</Typography>
        <Typography as="h6" className="mb-[8px] mt-[36px]">
          기본정보
        </Typography>
        <div className="flex gap-[8px]">
          <ul className="flex-col leading-[160%]">
            <li>tel</li>
            <li>feat</li>
          </ul>
          <ul className="flex-col leading-[160%]">
            <li>{data?.tel}</li>
            <li>{data?.memo}</li>
          </ul>
        </div>
        <Typography as="h6" className="mb-[8px] mt-[36px]">
          메인 메뉴
        </Typography>
        <div className="flex justify-between">
          <ul className="flex-col leading-[160%]">
            {data?.menuList.map((m, index) => <li key={index}>{m.name}</li>)}
          </ul>
          <ul className="flex-col text-right leading-[160%]">
            {data?.menuList.map((m, index) => <li key={index}>{m.price}</li>)}
          </ul>
        </div>
        <Typography as="h6" className="mb-[8px] mt-[36px]">
          주차 정보
        </Typography>
        <Typography>{data?.canParking ? '주차 가능' : '주차 불가'}</Typography>
      </section>
      <BottomNavigation />
    </>
  );
}
