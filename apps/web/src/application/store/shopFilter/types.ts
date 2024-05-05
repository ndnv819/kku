import { z } from 'zod';

export const ShopTypeEnumZod = z.enum(['전체', '카페', '식당']);
// zod의 infer와 typescript의 typeof를 이용하면 이미 정의한 스키마로부터 타입을 추론할 수 있다
export type ShopTypeEnum = z.infer<typeof ShopTypeEnumZod>;

const ShopFilterZod = z.object({
  type: ShopTypeEnumZod,
});

export type ShopFilterState = z.infer<typeof ShopFilterZod>;
