const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');

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

    lyrics: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Lyric.findById(id)
          .then(lyric => lyric)
          .catch(({ message }) => new Error(message));
      },
    },
  }),
});
