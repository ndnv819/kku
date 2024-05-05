import { IcPaw } from '@presentation/components/atoms/icons/paw';

import type { BookmarkButtonProps } from './types';

export function BookmarkButton({ ...props }: BookmarkButtonProps): JSX.Element {
  return (
    <button type="button" {...props}>
      <IcPaw {...props} width={32} height={32} />
    </button>
  );
}
