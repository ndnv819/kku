import { shopsCategoryAtom } from '@application/recoils/shops';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import type { ShopFilterCategoryResult } from './types';

// TODO:: state와 setter 분리
export function useShopFilterCategory(): ShopFilterCategoryResult {
  const [category, setCategory] = useRecoilState(shopsCategoryAtom);

  const changeCategory = useCallback((shopsCategory: string): void => {
    setCategory((prev) => (prev === shopsCategory ? undefined : shopsCategory));
  }, []);

  return {
    category,
    changeCategory,
  };
}
