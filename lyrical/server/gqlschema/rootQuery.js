const {
  GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull,
} = require('graphql');

const LyricType = require('./lyricType');
const SongType = require('./songType');

const Lyric = require('../models/lyric');
const Song = require('../models/song');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find().catch(({ message }) => new Error(message));
      },
    },

    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Song.findById(id);
      },
    },
  }),
});
