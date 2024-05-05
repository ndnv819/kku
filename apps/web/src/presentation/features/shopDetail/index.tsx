/* eslint-disable simple-import-sort/imports */
/* eslint-disable react/no-array-index-key */
import { useBookmark } from '@application/hooks/store/bookmark/use_bookmark';
import { useToast } from '@application/hooks/toast';
import { Button } from '@presentation/components/atoms/button';
import { IcMarker } from '@presentation/components/atoms/icons/marker';
import { Typography } from '@presentation/components/atoms/typography';
import { Appbar } from '@presentation/components/organism/appbar';
import { EmptyView } from '@presentation/components/organism/emptyView';
import { LoadingView } from '@presentation/components/organism/loadingView';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import type { IcPawStates } from '@presentation/components/atoms/icons/paw/types';
import { ShopDetailMapView } from './detailMapView';
import type { ShopDetailProps } from './types';

export function ShopDetail({
  shop,
  isLoading,
  isFetching,
}: ShopDetailProps): JSX.Element | null {
  const { toggleBookmark, bookmarkList, isBookmarked } = useBookmark();
  const [showShopDetailMap, setShowShopDetailMap] = useState<boolean>(false);
  const { data: session } = useSession();
  const { showInfo } = useToast();

  const changeDetailView = useCallback((): void => {
    setShowShopDetailMap((prev) => !prev);
  }, []);

  const onBookmarkClick = useCallback(() => {
    if (!session) {
      showInfo('꾹마크는 로그인 후에 사용할 수 있어요!');
      return;
    }
    if (!shop) {
      return;
    }
    toggleBookmark(shop);
  }, [session, shop, bookmarkList]);

  const setBookmarkStates = useMemo((): IcPawStates => {
    if (!session) {
      return 'inactive';
    }
    if (!shop) {
      return 'inactive';
    }
    return isBookmarked(shop.id) ? 'active' : 'inactive';
  }, [session, shop, bookmarkList]);

  if (isLoading || isFetching) {
    return <LoadingView />;
  }
  if (!shop) {
    return <EmptyView title="가게 정보를 불러오는 데 실패했어요." />;
  }
  return showShopDetailMap ? (
    <ShopDetailMapView shop={shop} changeDetailView={changeDetailView} />
  ) : (
    <>
      <Appbar>
        <Appbar.BackButton />
        <Appbar.BookmarkButton
          className="p-[0]"
          onClick={onBookmarkClick}
          states={setBookmarkStates}
        />
      </Appbar>
      <section className="px-[16px] pb-[20px] pt-for-appbar">
        <div className="flex flex-wrap items-center gap-[8px]">
          <Typography as="h5">{shop?.name}</Typography>
          <Typography>{shop?.category}</Typography>
        </div>
        <div className="flex items-center gap-[4px]">
          <Button
            sizes="tiny"
            appearances="ghost"
            onClick={changeDetailView}
            className="w-full px-[0] py-[4px]"
          >
            <IcMarker width={16} height={16} type="filled" />
            <Typography category="p2">{shop?.address}</Typography>
          </Button>
        </div>
        {shop.imageUrls.length !== 0 && (
          <ul className="mt-[4px] flex items-center gap-[4px] overflow-x-scroll">
            {shop.imageUrls.map((img, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index} className="h-[200px] min-w-[200px]">
                <Image
                  src={img}
                  alt="썸네일"
                  objectFit="cover"
                  width={200}
                  height={200}
                  className="h-[200px] rounded object-cover"
                />
              </li>
            ))}
          </ul>
        )}
        <Typography as="h6" className="mb-[8px] mt-[36px]">
          영업시간
        </Typography>
        <Typography style={{ whiteSpace: 'pre-line' }}>
          {shop?.openingTime}
        </Typography>
        <Typography as="h6" className="mb-[8px] mt-[36px]">
          기본정보
        </Typography>
        <div className="flex gap-[8px]">
          <ul className="flex flex-col leading-[160%]">
            <li>tel</li>
            <li>sns</li>
            <li>feat</li>
          </ul>
          <ul className="flex flex-col leading-[160%]">
            <li>
              <a href="tel:{shop.tel}">{shop.tel}</a>
            </li>
            <li>
              {shop.instagramLink ? (
                <Link href={shop.instagramLink} target="_blank">
                  인스타그램
                </Link>
              ) : (
                '정보없음'
              )}
            </li>
            <li>{shop.memo}</li>
          </ul>
        </div>
        <Typography as="h6" className="mb-[8px] mt-[36px]">
          메인 메뉴
        </Typography>
        <div className="flex justify-between">
          <ul className="flex flex-col leading-[160%]">
            {shop.menuList.map((m, index) => (
              <li key={index}>{m.name}</li>
            ))}
          </ul>
          <ul className="flex flex-col text-right leading-[160%]">
            {shop.menuList.map((m, index) => (
              <li key={index}>{m.price}</li>
            ))}
          </ul>
        </div>
        <Typography as="h6" className="mb-[8px] mt-[36px]">
          주차 정보
        </Typography>
        <Typography>{shop.canParking ? '주차 가능' : '주차 불가'}</Typography>
        <Typography as="h6" className="mb-[8px] mt-[36px]">
          블로그 리뷰
        </Typography>
        <ul className="flex flex-col divide-y">
          {shop.reviewList.map((r, index) => (
            <li key={index} className="py-[16px]">
              <Link href={r.postLink} target="_blank">
                <Typography>{r.postTitle}</Typography>
                <Typography className="mt-[6px] text-[13px] leading-[20px] text-slate-500">
                  {r.postContentSnippet}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
