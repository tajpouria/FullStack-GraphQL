const {
  GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList,
} = require('graphql');

const Song = require('../models/song');
const LyricType = require('./lyricType');

module.exports = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: {
      type: GraphQLString,
    },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve({ id }) {
        return Song.findLyrics(id);
      },
    },
  }),
});
