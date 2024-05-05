import { Typography } from '@presentation/components/atoms/typography';
import classNames from 'classnames';

import type { EmptyViewProps } from './types';

export function EmptyView({ title, ...props }: EmptyViewProps): JSX.Element {
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        'flex justify-center items-center ',
      )}
    >
      <Typography>{title}</Typography>
    </div>
  );
}
