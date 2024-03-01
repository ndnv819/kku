import { SearchInput } from '@presentation/components/atoms/searchInput';
import { BackButton } from '@presentation/components/molecules/backButton';
import { HeartButton } from '@presentation/components/molecules/heartButton';

import styles from './styles.module.scss';
import type { AppbarProps } from './types';

export function Appbar({ children }: AppbarProps): JSX.Element {
  return <div className={styles['app-bar']}>{children}</div>;
}

Appbar.BackButton = BackButton;
Appbar.HeartButton = HeartButton;
Appbar.SearchInput = SearchInput;
