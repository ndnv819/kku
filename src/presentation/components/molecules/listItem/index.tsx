/* eslint-disable simple-import-sort/imports */
import { useBookmark } from '@application/hooks/store/bookmark/use_bookmark';
import { Typography } from '@presentation/components/atoms/typography';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

import { useToast } from '@application/hooks/toast';
import { BookmarkButton } from '../bookmarkButton';
import type { ListItemProps } from './types';

export function ListItem({ shop }: ListItemProps): JSX.Element | null {
  const { addBookmark, deleteBookmark, isBookmarked } = useBookmark();
  const { data: session } = useSession();
  const { showInfo } = useToast();

  const onBookmarkClick = useCallback((): void => {
    if (!session) {
      showInfo('회원만 가능합니다.');
      return;
    }
    if (!shop) {
      return;
    }
    const is = isBookmarked(shop.id);
    if (!is) {
      addBookmark(shop);
      return;
    }
    deleteBookmark(shop.id);
  }, [session, shop]);

  if (!shop) {
    return null;
  }

  return (
    <>
      <Link href={`/shop/${shop.id}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <Typography as="h6">
              {shop.name.length >= 16
                ? `${shop.name.slice(0, 16)}..`
                : shop.name}
            </Typography>
            <Typography className="min-w-fit">{shop.category}</Typography>
          </div>
        </div>
        <Typography category="c1" className="mt-[4px] truncate">
          {shop.address}
        </Typography>
        {shop.imageUrls.length !== 0 && (
          <ul className="mt-[10px] flex items-center gap-[4px] overflow-y-hidden overflow-x-scroll">
            {shop.imageUrls.map((img, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index} className="h-[140px] min-w-[104px]">
                <Image
                  src={img}
                  alt="썸네일"
                  objectFit="cover"
                  width={104}
                  height={140}
                  className="h-[140px] rounded object-cover"
                />
              </li>
            ))}
          </ul>
        )}
      </Link>
      <BookmarkButton
        className="absolute right-[0] top-[12px] items-end p-[0]"
        onClick={onBookmarkClick}
        status={isBookmarked(shop.id) ? 'active' : 'inactive'}
      />
    </>
  );
}
