import { parseJson } from '@application/helpers/json/parse_json';
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
  const result = await parseJson();
  const paths = result.map((r) => ({
    params: { id: r!.id },
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

  const result = await parseJson();
  const shop = result.find((r) => r!.id === params.id);

  if (!shop) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      shop,
    },
  };
};

export default ShopDetailPage;
