import { ShopDTOZod } from 'src/pages/api/shop/dtos';
import { z } from 'zod';

const BookmarkZod = z.object({
  bookmarkList: ShopDTOZod.array(),
});
export type BookmarkState = z.infer<typeof BookmarkZod>;

export type BookmarkActionType = z.infer<typeof ShopDTOZod>;
