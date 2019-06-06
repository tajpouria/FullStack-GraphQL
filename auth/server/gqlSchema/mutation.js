const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const userType = require('./userType');

const User = require('../models/User');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signUp: {
      type: userType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { email, password }) {
        new User({ email, password })
          .save()
          .then(user => user)
          .catch(({ message }) => new Error(message));
      },
    },
  },
});
