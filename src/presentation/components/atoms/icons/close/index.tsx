import type { IcCloseProps } from './types';

export function IcClose({
  type,
  color = '#4D5358',
  width = 24,
  height = 24,
}: IcCloseProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={type === 'filled' ? color : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 17.9446L18 6.05525"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.05359 6L17.9429 18"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
