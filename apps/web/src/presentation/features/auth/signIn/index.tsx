/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@presentation/components/atoms/button';
import { Appbar } from '@presentation/components/organism/appbar';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useCallback } from 'react';

export function SignIn(): JSX.Element {
  const handleSignIn = useCallback(async (): Promise<void> => {
    await signIn('kakao', { callbackUrl: '/' });
  }, []);

  return (
    <>
      <Appbar>
        <Appbar.BackButton />
        <Appbar.Title title="로그인" />
        <Appbar.Dummy />
      </Appbar>
      <section className="flex h-[100vh] flex-col items-center justify-center">
        <Button onClick={handleSignIn} className="gap-[8px] bg-[#FEE500]">
          <Image
            src="/assets/icons/ic_kakao.svg"
            width={24}
            height={24}
            alt="kakao"
          />
          <p>카카오톡 간편 회원가입</p>
        </Button>
      </section>
    </>
  );
}
