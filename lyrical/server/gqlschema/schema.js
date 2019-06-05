const { GraphQLSchema } = require('graphql');

const Mutation = require('./mutation');
const RootQuery = require('./rootQuery');

module.exports = new GraphQLSchema({
  mutation: Mutation,
  query: RootQuery,
});
