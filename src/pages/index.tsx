import { useQuery } from '@apollo/client';
import { Typography } from '@presentation/components/atoms/typography';
import { useCallback } from 'react';
import { GetShopsDocument, GetShopsQuery } from 'src/generated/graphql';

export default function Home() {
  const { data } = useQuery<GetShopsQuery>(GetShopsDocument);

  const onChangeTheme = useCallback((): void => {
    document.documentElement.classList.toggle('dark');
  }, []);

  return (
    <div>
      <p>텍스트 테스트</p>
      <Typography as="h1" category="s1" status="danger">
        Text
      </Typography>
      <button type="button" onClick={onChangeTheme}>
        Change Theme
      </button>
    </div>
  );
}
