const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const config = require('config');

const schema = require('./gqlSchema/schema');

const app = express();

winston.add(winston.transports.File, { filename: 'logfile.log' });
// DB setup
const db = config.get('database.mongodb.uri');
mongoose.connect(db, { useNewUrlParser: true }, (err) => {
  if (err) throw new Error(err.message);

  winston.info(`Successfully connected to ${db}`);
});
// middlewares
app.use(bodyParser.json());
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  }),
);
// error handling
process.on('uncaughtException', (err) => {
  process.exit(1);
  winston.error(err.message, err);
});
process.on('unhandledRejection', (err) => {
  process.exit(1);
  winston.error(err.message, err);
});

const port = process.env.PORT || 4000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
