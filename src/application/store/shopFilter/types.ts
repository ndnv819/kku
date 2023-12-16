import { z } from 'zod';

export const ShopTypeEnumZod = z.enum(['전체', '카페', '식당']);
export type ShopTypeEnum = z.infer<typeof ShopTypeEnumZod>;

const ShopFilterZod = z.object({
  type: ShopTypeEnumZod,
});

export type ShopFilterState = z.infer<typeof ShopFilterZod>;
