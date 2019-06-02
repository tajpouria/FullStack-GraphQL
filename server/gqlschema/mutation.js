const mongoose = require('mongoose');
const {
  GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString,
} = require('graphql');

const SongType = require('./songType');
const LyricType = require('./lyricType');

const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');

module.exports = new GraphQLObjectType({
  type: 'Mutation',
  fields: () => ({
    addSong: {
      type: SongType,
      args: { title: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parenValue, { title }) {
        return Song.collection
          .insertOne({ title })
          .then(song => song)
          .catch(({ message }) => new Error(message));
      },
    },

    addLyricToSong: {
      type: SongType,
      args: {
        content: new GraphQLNonNull(GraphQLString),
        songId: new GraphQLNonNull(GraphQLID),
      },
      resolve(parenValue, { songId, content }) {
        return Song.addLyric({ songId, content })
          .then(song => song.lyrics)
          .catch(({ message }) => new Error(message));
      },
    },

    likeLyric: {
      type: LyricType,
      args: { id: new GraphQLNonNull(GraphQLID) },
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
