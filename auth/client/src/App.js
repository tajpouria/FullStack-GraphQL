import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:3000/',
});

const client = new ApolloClient({
  cache,
  link,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <Route />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
