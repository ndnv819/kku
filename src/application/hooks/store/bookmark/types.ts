import type { ShopDTO } from 'src/pages/api/shop/dtos';

export interface bookmarkResultType {
  bookmarkList: ShopDTO[];
  filteredBookmarkList: (status: boolean, category?: string) => ShopDTO[];
  isBookmarked: (id: string) => boolean;
  addBookmark: (shop: ShopDTO) => void;
  deleteBookmark: (id: string) => void;
}
