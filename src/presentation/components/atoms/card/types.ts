import type { PolymorphicComponentProps } from '@presentation/components/dynamic_tag_types';
import type { ElementType, ReactNode } from 'react';

export interface _CardProps {
  children?: ReactNode;
}

export type CardProps<T extends ElementType> = PolymorphicComponentProps<
  T,
  _CardProps
>;
