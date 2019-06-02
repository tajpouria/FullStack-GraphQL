const {
  GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString,
} = require('graphql');

const Lyric = require('../models');

module.exports = new GraphQLObjectType({
  name: 'Lyric',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: require('./songType'),
      resolve({ id }) {
        return Lyric.findById(id)
          .populate('song')
          .then(({ song }) => song)
          .catch(({ message }) => new Error(message));
      },
    },
  }),
});
