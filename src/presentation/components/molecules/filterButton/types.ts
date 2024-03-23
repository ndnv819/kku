import type { ButtonHTMLAttributes } from 'react';

export interface FilterButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked?: boolean;
}
