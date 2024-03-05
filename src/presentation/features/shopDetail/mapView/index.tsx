import { Button } from '@presentation/components/atoms/button';
import { NaverMap } from '@presentation/components/atoms/naverMap';

import type { MapViewProps } from './types';

export function MapView({
  name,
  lat,
  lng,
  changeView,
}: MapViewProps): JSX.Element {
  return (
    <div className="absolute inset-0 z-10 h-[100dvh] w-[100%] bg-white">
      <NaverMap
        lat={parseFloat(lat)}
        lng={parseFloat(lng)}
        markers={[{ name, lat: parseFloat(lat), lng: parseFloat(lng) }]}
      >
        <Button
          onClick={changeView}
          className="absolute left-[16px] top-[16px] p-[0]"
        >
          X
        </Button>
      </NaverMap>
    </div>
  );
}
