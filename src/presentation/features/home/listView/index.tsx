import { ListItem } from '@presentation/components/molecules/listItem';

import type { ListViewProps } from './types';

export function ListView({ shops }: ListViewProps): JSX.Element | null {
  if (!shops) {
    return null;
  }

  return (
    <ul className="px-[16px]">
      {shops.map((shop) => {
        return (
          <ListItem
            key={shop.id}
            id={shop.id}
            name={shop.name}
            category={shop.category}
            address={shop.address}
          />
        );
      })}
    </ul>
  );
}
