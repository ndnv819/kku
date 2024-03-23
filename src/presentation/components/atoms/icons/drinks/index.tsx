import type { IcDrinksProps } from './types';

export function IcDrinks({
  type = 'filled',
  color,
  width = 24,
  height = 24,
}: IcDrinksProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill={type === 'outlined' ? 'none' : color}
        d="M7.323 2H4V0h4.677l2 5H21v2h-2.118l-.827 14.059a1 1 0 0 1-.998.941H6.943a1 1 0 0 1-.998-.941L5.118 7H3V5h5.523zm-.202 5l.178 3.025c2.672.11 3.969.605 5.061 1.042c1.051.42 1.92.786 4.227.9L16.879 7z"
      />
    </svg>
  );
}
