import { BackButton } from '@presentation/components/molecules/backButton';
import { HeartButton } from '@presentation/components/molecules/heartButton';

import { AppbarDummy } from './dummy';
import styles from './styles.module.scss';
import { AppbarTitle } from './title';
import type { AppbarProps } from './types';

export function Appbar({ children }: AppbarProps): JSX.Element {
  return <div className={styles['app-bar']}>{children}</div>;
}

Appbar.BackButton = BackButton;
Appbar.HeartButton = HeartButton;
Appbar.Title = AppbarTitle;
Appbar.Dummy = AppbarDummy;
