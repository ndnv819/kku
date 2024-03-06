import { ShopDetail } from '@presentation/features/shopDetail';
import { BaseLayout } from '@presentation/layouts/base';
import fsPromises from 'fs/promises';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import path from 'path';

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
  const jsonPath = path.join(process.cwd(), 'scripts/flattened_array.json');
  const jsonFile = await fsPromises.readFile(jsonPath, 'utf-8');
  const result = JSON.parse(jsonFile) as ShopDTO[];
  const paths = result.map((s) => ({
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
  const jsonPath = path.join(process.cwd(), 'scripts/flattened_array.json');
  const jsonFile = await fsPromises.readFile(jsonPath, 'utf-8');
  const result = JSON.parse(jsonFile) as ShopDTO[];
  const shop = result.find((r) => r.id === params.id);

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
