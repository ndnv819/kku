import { z } from 'zod';

export const StoreEnumZod = z.enum(['shop_filter']);
export type StoreEnum = z.infer<typeof StoreEnumZod>;

export const LocationEnumZod = z.enum(['location']);
export type LocationEnum = z.infer<typeof LocationEnumZod>;
