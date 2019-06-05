import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { likeLyricQuery } from '../queries';

function LyricsLists({ song, mutate }) {
  return (
    <ul className="collection container">
      {!song || song.lyrics.length === 0 ? (
        <li className="collection-item">No lyric available yet!</li>
      ) : (
        song.lyrics.map(({ id, content, likes }) => (
          <li className="collection-item" key={id}>
            {content}
            <div className="right">
              <button
                className="waves-effect waves-teal btn-flat"
                type="button"
                onClick={() => mutate({
                  variables: { id },
                  optimisticResponse: {
                    __typename: 'Mutation',
                    likeLyric: {
                      // provided at preview from network tab
                      id,
                      __typename: 'LyricType',
                      likes: likes + 1,
                    },
                  },
                })
                }
              >
                <i className="material-icons ">thumb_up</i>
              </button>
              <span className="badge right">{likes}</span>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

LyricsLists.defaultProps = {
  song: null,
};

LyricsLists.propTypes = {
  song: PropTypes.object,
  mutate: PropTypes.func.isRequired,
};

export default graphql(likeLyricQuery)(LyricsLists);
