import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { findSongByIdQuery, addLyricToSongQuery } from '../queries';

function SongDetails({ data, mutate, match: { params } }) {
  const { loading, song } = data;

  const [content, setContent] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();

    mutate({ variables: { songId: params.id, content } }).then(() => setContent(''));
  }

  return (
    <div className="container">
      <NavLink to="/">Back</NavLink>
      {loading ? <h3>Loading...</h3> : <h3>{song.title}</h3>}
      <form onSubmit={() => handleFormSubmit(event)}>
        <label htmlFor="addLyric">
          Add Lyric:
          <input value={content} onChange={({ target: { value } }) => setContent(value)} />
        </label>
      </form>
    </div>
  );
}

SongDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default compose(
  graphql(findSongByIdQuery, {
    options: ({ match }) => ({ variables: { id: match.params.id } }),
  }),
  graphql(addLyricToSongQuery),
)(SongDetails);
