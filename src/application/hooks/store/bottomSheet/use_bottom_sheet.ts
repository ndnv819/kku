import type { RootState } from '@application/store';
import { bottomSheetActions } from '@application/store/bottomSheet/slice';
import type { BottomSheetState } from '@application/store/bottomSheet/types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import type { BottomSheetResult } from './types';

export function useBottomSheet(): BottomSheetResult {
  const bottomSheetState: BottomSheetState = useSelector<
    RootState,
    BottomSheetState
  >((state) => state.bottom_sheet);
  const dispatch = useDispatch();

  const closeBottomSheet = useCallback(() => {
    dispatch(bottomSheetActions.closeBottomSheet());
  }, []);

  const openBottomSheet = useCallback((payload: ShopDTO) => {
    dispatch(bottomSheetActions.openBottomSheet(payload));
  }, []);

  return {
    bottomSheetState,
    openBottomSheet,
    closeBottomSheet,
  };
}
