const mongoose = require('mongoose');
const {
  GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList,
} = require('graphql');

const Lyric = mongoose.model('Lyric');
const LyricType = require('./lyricType');

module.exports = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    id: { type: GraphQLID },
    title: {
      type: GraphQLString,
    },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve({ id }) {
        return Lyric.findLyrics(id);
      },
    },
  }),
});
