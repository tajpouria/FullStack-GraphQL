import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

function SongList({ data }) {
  const renderSongs = songs => songs.map(({ id, title }) => (
    <li className="collection-item" key={id}>
      {title}
    </li>
  ));

  if (data.loading) return <div>Loading...</div>;
  return <ul className="collection">{renderSongs(data.songs)}</ul>;
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

SongList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(query)(SongList);
