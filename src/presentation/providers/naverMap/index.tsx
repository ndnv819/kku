import { NavermapsProvider } from 'react-naver-maps';

export function NaverMapProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <NavermapsProvider
      ncpClientId={process.env['NEXT_PUBLIC_NAVER_CLIENT_ID']!}
      submodules={['panorama']}
    >
      {children}
    </NavermapsProvider>
  );
}
