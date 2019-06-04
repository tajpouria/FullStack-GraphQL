import React from 'react';
import PropTypes from 'prop-types';

export default function LyricsLists({ song }) {
  return (
    <ul className="collection">
      {!song || song.lyrics.length === 0 ? (
        <li className="collection-item">No lyric available yet!</li>
      ) : (
        song.lyrics.map(({ id, content }) => (
          <li className="collection-item" key={id}>
            {content}
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
};
