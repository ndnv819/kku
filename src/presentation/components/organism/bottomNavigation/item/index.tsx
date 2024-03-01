/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button } from '@presentation/components/atoms/button';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import styles from './styles.module.scss';
import type { NavigationItemProps } from './types';

export function NavigationItem({
  icon,
  title,
  url,
}: NavigationItemProps): JSX.Element {
  const router = useRouter();

  const onRoute = useCallback((): void => {
    router.push(`${url}`);
  }, [url]);

  return (
    <Button onClick={onRoute} className={styles['navigation-item-wrapper']}>
      <div>{icon}</div>
      <div>{title}</div>
    </Button>
  );
}
