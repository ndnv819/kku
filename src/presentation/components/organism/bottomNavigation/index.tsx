import { IcHeart } from '@presentation/components/atoms/icons/heart';
import { IcMarker } from '@presentation/components/atoms/icons/marker';
import { IcSearch } from '@presentation/components/atoms/icons/search';
import { IcSmileFace } from '@presentation/components/atoms/icons/smileFace';
import { usePathname } from 'next/navigation';

import { NavigationItem } from './item';
import styles from './styles.module.scss';

export function BottomNavigation(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className={styles['bottom-navigation-wrapper']}>
      <NavigationItem
        title="내주변"
        url="/"
        icon={
          <IcMarker
            type={pathname === '/' ? 'filled' : 'outlined'}
            color={pathname === '/' ? 'orange' : undefined}
          />
        }
      />
      <NavigationItem
        title="검색"
        url="/search"
        icon={
          <IcSearch
            type={pathname === '/search' ? 'filled' : 'outlined'}
            color={pathname === '/search' ? 'orange' : undefined}
          />
        }
      />
      <NavigationItem
        title="저장"
        url="/"
        icon={
          <IcHeart
            type={pathname === '/' ? 'filled' : 'outlined'}
            color={pathname === '/' ? 'orange' : undefined}
          />
        }
      />
      <NavigationItem
        title="MY"
        url="/my"
        icon={
          <IcSmileFace
            type={pathname === '/my' ? 'filled' : 'outlined'}
            color={pathname === '/my' ? 'orange' : undefined}
          />
        }
      />
    </div>
  );
}
