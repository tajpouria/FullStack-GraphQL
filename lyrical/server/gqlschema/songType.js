const {
  GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList,
} = require('graphql');

const Song = require('../models/song');

module.exports = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: {
      type: GraphQLString,
    },
    lyrics: {
      type: new GraphQLList(require('./lyricType')),
      resolve({ id }) {
        return Song.findLyrics(id);
      },
    },
  }),
});
