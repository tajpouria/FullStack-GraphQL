import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Form from './components/Form';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql', credentials: 'same-origin' }),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Form screen="signup" />
        <Switch>
          <Route />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
