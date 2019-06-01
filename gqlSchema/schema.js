const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');
const axios = require('axios');

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    desc: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios(
          `http://localhost:3000/companies/${parentValue.id}/users`
        ).then(({ data }) => data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios({
          url: `http://localhost:3000/companies/${parentValue.companyId}`,
          headers: { 'Content-Type': 'application/json' }
        })
          .then(({ data }) => data)
          .catch(({ message }) => new Error(message));
      }
    }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios({
          url: `http://localhost:3000/users/${args.id}`,
          headers: { 'Content-Type': 'application/json' }
        })
          .then(({ data }) => data)
          .catch(({ message }) => new Error(message));
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios({
          url: `http://localhost:3000/companies/${args.id}`,
          headers: { 'Content-Type': 'application/json' }
        }).then(({ data }) => data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType
});
