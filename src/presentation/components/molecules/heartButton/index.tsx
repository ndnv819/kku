import { Button } from '@presentation/components/atoms/button';
import { IcHeart } from '@presentation/components/atoms/icons/heart';

import type { HeartButtonProps } from './types';

export function HeartButton({
  iconType,
  ...props
}: HeartButtonProps): JSX.Element {
  return (
    <Button className="p-[0]" type="button" {...props}>
      <IcHeart type={iconType} />
    </Button>
  );
}
