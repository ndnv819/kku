import { z } from 'zod';

// Q:: zod
const MenuItemZod = z.object({
  name: z.string(),
  price: z.string(),
});

const ReviewItemZod = z.object({
  postLink: z.string(),
  postTitle: z.string(),
  postContentSnippet: z.string(),
});

export const ShopDTOZod = z
  .object({
    id: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    openingTime: z.string(),
    name: z.string(),
    category: z.string(),
    address: z.string(),
    tel: z.string(),
    memo: z.string(),
    menuList: MenuItemZod.array(),
    reviewList: ReviewItemZod.array(),
    introduction: z.string(),
    canParking: z.boolean(),
    instagramLink: z.string(),
    youtubeLink: z.string(),
    blogLink: z.string(),
    kakaoLink: z.string(),
    imageUrls: z.string().array(),
  })
  .optional();

export type ShopDTO = z.infer<typeof ShopDTOZod>;
