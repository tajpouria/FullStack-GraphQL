//## SectionOne (on the graphQL)

// 1. graphQL server setup

// yarn add express express-graphql graphql
// ./server.js
const expressGraphQL = require('express-graphql');

app.use('/graphql', expressGraphQL({ graphiql: true }));

// schema/schema.js

const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: User,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {}
    }
  }
});
