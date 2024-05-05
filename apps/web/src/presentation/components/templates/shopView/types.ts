import type { ShopDTO } from 'src/pages/api/shop/dtos';

export interface ShopViewProps {
  lat?: number;
  lng?: number;
  shops?: ShopDTO[];
}
