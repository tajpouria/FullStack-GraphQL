const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const userType = require('./userType');

const User = require('../models/User');

const { loginPromise } = require('../services/localAuth');

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
        return new User({ email, password })
          .save()
          .then(user => user)
          .catch(err => new Error(err));
      },
    },

    login: {
      type: userType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { email, password }) {
        return loginPromise(email, password);
      },
    },
  },
});