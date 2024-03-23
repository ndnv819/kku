import { ListItem } from '@presentation/components/molecules/listItem';

import type { ListViewProps } from './types';

export function ListView({ shops }: ListViewProps): JSX.Element {
  return (
    <ul className="divide-y px-[16px]">
      {shops!.map((shop) => {
        return (
          <li key={shop!.id} className="relative p-base-layout">
            <ListItem shop={shop} />
          </li>
        );
      })}
    </ul>
  );
}
