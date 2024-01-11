import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@presentation/components/dynamic_tag_types';
import classNames from 'classnames';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

type TypographyStatus =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';
type TypographyCategory = 's1' | 's2' | 'p1' | 'p2' | 'c1' | 'c2' | 'label';
export interface _TypographyProps {
  status?: TypographyStatus;
  category?: TypographyCategory;
}

type TypographyAllowedTags = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TypographyProps<T extends TypographyAllowedTags = 'p'> =
  PolymorphicComponentProps<T, _TypographyProps>;

export const Typography = forwardRef(
  <T extends TypographyAllowedTags = 'p'>(
    { as, status, category, ...props }: TypographyProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const Element = as ?? 'p';
    const className = classNames({
      'text-primary-500': status === 'primary',
      'text-secondary-500': status === 'secondary',
      'text-neutral-500': status === 'neutral',
      'text-success-500': status === 'success',
      'text-info-500': status === 'info',
      'text-warning-500': status === 'warning',
      'text-danger-500': status === 'danger',
      [styles.subtitle1]: category === 's1',
      [styles.subtitle2]: category === 's2',
      [styles.paragraph1]: category === 'p1',
      [styles.paragraph2]: category === 'p2',
      [styles.caption1]: category === 'c1',
      [styles.caption2]: category === 'c2',
      [styles.label]: category === 'label',
    });

    // @ts-ignore
    return <Element ref={ref} className={className} {...props} />;
  },
);

Typography.displayName = 'Typography';
