/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { sendError } from '@infrastructure/logger';

export const errorLink: ApolloLink = onError(
  ({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        sendError(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) {
      sendError(
        `[Network error]: ${networkError ? JSON.stringify(networkError) : ''}`,
      );
    }
  },
);

export const httpLink: ApolloLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
});

console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`);
