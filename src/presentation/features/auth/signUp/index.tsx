/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@presentation/components/atoms/button';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

export function SignUp(): JSX.Element {
  const handleSignUp = useCallback(async (): Promise<void> => {
    await signIn('kakao');
  }, []);

  return (
    <section>
      <Button onClick={handleSignUp}>카카오톡 간편 회원가입</Button>
    </section>
  );
}
