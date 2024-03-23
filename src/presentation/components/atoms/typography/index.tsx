import type {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@presentation/components/dynamic_tag_types';
import classNames from 'classnames';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

type TypographyStatus =
  | 'primary'
  | 'basic'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';
export interface _TypographyProps {
  status?: TypographyStatus;
  category?: 's1' | 's2' | 'p1' | 'p2' | 'c1' | 'c2' | 'label';
}

type TypographyAllowedTags = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TypographyProps<T extends TypographyAllowedTags = 'p'> =
  PolymorphicComponentProps<T, _TypographyProps>;

export const Typography = forwardRef(
  <T extends TypographyAllowedTags = 'p'>(
    { as, category, status, ...props }: TypographyProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const Element = as ?? 'p';

    const statusStyles = {
      primary: 'text-primary-400',
      basic: 'text-basic-800',
      success: 'text-success-500',
      info: 'text-info-500',
      warning: 'text-warning-500',
      danger: 'text-danger-500',
    };

    const categoryStyles = {
      s1: styles['typo-subtitle1'],
      s2: styles['typo-subtitle2'],
      p1: styles['typo-paragraph1'],
      p2: styles['typo-paragraph2'],
      c1: styles['typo-caption1'],
      c2: styles['typo-caption2'],
      label: styles['typo-label'],
    };

    // @ts-ignore
    return (
      <Element
        ref={ref}
        className={classNames(
          status ? statusStyles[status] : null,
          category ? categoryStyles[category] : null,
        )}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';
