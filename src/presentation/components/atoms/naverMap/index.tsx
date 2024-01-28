import { Container as MapDiv, Marker, NaverMap as Map } from 'react-naver-maps';

import { NaverMapProps } from './types';

export function NaverMap({
  lat = 37.5666103,
  lng = 126.9783882,
}: NaverMapProps): JSX.Element {
  return (
    <MapDiv
      style={{
        height: 400,
      }}
    >
      <Map>
        <Marker defaultPosition={{ lat, lng }} />
      </Map>
    </MapDiv>
  );
}
