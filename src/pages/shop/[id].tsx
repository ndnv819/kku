import { ShopDetail } from '@presentation/features/shopDetail';
import { BaseLayout } from '@presentation/layouts/base';
import type { NextPage } from 'next';

const ShopDetailPage: NextPage = () => {
  return (
    <BaseLayout>
      <ShopDetail />
    </BaseLayout>
  );
};

export default ShopDetailPage;
