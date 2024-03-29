/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable simple-import-sort/imports */
import { Button } from '@presentation/components/atoms/button';
import { Typography } from '@presentation/components/atoms/typography';
import { Appbar } from '@presentation/components/organism/appbar';
import { LoadingView } from '@presentation/components/organism/loadingView';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

export function My(): JSX.Element {
  const { data: session } = useSession();

  const onSignOutClick = useCallback((): void => {
    signOut({ callbackUrl: '/' });
  }, []);

  if (!session) {
    return <LoadingView />;
  }

  return (
    <>
      <Appbar>
        <Appbar.BackButton />
        <Appbar.Title title="MY" />
        <Appbar.Dummy />
      </Appbar>
      <section className="px-[16px] pt-for-appbar">
        <div className="flex items-center gap-[6px]">
          <Image
            alt="profile"
            src={session.user!.image!}
            width={40}
            height={40}
            className="rounded-full"
          />
          <Typography as="h6">{session.user!.name}</Typography>
        </div>
        <ul className="mt-[20px] flex flex-col divide-y">
          <li className="py-[16px]">
            <Link href="/bookmark">
              <ul className="flex items-center gap-[10px]">
                <li>
                  <Image
                    src="/assets/images/3d/3d_paw.png"
                    width={24}
                    height={24}
                    alt="paw"
                  />
                </li>
                <li>꾹마크</li>
              </ul>
            </Link>
          </li>
          <li className="py-[16px]">
            <Button
              onClick={onSignOutClick}
              appearances="ghost"
              status="basic"
              className="gap-[10px] p-0"
            >
              <Image
                src="/assets/images/3d/3d_waving_hand.png"
                width={24}
                height={24}
                alt="waving hand"
              />
              로그아웃
            </Button>
          </li>
        </ul>
      </section>
    </>
  );
}
