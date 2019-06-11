const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const userType = require('./userType');

const { signup, login } = require('../services/localAuth');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signUp: {
      type: userType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { email, password }, req) {
        return signup({ email, password, req });
      },
    },

    login: {
      type: userType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { email, password }, req) {
        return login({ email, password, req });
      },
    },

    logout: {
      type: userType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      },
    },
  },
});
