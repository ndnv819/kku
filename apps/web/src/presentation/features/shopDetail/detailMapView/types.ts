import type { ShopDTO } from 'src/pages/api/shop/dtos';

export interface MapViewProps {
  shop: ShopDTO;
  changeDetailView: () => void;
}
