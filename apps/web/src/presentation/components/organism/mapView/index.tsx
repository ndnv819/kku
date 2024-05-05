// eslint-disable-next-line simple-import-sort/imports
import { useCallback, useEffect } from 'react';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import { useBottomSheet } from '@application/hooks/store/bottomSheet/use_bottom_sheet';
import { useLocation } from '@application/hooks/store/location/use_location';
import { IcDrinks } from '@presentation/components/atoms/icons/drinks';
import { IcRestaurant } from '@presentation/components/atoms/icons/restaurant';
import { NaverMap } from '@presentation/components/atoms/naverMap';
import ReactDOMServer from 'react-dom/server';
import type { MapViewProps } from './types';

import styles from './styles.module.scss';

export function MapView({ lat, lng, shops }: MapViewProps): JSX.Element | null {
  const { setLocation } = useLocation();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  useEffect(() => {
    return () => {
      closeBottomSheet();
    };
  }, []);

  const onMarkerClick = useCallback((shop: ShopDTO): void => {
    if (!shop) {
      return;
    }
    openBottomSheet(shop);
    setLocation(parseFloat(shop.latitude), parseFloat(shop.longitude));
  }, []);

  const renderMarkerIcon = useCallback((shop: ShopDTO): string => {
    let iconElement = <IcRestaurant color="#fff" width={14} height={14} />;
    if (shop!.category === '카페') {
      iconElement = <IcDrinks color="#fff" width={16} height={16} />;
    }
    const iconString = ReactDOMServer.renderToStaticMarkup(iconElement);

    const iconContent = `
      <ul class=${styles['marker-wrapper']}>
        <li class=${styles['icon-wrapper']}>
          ${iconString}
        </li>
        <li>
          ${shop!.name}
        </li>
      </ul>
    `;
    return iconContent;
  }, []);

  if (!shops) {
    return null;
  }

  return (
    <NaverMap
      lat={lat}
      lng={lng}
      markerHandler={onMarkerClick}
      markerIconRenderer={renderMarkerIcon}
      markers={shops}
    />
  );
}
