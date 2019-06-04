import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { songsQuery } from '../queries';
import DeleteButton from './DeleteButton';

function SongList({ data }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(data.songs);
  });

  const renderSongs = () => songs.map(({ id, title }) => (
    <li className="collection-item" key={id}>
      <NavLink to={`/songs/${id}`}>{title}</NavLink>
      <DeleteButton id={id} />
    </li>
  ));

  return (
    <div className="container">
      {data.loading || !songs ? (
        <h4>loading...</h4>
      ) : (
        <ul className="collection">{renderSongs()}</ul>
      )}
      <NavLink className="btn-floating btn-large green right" to="/songs/new">
        <i className="material-icon">add</i>
      </NavLink>
    </div>
  );
}

SongList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(songsQuery)(SongList);
