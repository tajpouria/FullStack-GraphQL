const app = require('express')();
const expressGraphQL = require('express-graphql');

const schema = require('./gqlSchema/schema');
// graphql middleware
app.use(
  '/gql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const port = process.env.PORT || 4000;
app.listen(port, console.log(`Listening on port ${port}`));
