import { useGetShopsById } from '@application/hooks/api/shop';
import type { Shop } from '@infrastructure/firebase/models/shop';
import { ShopDetail } from '@presentation/features/shopDetail';
import { BaseLayout } from '@presentation/layouts/base';
import type { NextPage } from 'next';

interface ShopDetailPageProps {
  shop: Shop;
}

const ShopDetailPage: NextPage<ShopDetailPageProps> = (props) => {
  const { shop } = props;
  const { data } = useGetShopsById(shop.id);

  return (
    <BaseLayout>
      <ShopDetail shop={data!} />
    </BaseLayout>
  );
};

export default ShopDetailPage;
