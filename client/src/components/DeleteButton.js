import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { deleteSongQuery, songsQuery } from '../queries';

function DeleteButton({ id, mutate }) {
  return (
    <button
      type="button"
      onClick={() => mutate({
        variables: { id },
        refetchQueries: [{ query: songsQuery }],
      })
      }
      className="right red"
    >
      X
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default graphql(deleteSongQuery)(DeleteButton);
