import { z } from 'zod';

export const StoreEnumZod = z.enum([
  'shop_filter',
  'location',
  'bottom_sheet',
  'bookmark',
]);
export type StoreEnum = z.infer<typeof StoreEnumZod>;
