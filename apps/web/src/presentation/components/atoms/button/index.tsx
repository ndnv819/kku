import { getColor } from '@application/helpers/scss/get_colors';
import classNames from 'classnames';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

type ButtonStatus = 'basic' | 'primary' | 'success' | 'info' | 'danger';
type ButtonAppearances = 'filled' | 'outline' | 'ghost';
type ButtonSizes = 'tiny' | 'small' | 'medium' | 'large' | 'giant';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status?: ButtonStatus;
  appearances?: ButtonAppearances;
  sizes?: ButtonSizes;
  children?: ReactNode;
}

export const Button = forwardRef(
  (
    {
      status = 'primary',
      appearances = 'filled',
      sizes = 'medium',
      children,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    const Element = 'button';

    const style = getColor(status, appearances);

    const sizesStyle = {
      tiny: styles.tiny,
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
      giant: styles.giant,
    };

    const className = classNames(sizesStyle[sizes], style, props.className);

    return (
      // @ts-ignore
      <Element ref={ref} className={className} {...props}>
        {children}
      </Element>
    );
  },
);

Button.displayName = 'Button';
