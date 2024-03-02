import { Appbar } from '@presentation/components/organism/appbar';
import { BottomNavigation } from '@presentation/components/organism/bottomNavigation';

import { SearchResult } from './result';

export function Search(): JSX.Element {
  return (
    <>
      <Appbar>
        <Appbar.SearchInput placeholder="검색어를 입력해주세요." />
      </Appbar>
      <section className="px-[16px] pt-[64px]">
        <SearchResult />
      </section>
      <BottomNavigation />
    </>
  );
}
