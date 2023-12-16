import { z } from 'zod';

export const StoreEnumZod = z.enum(['shop_filter']);
export type StoreEnum = z.infer<typeof StoreEnumZod>;
