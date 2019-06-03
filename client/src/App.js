import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

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
          <div className="container">
            <Link to="song/new">new</Link>
            <Route path="/" exact component={SongList} />
            <Route path="/song/new" component={SongList} />
          </div>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
