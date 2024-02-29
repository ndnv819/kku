import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    return <input ref={ref} {...props} className={styles['search-input']} />;
  },
);

SearchInput.displayName = 'SearchInput';
