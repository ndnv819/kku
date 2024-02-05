import type { JSX } from 'react';
import { useMemo } from 'react';
import {
  Container as MapDiv,
  Marker,
  NaverMap as Map,
  useNavermaps,
} from 'react-naver-maps';

import type { NaverMapProps } from './types';

export function NaverMapClient(props: NaverMapProps): JSX.Element {
  const { lat, lng, minZoom, maxZoom, makers } = props;
  // eslint-disable-next-line
  const navermaps = useNavermaps();

  const renderMarkers = useMemo((): JSX.Element[] | null => {
    if (!makers || makers.length < 1) {
      return null;
    }

    return makers.map((m) => (
      <Marker key={m.name} position={new navermaps.LatLng(m.lat, m.lng)} />
    ));
  }, [makers]);

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
      >
        {renderMarkers}
      </Map>
    </MapDiv>
  );
}
