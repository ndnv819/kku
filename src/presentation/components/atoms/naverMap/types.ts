import type { ReactNode } from 'react';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

export interface NaverMapProps {
  lat: number;
  lng: number;
  minZoom?: number;
  maxZoom?: number;
  markers?: ShopDTO[];
  markerHandler?: (marker: ShopDTO) => void;
  markerIconRenderer?: (marker: ShopDTO) => string;
  children?: ReactNode;
}
