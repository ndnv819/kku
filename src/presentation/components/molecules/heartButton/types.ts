import type { ButtonHTMLAttributes } from 'react';

type IcHeartType = 'filled' | 'outlined';

export interface HeartButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconType: IcHeartType;
}
