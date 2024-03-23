import { mapViewAtom } from '@application/recoils/view';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import type { ChangeViewResultType } from './types';

export function useChangeView(): ChangeViewResultType {
  const [isMapView, setIsMapView] = useRecoilState(mapViewAtom);

  const changeView = useCallback(() => {
    setIsMapView((prev) => !prev);
  }, []);

  return {
    isMapView,
    changeView,
  };
}
