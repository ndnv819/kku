import { shopsInBusinessAtom } from '@application/recoils/shops';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import type { ShopFilterStatusResult } from './types';

export function useShopFilterStaus(): ShopFilterStatusResult {
  const [status, setStatus] = useRecoilState(shopsInBusinessAtom);

  const changeStatus = useCallback((): void => {
    setStatus((prev) => !prev);
  }, []);

  return {
    status,
    changeStatus,
  };
}
