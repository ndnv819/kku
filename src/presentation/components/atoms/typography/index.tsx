import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@presentation/components/dynamic_tag_types';
import classNames from 'classnames';
import { forwardRef } from 'react';

type TypographyType = 'primary' | 'secondary' | 'neutral';
export interface _TypographyProps {
  type?: TypographyType;
}

type TypographyAllowedTags = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TypographyProps<T extends TypographyAllowedTags = 'p'> =
  PolymorphicComponentProps<T, _TypographyProps>;

export const Typography = forwardRef(
  <T extends TypographyAllowedTags = 'p'>(
    { as, type, ...props }: TypographyProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const Element = as ?? 'p';
    const className = classNames({
      'text-primary-500': type === 'primary',
      'text-secondary-500': type === 'secondary',
      'text-neutral-500': type === 'neutral',
    });

    // @ts-ignore
    return <Element ref={ref} className={className} {...props} />;
  },
);

Typography.displayName = 'Typography';
