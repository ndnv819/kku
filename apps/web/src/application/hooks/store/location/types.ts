import type { LocationState } from '@application/store/locationPosition/types';

export interface LocationResult {
  locationState: LocationState;
  setLocation: (lat: number, lng: number) => void;
}
