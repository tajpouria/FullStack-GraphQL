import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

function CreateSong({ mutate, history }) {
  const [title, setTitle] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();

    mutate({
      variables: {
        title,
      },
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

const mutation = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      title
    }
  }
`;

CreateSong.propTypes = {
  mutate: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default graphql(mutation)(CreateSong);
