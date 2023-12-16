/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import '@presentation/styles/global.scss';
import '../env';

import { wrapper } from '@application/store';
import { GraphqlProvider } from '@presentation/providers/graphQL';
import { ToastProvider } from '@presentation/providers/toast';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { RecoilEnv, RecoilRoot } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

interface PageProps {
  pageProps: {
    initialApolloState: any;
  };
}

export default function App({
  Component,
  ...rest
}: Omit<AppProps, 'pageProps'> & PageProps) {
  // @ts-ignore
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <GraphqlProvider pageProps={props.pageProps}>
      <Provider store={store}>
        <RecoilRoot>
          <ToastProvider>
            <Component {...props.pageProps} />
          </ToastProvider>
        </RecoilRoot>
      </Provider>
    </GraphqlProvider>
  );
}
