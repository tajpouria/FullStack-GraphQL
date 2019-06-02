import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

function SongList(props) {
  console.log(props);
  return <div>songs</div>;
}

const query = gql`
  {
    songs {
      title
    }
  }
`;

export default graphql(query)(SongList);
