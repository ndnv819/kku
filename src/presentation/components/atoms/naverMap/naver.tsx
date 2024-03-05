// eslint-disable-next-line simple-import-sort/imports
import type { JSX } from 'react';
import { useMemo } from 'react';
import {
  NaverMap as Map,
  Container as MapDiv,
  Marker,
  useNavermaps,
} from 'react-naver-maps';

import type { NaverMapProps } from './types';

export function NaverMapClient(props: NaverMapProps): JSX.Element {
  const { lat, lng, minZoom, maxZoom, markers, children } = props;
  // eslint-disable-next-line
  const navermaps = useNavermaps();

  const renderMarkers = useMemo((): JSX.Element[] | null => {
    if (!markers || markers.length < 1) {
      return null;
    }

    return markers.map((m) => (
      <Marker
        key={m.name}
        position={new navermaps.LatLng(m.lat, m.lng)}
        title={m.name}
        icon={{
          content: `<p>${m.name}</p>`,
        }}
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
        minZoom={minZoom ?? 16}
        maxZoom={maxZoom ?? 21}
        pinchZoom
      >
        {renderMarkers}
        {children}
      </Map>
    </MapDiv>
  );
}
