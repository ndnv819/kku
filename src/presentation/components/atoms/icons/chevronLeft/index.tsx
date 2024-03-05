import type { IcChevronLeftProps } from './types';

export function IcChevronLeft({
  width = 24,
  height = 24,
  color = '#21272A',
}: IcChevronLeftProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5L7 12.1778L15 19.2222"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
