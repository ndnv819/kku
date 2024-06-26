/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import '@presentation/styles/global.scss';
import '@presentation/styles/reset.scss';
import '../env';

import { persistor, wrapper } from '@application/store';
import { AuthProvider } from '@presentation/providers/auth';
import { ModalProvider } from '@presentation/providers/modal';
import { NaverMapProvider } from '@presentation/providers/naverMap';
import { QueryProvider } from '@presentation/providers/query';
import { ToastProvider } from '@presentation/providers/toast';
import { DefaultSeo } from 'next-seo';
import { defaultSeo } from 'next-seo.config';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { PersistGate } from 'redux-persist/integration/react';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

interface PageProps {
  pageProps: {
    initialApolloState: any;
    session?: any;
  };
}

const baseFont = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

const subFont = localFont({
  src: [
    {
      path: '../../public/fonts/LotteriaChab.woff2',
      weight: 'normal',
      style: 'normal',
    },
  ],
  variable: '--font-chab',
});

export default function App({
  Component,
  ...rest
}: Omit<AppProps, 'pageProps'> & PageProps): JSX.Element {
  // @ts-ignore
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <QueryProvider>
        <AuthProvider session={props.pageProps.session}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RecoilRoot>
                <main className={`${subFont.variable} ${baseFont.variable}`}>
                  <ToastProvider>
                    <NaverMapProvider>
                      <ModalProvider>
                        <Component {...props.pageProps} />
                      </ModalProvider>
                    </NaverMapProvider>
                  </ToastProvider>
                </main>
              </RecoilRoot>
            </PersistGate>
          </Provider>
        </AuthProvider>
      </QueryProvider>
    </>
  );
}
