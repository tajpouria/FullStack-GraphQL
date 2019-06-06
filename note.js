// ## SectionOne (on the graphQL)
`
query/mutation nameOfQuery {

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

app.use('/graphql', expressGraphQL({ schema, graphiql: true }));

// schema/schema.js

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  // closures : function get defined but not executed till after entire file has been executed
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`url/${parentValue.companyId}`).then(({ data }) => data);
      },
    },
  }),
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
        return axios.get(`url/${parentValue.companyId}`).then(({ data }) => data);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {},
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
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
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // no-referrer, *client
  body: JSON.stringify(data), // body data type must match "Content-Type" header
})
  .then(response => response.json()) // parses JSON response into native Javascript objects
  .catch(({ message }) => new Error(message));

// 4. axios
const axios = require('axios');
const schema = require('./schema/schema');

axios({
  url: '/user',
  method: 'get',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  data: {
    firstName: 'Fred',
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
      password: 'rapunz3l',
    },
  },
}).then(({
  data, status, headers, config, request,
}) => console.log(data, status, headers, config, request));

// 5. Mutation

// put will override whole fields of data
// patch will override fields that provided in body of request

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        age: { type: GraphQLString },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, {
        id, name, age, companyId,
      }) {
        return axios({
          url: `http://localhost:3000/users/${id}`,
          method: 'patch',
          headers: { 'Content-Type': 'application/json' },
          data: { name, age, companyId },
        })
          .then(({ data }) => data)
          .catch(({ message }) => new Error(message));
      },
    },
  },
});

module.exports = new GraphQLSchema({ mutation: Mutation });

// ## SectionTwo (Apollo Client On FrontEnd)

// 1. minimalist react setup
// [![Edit brave-dream-3qmfl](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/brave-dream-3qmfl?fontsize=14)

// prop-types
// > yarn add prop-types
// import PropTypes from 'prop-types';

Component.defaultProps ={
  aString = 'string'
}

Component.propTypes = {
  aString: PropTypes.string.isRequired,
  aNumber: PropTypes.number.isRequired,
  aBoolean: PropTypes.bool.isRequired,
  anArray: PropTypes.array.isRequired,
  anObject: PropTypes.object.isRequired,
  anArrayOf: PropTypes.arrayOf(
    PropTypes.shape({
      aString: PropTypes.string,
      aNumber: PropTypes.number.isRequired,
    }),
  ),
};

// 2. ApolloClient & ApolloProvider
// >yarn add apollo-client react-apollo

// import ApolloClient from 'apollo-boost'
// import {  ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

// *** ./server/index.js
// *** app.use(cors())

function App() {
  return (
    <ApolloProvider client={client}>
      <div />
    </ApolloProvider>
  );
}

// 3. gql & graphql
// yarn add graphql-tag

// import gql from 'apollo-boost'
// import { graphql } from 'react-apollo'

function Component(props) {
  return <div>{props.data.songs}</div>;
}

const query = gql`
  {
    songs {
      title
    }
  }
`;

export default graphql(query)(Component);

// 4. graphQL mutation queryFunction variables

function Component(props) {
  return <div>{props.data.mutate({
    variables : {
      title : 'SomeTitle'
    },
    refetchQueries: [{query: someQuery, variables:{}}], // Queries should fetch after mutation 
  }) .then(()=>{props.data.refetch()// execute after mutation success })
     .catch(()=>{// execute after mutation failed})
}})</div>;
}

// func
const mutation = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      title
    }
  }
`;
// variable
// `{
//   "title": "SomeTitle"
// }`;

export default graphql(mutation)(Component )

// 5. graphql query options

export default graphql(query,
  { options: (props) => ({variables: {id: props.params.id}}) })(Component)

  
// ## Section Two (FullStack GraphQL)
  
// 1. req props at GraphQL resolve
  
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:()=>({
      signUp:{
        type: userType,
        args: {email:{type: GraphQLString}},
        resolve(parentValue, args, req){} // ***req coming from express 
      }
    })
  })
  </div>


