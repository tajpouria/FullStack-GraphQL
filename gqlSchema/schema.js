const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
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

const RootQuery = new GraphQLObjectType({
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { name, age, companyId }) {
        return axios({
          url: 'http://localhost:3000/users',
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          data: { name, age, companyId }
        })
          .then(({ data }) => data)
          .catch(({ message }) => new Error(message));
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { id }) {
        return axios({
          url: `http://localhost:3000/users/${id}`,
          method: 'delete',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(({ data }) => data)
          .catch(({ message }) => new Error(message));
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        age: { type: GraphQLString },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { id, name, age, companyId }) {
        return axios({
          url: `http://localhost:3000/users/${id}`,
          method: 'patch',
          headers: { 'Content-Type': 'application/json' },
          data: { name, age, companyId }
        })
          .then(({ data }) => data)
          .catch(({ message }) => new Error(message));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
