import type { NaverMapMarker } from '@presentation/components/atoms/naverMap/types';
import { atom } from 'recoil';

import { RecoilAtomKeys } from '../constant';

export const MapMarkersAtom = atom<NaverMapMarker[] | undefined>({
  key: RecoilAtomKeys.MAP_MARKERS,
  default: undefined,
});
