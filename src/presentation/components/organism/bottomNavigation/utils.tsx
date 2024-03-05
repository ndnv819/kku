import { IcHeart } from '@presentation/components/atoms/icons/heart';
import { IcMarker } from '@presentation/components/atoms/icons/marker';
import { IcSearch } from '@presentation/components/atoms/icons/search';
import { IcSmileFace } from '@presentation/components/atoms/icons/smileFace';

interface NavigationItemType {
  id: number;
  title: string;
  url: string;
  icon: JSX.Element;
}

export const navigationItem = (pathName: string): NavigationItemType[] => {
  return [
    {
      id: 1,
      title: '내주변',
      url: '/',
      icon: (
        <IcMarker
          type={pathName === '/' ? 'filled' : 'outlined'}
          color={pathName === '/' ? 'orange' : undefined}
        />
      ),
    },
    {
      id: 2,
      title: '검색',
      url: '/search',
      icon: (
        <IcSearch
          type={pathName === '/search' ? 'filled' : 'outlined'}
          color={pathName === '/search' ? 'orange' : undefined}
        />
      ),
    },
    {
      id: 3,
      title: '저장',
      url: '/bookmark',
      icon: (
        <IcHeart
          type={pathName === '/bookmark' ? 'filled' : 'outlined'}
          color={pathName === '/bookmark' ? 'orange' : undefined}
        />
      ),
    },
    {
      id: 4,
      title: 'MY',
      url: '/my',
      icon: (
        <IcSmileFace
          type={pathName === '/my' ? 'filled' : 'outlined'}
          color={pathName === '/my' ? 'orange' : undefined}
        />
      ),
    },
  ];
};
