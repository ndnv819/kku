import { Button } from '@presentation/components/atoms/button';
import { IcClose } from '@presentation/components/atoms/icons/close';
import { IcDrinks } from '@presentation/components/atoms/icons/drinks';
import { IcRestaurant } from '@presentation/components/atoms/icons/restaurant';
import { NaverMap } from '@presentation/components/atoms/naverMap';
import { EmptyView } from '@presentation/components/organism/emptyView';
import { useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import styles from './styles.module.scss';
import type { MapViewProps } from './types';

export function ShopDetailMapView({
  shop,
  changeView,
}: MapViewProps): JSX.Element {
  const renderMarkerIcon = useCallback((marker: ShopDTO): string => {
    let iconElement = <IcRestaurant color="#fff" width={14} height={14} />;
    if (marker!.category === '카페') {
      iconElement = <IcDrinks color="#fff" width={16} height={16} />;
    }
    const iconString = ReactDOMServer.renderToStaticMarkup(iconElement);

    const iconContent = `
      <ul class=${styles['marker-wrapper']}>
        <li class=${styles['icon-wrapper']}>
          ${iconString}
        </li>
        <li>
          ${marker!.name}
        </li>
      </ul>
    `;
    return iconContent;
  }, []);

  if (!shop) {
    return <EmptyView title="가게 정보를 불러오는 데 실패했습니다." />;
  }

  return (
    <div className="absolute inset-0 z-10 h-[100dvh] w-[100%] bg-white">
      <Button
        onClick={changeView}
        className="absolute right-[16px] top-[16px] z-50 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white p-[0]"
      >
        <IcClose />
      </Button>
      <NaverMap
        lat={parseFloat(shop.latitude)}
        lng={parseFloat(shop.longitude)}
        markers={[shop]}
        markerIconRenderer={renderMarkerIcon}
      />
    </div>
  );
}
