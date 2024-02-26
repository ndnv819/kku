import type { ShopDetailProps } from './types';

export function ShopDetail({ shop }: ShopDetailProps): JSX.Element {
  return (
    <section>
      <h1>상세페이지</h1>
      <p>{shop.id}</p>
    </section>
  );
}
