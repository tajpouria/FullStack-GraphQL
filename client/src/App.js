import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SongList from './components/SongList';
import CreateSong from './components/CreateSong';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default function () {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={SongList} />
          <Route path="/songs/new" component={CreateSong} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
