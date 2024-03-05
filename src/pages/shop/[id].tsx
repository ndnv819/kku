import { requestGet } from '@infrastructure/network';
import { ShopDetail } from '@presentation/features/shopDetail';
import { BaseLayout } from '@presentation/layouts/base';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import type { ShopDTO } from '../api/shop/dtos';

interface ShopDetailPageProps {
  shop: ShopDTO;
}

const ShopDetailPage: NextPage<ShopDetailPageProps> = ({
  shop,
}: ShopDetailPageProps) => {
  return (
    <BaseLayout>
      <ShopDetail shop={shop} />
    </BaseLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const shops = await requestGet<ShopDTO[]>(`/api/shop`);
  const paths = shops.map((s) => ({
    params: { id: s.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ShopDetailPageProps> = async (
  context,
) => {
  const { params } = context;
  if (!params) {
    return {
      notFound: true,
    };
  }

  const data = await requestGet<ShopDTO>(`/api/shop/${params.id as string}`);
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      shop: data,
    },
  };
};

export default ShopDetailPage;
