const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require('graphql');

const LyricType = require('./lyricType');
const SongType = require('./songType');

const Lyric = require('../models/lyric');
const Song = require('../models/song');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Song.findById(id)
          .then(song => song)
          .catch(({ message }) => new Error(message));
      },
    },

    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Lyric.findById(id)
          .then(lyric => lyric)
          .catch(({ message }) => new Error(message));
      },
    },
  }),
});
