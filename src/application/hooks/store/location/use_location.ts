import type { RootState } from '@application/store';
import { locationActions } from '@application/store/locationPosition/slice';
import type { LocationState } from '@application/store/locationPosition/types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { LocationResult } from './types';

export function useLocation(): LocationResult {
  const locationState: LocationState = useSelector<RootState, LocationState>(
    (state) => state.location,
  );
  const dispatch = useDispatch();

  const setLocation = useCallback((lat: number, lng: number) => {
    dispatch(locationActions.setLocation({ lat, lng }));
  }, []);

  return {
    locationState,
    setLocation,
  };
}
