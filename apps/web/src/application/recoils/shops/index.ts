import { atom } from 'recoil';

import { RecoilAtomKeys } from '../constant';

export const shopsInBusinessAtom = atom<boolean>({
  key: RecoilAtomKeys.SHOPS_BUSINESS_STATUS,
  default: true,
});

export const shopsCategoryAtom = atom<string | undefined>({
  key: RecoilAtomKeys.SHOPS_CATEGORY,
  default: undefined,
});
