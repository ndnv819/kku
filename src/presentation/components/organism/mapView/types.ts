import type { ShopDTO } from 'src/pages/api/shop/dtos';

export interface MapViewProps {
  lat: number;
  lng: number;
  shops?: ShopDTO[];
}
