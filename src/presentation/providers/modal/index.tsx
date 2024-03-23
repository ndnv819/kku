import { MapBottomSheet } from '@presentation/components/organism/mapBottomSheet';

import type { MapBottomSheetProp } from './types';

export function ModalProvider({ children }: MapBottomSheetProp): JSX.Element {
  return (
    <>
      {children}
      <MapBottomSheet />
    </>
  );
}
