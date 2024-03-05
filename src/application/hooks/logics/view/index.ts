import { MapViewAtom } from '@application/recoils/view';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import type { ChangeViewResultType } from './types';

// 모든 페이지에서 다 쓰임
export function useChangeView(): ChangeViewResultType {
  const [isMapView, setIsMapView] = useRecoilState(MapViewAtom);

  const changeView = useCallback(() => {
    setIsMapView((prev) => !prev);
  }, []);

  return {
    isMapView,
    changeView,
  };
}
