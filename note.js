//## SectionOne (on the graphQL)

`
query nameOfQuery {

  key1: type1(id: "1"){
    ...fields
  }

  key2: type1(id:"2"){
    ...fields
  }

}

fragment fields on Type {
  field1
  field2
}

`;

// 1. graphQL server setup

// yarn add express express-graphql graphql
// ./server.js
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

app.use('/graphql', expressGraphQL({ schema, graphiql: true }));

// schema/schema.js

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = require('graphql');

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  // closures : function get defined but not executed till after entire file has been executed
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`url/${parentValue.companyId}`)
          .then(({ data }) => data);
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
        return axios
          .get(`url/${parentValue.companyId}`)
          .then(({ data }) => data);
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
      resolve(parentValue, args) {}
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

// 2. json-server
// yarn add json-server && json-server --watch db.json

// 3. Fetch The fetch API is not implemented in Node.
const fetch = require('node-fetch');
// Default options are marked with *
fetch('http//', {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // no-referrer, *client
  body: JSON.stringify(data) // body data type must match "Content-Type" header
})
  .then(response => response.json()) // parses JSON response into native Javascript objects
  .catch(({ message }) => new Error(message));

// 4. axios
const axios = require('axios');

axios({
  url: '/user',
  method: 'get',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  data: {
    firstName: 'Fred'
  },
  timeout: 1000, // default is `0` (no timeout)
  withCredentials: false, // default
  responseType: 'json', // default
  responseEncoding: 'utf8', // default
  xsrfCookieName: 'XSRF-TOKEN', // default
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  }
}).then(({ data, status, headers, config, request }) =>
  console.log(data, status, headers, config, request)
);
