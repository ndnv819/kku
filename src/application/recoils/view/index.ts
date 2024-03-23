import { atom } from 'recoil';

import { RecoilAtomKeys } from '../constant';

export const mapViewAtom = atom<boolean>({
  key: RecoilAtomKeys.IS_MAP_VIEW,
  default: true,
});
