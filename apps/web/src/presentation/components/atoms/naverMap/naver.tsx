// eslint-disable-next-line simple-import-sort/imports
import {
  NaverMap as Map,
  Container as MapDiv,
  Marker,
  useNavermaps,
} from 'react-naver-maps';

import { useCallback, useMemo } from 'react';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import type { NaverMapProps } from './types';

export function NaverMapClient({
  lat,
  lng,
  minZoom,
  maxZoom,
  markers,
  markerHandler,
  markerIconRenderer,
}: NaverMapProps): JSX.Element {
  // eslint-disable-next-line
  const navermaps = useNavermaps();

  const onMarkerClick = useCallback(
    (marker: ShopDTO): void => {
      if (markerHandler) {
        markerHandler(marker);
      }
    },
    [markerHandler],
  );

  const renderMarkers = useMemo(() => {
    if (!markers || markers.length < 1) {
      return null;
    }

    return markers.map((m) => (
      <Marker
        key={m!.name}
        position={
          new navermaps.LatLng(
            parseFloat(m!.latitude),
            parseFloat(m!.longitude),
          )
        }
        title={m!.name}
        icon={
          markerIconRenderer && {
            content: markerIconRenderer(m),
            size: new navermaps.Size(38, 58),
            anchor: new navermaps.Point(19, 58),
          }
        }
        onClick={() => onMarkerClick(m)}
      />
    ));
  }, [markers]);

  return (
    <MapDiv
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Map
        // 줌
        // eslint-disable-next-line
        defaultCenter={new navermaps.LatLng(lat, lng)}
        defaultZoom={maxZoom ?? 16}
        minZoom={minZoom ?? 6}
        maxZoom={maxZoom ?? 21}
        pinchZoom
      >
        {renderMarkers}
      </Map>
    </MapDiv>
  );
}
