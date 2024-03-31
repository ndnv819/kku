import type { DefaultSeoProps } from 'next-seo';

export const defaultSeo: DefaultSeoProps = {
  title: '멍꾹',
  description: '반려견 동반 카페와 식당을 꾹~ 저장해보세요!',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://meongkkuk.vercel.app/',
    siteName: 'meongkkuk',
    title: '멍꾹',
  },
};
