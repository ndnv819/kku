/* eslint-disable simple-import-sort/imports */
import { useBookmark } from '@application/hooks/store/bookmark/use_bookmark';
import { Typography } from '@presentation/components/atoms/typography';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

import { useToast } from '@application/hooks/toast';
import { HeartButton } from '../heartButton';
import type { ListItemProps } from './types';

export function ListItem({ shop }: ListItemProps): JSX.Element | null {
  const { addBookmark, deleteBookmark, isBookmarked } = useBookmark();
  const { data: session } = useSession();
  const { showInfo } = useToast();

  const toggleBookmark = useCallback((): void => {
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
  }, [shop, isBookmarked, addBookmark, deleteBookmark]);

  if (!shop) {
    return null;
  }

  return (
    <>
      <Link href={`/shop/${shop.id}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <Typography as="h6">{shop.name}</Typography>
            <Typography>{shop.category}</Typography>
          </div>
        </div>
        <Typography category="c1" className="mt-[4px] truncate">
          {shop.address}
        </Typography>
        <ul className="flex items-center gap-[2px]">
          {shop.imageUrls.map((img, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <Image src={img} width={104} height={140} alt="썸네일" />
            </li>
          ))}
        </ul>
      </Link>
      <HeartButton
        className="absolute right-0 top-0 items-end"
        onClick={toggleBookmark}
        iconType={isBookmarked(shop.id) ? 'filled' : 'outlined'}
      />
    </>
  );
}
