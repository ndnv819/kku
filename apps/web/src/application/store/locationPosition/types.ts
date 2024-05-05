import { z } from 'zod';

const LocationZod = z.object({
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export type LocationState = z.infer<typeof LocationZod>;

export type LocationActionType = z.infer<typeof LocationZod>;
