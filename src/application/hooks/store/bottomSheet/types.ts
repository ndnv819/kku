import type { BottomSheetState } from '@application/store/bottomSheet/types';

export interface BottomSheetResult {
  bottomSheetState: BottomSheetState;
  openBottomSheet: (payload: any) => void;
  closeBottomSheet: () => void;
}
