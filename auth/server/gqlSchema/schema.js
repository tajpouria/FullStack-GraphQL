const { GraphQLSchema } = require('graphql');

const query = require('./rootQuery');
const mutation = require('./mutation');

module.exports = new GraphQLSchema({ mutation, query });
