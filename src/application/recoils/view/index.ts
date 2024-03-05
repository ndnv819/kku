import { atom } from 'recoil';

import { RecoilAtomKeys } from '../constant';

export const MapViewAtom = atom<boolean>({
  key: RecoilAtomKeys.VIEW_CATEGORY_IS_MAP,
  default: true,
});
