import { Button } from '@presentation/components/atoms/button';
import { IcChevronLeft } from '@presentation/components/atoms/icons/chevronLeft';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import type { BackButtonProps } from './types';

export function BackButton({
  iconColor,
  ...props
}: BackButtonProps): JSX.Element {
  const router = useRouter();

  const toBack = useCallback((): void => {
    router.back();
  }, []);

  return (
    <Button onClick={toBack} {...props} className="p-[0]">
      <IcChevronLeft color={iconColor} />
    </Button>
  );
}
