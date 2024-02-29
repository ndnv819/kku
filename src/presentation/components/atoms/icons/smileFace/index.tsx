import type { IcSmileFaceProps } from './types';

export function IcSmileFace({
  width = 24,
  height = 24,
  type = 'outlined',
  color = '#21272A',
}: IcSmileFaceProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={type === 'outlined' ? 'none' : color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="8.25" stroke={color} strokeWidth="1.5" />
      <circle
        cx="8.75"
        cy="9.75"
        r="0.75"
        fill={type === 'outlined' ? color : 'white'}
      />
      <circle
        cx="15.25"
        cy="9.75"
        r="0.75"
        fill={type === 'outlined' ? color : 'white'}
      />
      <path
        d="M9 14C9.39105 14.3166 9.85782 14.5681 10.373 14.7398C10.8881 14.9116 11.4412 15 12 15C12.5588 15 13.1119 14.9116 13.627 14.7398C14.1422 14.5681 14.6089 14.3166 15 14"
        stroke={type === 'outlined' ? color : 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
