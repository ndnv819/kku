import { getColor } from '@application/helpers/scss/get_colors';
import classNames from 'classnames';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

type ButtonStatus =
  | 'basic'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';
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
    // style 변수 위치
    const className = classNames(style, {
      [styles.tiny as any]: sizes === 'tiny',
      [styles.small as any]: sizes === 'small',
      [styles.medium as any]: sizes === 'medium',
      [styles.large as any]: sizes === 'large',
      [styles.giant as any]: sizes === 'giant',
    });

    return (
      // @ts-ignore
      <Element ref={ref} className={className} {...props}>
        {children}
      </Element>
    );
  },
);

Button.displayName = 'Button';
