import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { songsQuery, addSongQuery } from '../queries';

function CreateSong({ mutate, history }) {
  const [title, setTitle] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();

    mutate({
      variables: {
        title,
      },
      refetchQueries: [{ query: songsQuery }],
    }).then(() => history.push('/'));
  }

  return (
    <div className="container">
      <a href="/">Back</a>
      <h4>Create New Song</h4>
      <form onSubmit={() => handleFormSubmit(event)}>
        <label htmlFor="title">
          SongTitle:
          <input type="text" value={title} onChange={({ target: { value } }) => setTitle(value)} />
        </label>
      </form>
    </div>
  );
}

CreateSong.propTypes = {
  mutate: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default graphql(addSongQuery)(CreateSong);
