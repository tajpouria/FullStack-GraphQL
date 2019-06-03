import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function SongList({ data }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(data.songs);
  });

  const renderSongs = () => songs.map(({ id, title }) => (
    <li className="collection-item" key={id}>
      {title}
    </li>
  ));

  return (
    <div className="container">
      {data.loading || !songs ? (
        <h4>loading...</h4>
      ) : (
        <ul className="collection">{renderSongs()}</ul>
      )}
      <NavLink className="btn-floating btn-large red right" to="/songs/new">
        <i className="material-icon">add</i>
      </NavLink>
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
