import { useShopFilterCategory } from '@application/hooks/logics/shopFilter/use_shop_filter_category';
import { useShopFilterStaus } from '@application/hooks/logics/shopFilter/use_shop_filter_status';
import { useBookmark } from '@application/hooks/store/bookmark/use_bookmark';
import { useLocation } from '@application/hooks/store/location/use_location';
import { Typography } from '@presentation/components/atoms/typography';
import { Appbar } from '@presentation/components/organism/appbar';
import { ShopView } from '@presentation/components/templates/shopView';
import classNames from 'classnames';

import styles from './styles.module.scss';

export function Bookmark(): JSX.Element {
  const { locationState } = useLocation();
  const { bookmarkList, filteredBookmarkList } = useBookmark();
  const { status } = useShopFilterStaus();
  const { category } = useShopFilterCategory();

  return (
    <>
      <Appbar>
        <Appbar.BackButton />
        <Appbar.Title title="북마크" />
        <Appbar.Dummy />
      </Appbar>
      <section
        className={classNames(
          styles['bookmark-wrapper'],
          bookmarkList.length === 0 && 'justify-center items-center',
        )}
      >
        {!bookmarkList || bookmarkList.length === 0 ? (
          <Typography>아직 북마크한 가게가 없어요!</Typography>
        ) : (
          <ShopView
            lat={locationState.lat}
            lng={locationState.lng}
            shops={filteredBookmarkList(status, category)}
          />
        )}
      </section>
    </>
  );
}
