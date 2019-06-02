import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import SongList from './components/SongList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  fetchOptions: {
    mode: 'no-cors',
  },
});

export default function () {
  return (
    <ApolloProvider client={client}>
      <SongList />
    </ApolloProvider>
  );
}
