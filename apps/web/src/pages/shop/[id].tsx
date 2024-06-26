import { parseScriptToJson } from '@application/helpers/json/parse_script_to_json';
import { useGetShopsById } from '@application/hooks/api/shop/use_get_shops_id';
import { ShopDetail } from '@presentation/features/shopDetail';
import { BaseLayout } from '@presentation/layouts/base';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import type { ShopDTO } from '../api/shop/dtos';

interface ShopDetailPageProps {
  shop: ShopDTO;
}

const ShopDetailPage: NextPage<ShopDetailPageProps> = ({
  shop,
}: ShopDetailPageProps) => {
  const { data, isLoading, isFetching } = useGetShopsById(shop!.id, shop);

  return (
    <>
      <NextSeo
        title={`멍꾹 | ${data!.name}`}
        description={data!.introduction}
        openGraph={{
          url: `https://meongkkuk.vercel.app/shop/${data!.id}`,
          title: `멍꾹 | ${data!.name}`,
          description: `멍꾹 | ${data!.introduction}`,
          images: [
            {
              url: data!.imageUrls[0]!,
              width: 390,
              height: 256,
              alt: 'thumbnail',
            },
          ],
        }}
      />
      <BaseLayout>
        <ShopDetail shop={data} isLoading={isLoading} isFetching={isFetching} />
      </BaseLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await parseScriptToJson();
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

  const result = await parseScriptToJson();
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
