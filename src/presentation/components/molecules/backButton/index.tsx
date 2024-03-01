import { Button } from '@presentation/components/atoms/button';
import { IcChevronLeft } from '@presentation/components/atoms/icons/chevronLeft';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function BackButton(): JSX.Element {
  const router = useRouter();

  const toBack = useCallback((): void => {
    router.back();
  }, []);

  return (
    <Button onClick={toBack}>
      <IcChevronLeft color="white" />
    </Button>
  );
}
