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
  makers?: NaverMapMarker[];
}
