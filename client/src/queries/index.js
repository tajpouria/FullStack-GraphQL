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
      title
    }
  }
`;

const deleteSongQuery = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      title
    }
  }
`;

export { songsQuery, addSongQuery, deleteSongQuery };
