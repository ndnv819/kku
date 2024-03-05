import type { ReactNode } from 'react';

export interface NaverMapMarker {
  name: string;
  lat: number;
  lng: number;
}

export interface NaverMapProps {
  lat: number;
  lng: number;
  minZoom?: number;
  maxZoom?: number;
  markers?: NaverMapMarker[];
  children?: ReactNode;
}
