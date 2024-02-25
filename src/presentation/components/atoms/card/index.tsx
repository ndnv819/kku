import type {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@presentation/components/dynamic_tag_types';
import { forwardRef, type ReactNode } from 'react';

import styles from './styles.module.scss';

export interface _CardProps {
  children?: ReactNode;
}

type CardAllowedTags = 'div' | 'li';
export type CardProps<T extends CardAllowedTags = 'div'> =
  PolymorphicComponentProps<T, _CardProps>;

export const Card = forwardRef(
  <T extends CardAllowedTags = 'div'>(
    { as, children, ...props }: CardProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const Element = as ?? 'div';

    return (
      // @ts-ignore
      <Element ref={ref} {...props} className={styles['card-container']}>
        {children}
      </Element>
    );
  },
);

Card.displayName = 'Card';
