import { Button } from '@presentation/components/atoms/button';
import classNames from 'classnames';

import styles from './styles.module.scss';
import type { FilterButtonProps } from './types';

export function FilterButton({
  isChecked = false,
  ...props
}: FilterButtonProps): JSX.Element {
  return (
    <Button
      className={classNames(
        isChecked && 'border border-solid border-basic-600',
        styles['filter-button'],
      )}
      {...props}
    />
  );
}
