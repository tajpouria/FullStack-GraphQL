const { GraphQLObjectType, GraphQLList } = require('graphql');

const UserType = require('./userType');

const User = require('../models/User');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({})
          .then(users => users)
          .catch(({ message }) => new Error(message));
      },
    },
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
  },
});
