import { useQuery } from '@apollo/client';
import { Button } from '@presentation/components/atoms/button';
import { NaverMap } from '@presentation/components/atoms/naverMap';
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
      <Typography category="c1">카테고리</Typography>
      <Button status="success" appearances="outline" sizes="large">
        CLICK
      </Button>
      <Button onClick={onChangeTheme}>DEfault</Button>
      <Button>
        <div>🏠</div>
        <p>With icon</p>
      </Button>
      <NaverMap />
    </div>
  );
}
