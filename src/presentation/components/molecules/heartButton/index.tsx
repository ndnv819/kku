import { Button } from '@presentation/components/atoms/button';
import { IcHeart } from '@presentation/components/atoms/icons/heart';
import { useCallback } from 'react';

import type { HeartButtonProps } from './types';

export function HeartButton({
  iconType,
  onClick,
  className,
  ...props
}: HeartButtonProps): JSX.Element {
  const handleOnClick = useCallback((): void => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <Button onClick={handleOnClick} className={className} {...props}>
      <IcHeart type={iconType} />
    </Button>
  );
}
