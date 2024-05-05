import dynamic from 'next/dynamic';
import type { JSX } from 'react';
import { Suspense } from 'react';

import type { NaverMapProps } from './types';

const DynamicNaverMapClient = dynamic(
  () => import('./naver').then((mod) => mod.NaverMapClient),
  { ssr: false },
);

export function NaverMap(props: NaverMapProps): JSX.Element {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <DynamicNaverMapClient {...props} />
    </Suspense>
  );
}
