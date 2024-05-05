import { Typography } from '@presentation/components/atoms/typography';

import type { AppbarTitleProps } from './types';

export function AppbarTitle({ title }: AppbarTitleProps): JSX.Element {
  return <Typography>{title}</Typography>;
}
