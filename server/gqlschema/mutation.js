const {
  GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString,
} = require('graphql');

const SongType = require('./songType');
const LyricType = require('./lyricType');

const Song = require('../models/song');
const Lyric = require('../models/lyric');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addSong: {
      type: SongType,
      args: { title: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parenValue, { title }) {
        return new Song({ title }).save();
      },
    },

    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        songId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parenValue, { songId, content }) {
        return Song.addLyric(songId, content);
      },
    },

    likeLyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parenValue, { id }) {
        Lyric.like(id)
          .then(lyric => lyric)
          .catch(({ message }) => new Error(message));
      },
    },

    deleteSong: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parenValue, { id }) {
        return Song.findByIdAndDelete(id)
          .then(song => song)
          .catch(({ message }) => new Error(message));
      },
    },
  }),
});
