import { Search } from '@presentation/features/search';
import { BaseLayout } from '@presentation/layouts/base';
import type { NextPage } from 'next';

const SearchPage: NextPage = () => {
  return (
    <BaseLayout>
      <Search />
    </BaseLayout>
  );
};

export default SearchPage;
