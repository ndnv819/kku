import { usePathname } from 'next/navigation';

import { NavigationItem } from './item';
import styles from './styles.module.scss';
import { navigationItem } from './utils';

export function BottomNavigation(): JSX.Element {
  const pathname = usePathname();

  const items = navigationItem(pathname);

  return (
    <div className={styles['bottom-navigation-wrapper']}>
      {items.map((item) => (
        <NavigationItem
          key={item.id}
          title={item.title}
          url={item.url}
          icon={item.icon}
        />
      ))}
    </div>
  );
}
