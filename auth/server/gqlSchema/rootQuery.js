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
        console.log(req.user);
        // TARGET: return user from req
        // when user add to req?
      },
    },
  },
});

/*
GOAL: when user query assigned we should get back
 user from req if user is logged in

1. when login mutation assigned it should add user to req and keep that req


*/
