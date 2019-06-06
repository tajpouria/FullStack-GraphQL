const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require('graphql');

const UserType = require('./userType');

const User = require('../models/User');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: UserType,
      resolve() {
        return User.find({})
          .then(users => users)
          .catch(({ message }) => new Error(message));
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id)
          .then(user => user)
          .catch(({ message }) => new Error(message));
      },
    },
  },
});
