import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@presentation/components/dynamic_tag_types';
import classNames from 'classnames';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

type TypographyStatus = 'primary' | 'success' | 'info' | 'warning' | 'danger';
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
    const className = classNames({
      'text-primary-500': status === 'primary',
      'text-success-500': status === 'success',
      'text-info-500': status === 'info',
      'text-warning-500': status === 'warning',
      'text-danger-500': status === 'danger',
      [styles['typo-subtitle1'] as any]: category === 's1',
      [styles['typo-subtitle2'] as any]: category === 's2',
      [styles['typo-paragraph1'] as any]: category === 'p1',
      [styles['typo-paragraph2'] as any]: category === 'p2',
      [styles['typo-caption1'] as any]: category === 'c1',
      [styles['typo-caption2'] as any]: category === 'c2',
      [styles['typo-label'] as any]: category === 'label',
    });

    // @ts-ignore
    return <Element ref={ref} className={className} {...props} />;
  },
);

Typography.displayName = 'Typography';
