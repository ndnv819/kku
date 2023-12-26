import { useQuery } from '@apollo/client';
import { GetShopsDocument, GetShopsQuery } from 'src/generated/graphql';

export default function Home() {
  const { data } = useQuery<GetShopsQuery>(GetShopsDocument);

  console.log(data);

  return (
    <div>
      <p>dasdas</p>
    </div>
  );
}
