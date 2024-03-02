import { Typography } from '@presentation/components/atoms/typography';
import Link from 'next/link';

import styles from './styles.module.scss';
import type { ListItemProps } from './types';

export function ListItem({
  id,
  name,
  category,
  address,
}: ListItemProps): JSX.Element {
  return (
    <li className={styles['item-wrapper']}>
      <Link href={`/shop/${id}`}>
        <div className="flex items-center gap-[8px]">
          <Typography as="h6">{name}</Typography>
          <Typography className="basic-800">{category}</Typography>
        </div>
        <Typography category="c1">{address}</Typography>
      </Link>
    </li>
  );
}
