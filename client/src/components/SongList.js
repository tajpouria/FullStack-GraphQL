import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function SongList({ data }) {
  const renderSongs = songs => songs.map(({ id, title }) => (
    <li className="collection-item" key={id}>
      {title}
    </li>
  ));

  return (
    <div className="container">
      <NavLink to="/song/new">Create New Song</NavLink>
      {data.loading ? (
        <h4>loading...</h4>
      ) : (
        <ul className="collection">{renderSongs(data.songs)}</ul>
      )}
    </div>
  );
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
