import { ShopCategoryEnum } from '@application/hooks/api/shop/enums';
import { useShopFilterCategory } from '@application/hooks/logics/shopFilter/use_shop_filter_category';
import { useShopFilterStaus } from '@application/hooks/logics/shopFilter/use_shop_filter_status';
import { useChangeView } from '@application/hooks/logics/view/use_change_view';
import { FilterButton } from '@presentation/components/molecules/filterButton';
import { EmptyView } from '@presentation/components/organism/emptyView';
import { ListView } from '@presentation/components/organism/listView';
import { MapView } from '@presentation/components/organism/mapView';
import { useEffect } from 'react';

import styles from './styles.module.scss';
import type { ShopViewProps } from './types';

export function ShopView({ lat, lng, shops }: ShopViewProps): JSX.Element {
  const { isMapView, changeView } = useChangeView();
  const { status, changeStatus } = useShopFilterStaus();
  const { category, changeCategory } = useShopFilterCategory();

  useEffect(() => {
    console.log('shops', shops);
  }, [shops]);

  if (!shops) {
    return <EmptyView title="가게 정보를 찾을 수 없습니다." />;
  }

  return (
    <section className={styles['view-wrapper']}>
      <div className="flex gap-[12px] p-[0] px-[16px] pb-[12px]">
        <FilterButton onClick={changeView} isChecked>
          {isMapView ? '리스트 보기' : '지도 보기'}
        </FilterButton>
        <FilterButton onClick={changeStatus} isChecked>
          {status ? '영업 중' : '전체'}
        </FilterButton>
        <FilterButton
          onClick={() => changeCategory(ShopCategoryEnum.CAFE)}
          isChecked={category === ShopCategoryEnum.CAFE}
        >
          ☕️ 카페
        </FilterButton>
        <FilterButton
          onClick={() => changeCategory(ShopCategoryEnum.RESTAURANT)}
          isChecked={category === ShopCategoryEnum.RESTAURANT}
        >
          🍚 식당
        </FilterButton>
      </div>
      <div className={styles['view-map-wrapper']}>
        {isMapView ? (
          <MapView lat={lat!} lng={lng!} shops={shops} />
        ) : (
          <ListView shops={shops} />
        )}
      </div>
    </section>
  );
}
