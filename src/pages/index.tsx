import { gql, useQuery } from '@apollo/client';

const querySyntax = gql`
  query MyQuery {
    shops {
      id
    }
  }
`;

export default function Home() {
  const { data } = useQuery(querySyntax);

  console.log(data);

  return (
    <div>
      <p>dasdas</p>
    </div>
  );
}
