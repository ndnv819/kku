import { ShopDTOZod } from 'src/pages/api/shop/dtos';
import { z } from 'zod';

const BottomSheetZod = z.object({
  isOpened: z.boolean(),
  shop: ShopDTOZod,
});

export type BottomSheetState = z.infer<typeof BottomSheetZod>;

export type BottomSheetActionType = z.infer<typeof ShopDTOZod>;
