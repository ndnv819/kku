/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import '@presentation/styles/global.scss';
import '../env';

import { wrapper } from '@application/store';
import { AuthProvider } from '@presentation/providers/auth';
import { GraphqlProvider } from '@presentation/providers/graphQL';
import { NaverMapProvider } from '@presentation/providers/naverMap';
import { QueryProvider } from '@presentation/providers/query';
import { ToastProvider } from '@presentation/providers/toast';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import { RecoilEnv, RecoilRoot } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

interface PageProps {
  pageProps: {
    initialApolloState: any;
    session?: any;
  };
}

const myFont = localFont({
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
});

export default function App({
  Component,
  ...rest
}: Omit<AppProps, 'pageProps'> & PageProps): JSX.Element {
  // @ts-ignore
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <QueryProvider>
      <GraphqlProvider pageProps={props.pageProps}>
        <AuthProvider session={props.pageProps.session}>
          <Provider store={store}>
            <RecoilRoot>
              <main className={myFont.className}>
                <ToastProvider>
                  <NaverMapProvider>
                    <Component {...props.pageProps} />
                  </NaverMapProvider>
                </ToastProvider>
              </main>
            </RecoilRoot>
          </Provider>
        </AuthProvider>
      </GraphqlProvider>
    </QueryProvider>
  );
}
