import { gql } from 'apollo-boost';

const songsQuery = gql`
  {
    songs {
      id
      title
    }
  }
`;

const addSongQuery = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const deleteSongQuery = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

const findSongByIdQuery = gql`
  query FindSongById($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

const addLyricToSongQuery = gql`
  mutation AddLyricToSong($songId: ID!, $content: String!) {
    addLyricToSong(songId: $songId, content: $content) {
      id
    }
  }
`;

const likeLyricQuery = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export {
  likeLyricQuery,
  songsQuery,
  addSongQuery,
  deleteSongQuery,
  findSongByIdQuery,
  addLyricToSongQuery,
};
