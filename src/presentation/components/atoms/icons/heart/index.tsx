import type { IcHeartProps } from './types';

export function IcHeart({
  width = 24,
  height = 24,
  type = 'outlined',
  color = '#21272A',
}: IcHeartProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={type === 'outlined' ? 'none' : color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3297 6.15772C11.4569 6.41127 11.7163 6.57133 12 6.57133C12.2837 6.57133 12.5431 6.41127 12.6703 6.15772C13.109 5.28356 14.0464 4.55989 14.7942 4.19502C15.7034 3.75137 16.577 3.65556 17.399 3.83623C18.2292 4.01869 19.0584 4.49511 19.8425 5.27919C21.7192 7.15588 21.7192 10.1986 19.8425 12.0753L12.1768 19.741C12.0791 19.8386 11.9208 19.8386 11.8232 19.741L4.15752 12.0753C2.28083 10.1986 2.28083 7.15588 4.15752 5.27919C4.9416 4.49511 5.77082 4.01869 6.60097 3.83623C7.423 3.65556 8.29661 3.75137 9.20583 4.19502C9.95358 4.55989 10.891 5.28355 11.3297 6.15772Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
