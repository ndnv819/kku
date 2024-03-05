import type { IcMarkerProps } from './types';

export function IcMarker({
  width = 24,
  height = 24,
  type = 'outlined',
  color = '#21272A',
}: IcMarkerProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={type === 'outlined' ? 'none' : color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.147 21.2134L12.1456 21.215C11.9809 21.3975 11.7444 21.5 11.5 21.5C11.2556 21.5 11.0191 21.3975 10.8544 21.215C10.7302 21.0773 9.12774 19.2955 7.55923 16.9473C6.77499 15.7732 6.00584 14.4673 5.43419 13.1622C4.86013 11.8516 4.5 10.5748 4.5 9.45C4.5 5.61929 7.6354 2.5 11.5 2.5C15.3646 2.5 18.5 5.61929 18.5 9.45C18.5 10.5507 18.163 11.7883 17.6206 13.0581C17.0802 14.3233 16.3487 15.591 15.5899 16.7438C14.0719 19.05 12.47 20.8586 12.147 21.2134ZM11.5 5.83C9.49547 5.83 7.85906 7.45071 7.85906 9.45C7.85906 11.4493 9.49547 13.07 11.5 13.07C13.5045 13.07 15.1409 11.4493 15.1409 9.45C15.1409 7.45071 13.5045 5.83 11.5 5.83Z"
        stroke={color}
      />
    </svg>
  );
}
