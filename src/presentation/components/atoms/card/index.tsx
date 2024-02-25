import type { PolymorphicRef } from '@presentation/components/dynamic_tag_types';
import type { ElementType } from 'react';
import { forwardRef } from 'react';

import styles from './styles.module.scss';
import type { CardProps } from './types';

export const Card = forwardRef(
  <T extends ElementType>(
    { as, children, ...props }: CardProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const Element = as ?? 'div';

    return (
      <Element ref={ref} {...props} className={styles['card-container']}>
        {children}
      </Element>
    );
  },
);

Card.displayName = 'Card';
