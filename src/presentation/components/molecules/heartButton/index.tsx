import { Button } from '@presentation/components/atoms/button';
import { IcHeart } from '@presentation/components/atoms/icons/heart';
import { useCallback } from 'react';

import type { HeartButtonProps } from './types';

export function HeartButton({ onClick }: HeartButtonProps): JSX.Element {
  const handleOnClick = useCallback((): void => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <Button onClick={handleOnClick}>
      <IcHeart />
    </Button>
  );
}
