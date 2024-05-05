import { useBottomSheet } from '@application/hooks/store/bottomSheet/use_bottom_sheet';
import { BottomSheet } from '@presentation/components/atoms/bottomSheet';
import { ListItem } from '@presentation/components/molecules/listItem';

export function MapBottomSheet(): JSX.Element {
  const { bottomSheetState, closeBottomSheet } = useBottomSheet();

  return (
    <BottomSheet
      isOpen={bottomSheetState.isOpened}
      onClose={closeBottomSheet}
      showCloseIcon={false}
    >
      <ListItem shop={bottomSheetState.shop} />
    </BottomSheet>
  );
}
