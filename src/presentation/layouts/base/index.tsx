import type { BaseLayoutProps } from '@presentation/layouts/base/types';
import type { JSX } from 'react';

import styles from './base.module.scss';

export function BaseLayout({ children }: BaseLayoutProps): JSX.Element {
  return <div className={styles['base-layout-wrapper']}>{children}</div>;
}
