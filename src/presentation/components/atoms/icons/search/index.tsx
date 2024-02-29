import type { IcSearchProps } from './types';

export function IcSearch({
  width = 24,
  height = 24,
  type = 'outlined',
  color = '#21272A',
}: IcSearchProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={type === 'filled' ? color : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 17.25C7.77188 17.25 4.75 14.2281 4.75 10.5C4.75 6.77188 7.77188 3.75 11.5 3.75C15.2281 3.75 18.25 6.77188 18.25 10.5C18.25 14.2281 15.2281 17.25 11.5 17.25Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.875 21L16.3762 16.5012"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
