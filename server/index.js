const cors = require('cors');
const express = require('express');
const path = require('path');
const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser');
const expressGraphQl = require('express-graphql');
const schema = require('./gqlschema/schema');

const app = express();
winston.add(winston.transports.File, { filename: 'logfile.log' });
// db config
mongoose.Promise = global.Promise;
const db = config.get('database.mongodb.uri');
mongoose.connect(db, { useNewUrlParser: true }, (err) => {
  if (err) {
    winston.error(err.message, err);
    return process.exit(1);
  }
  return winston.info(`Successfully connected to ${db}`);
});
// handling uncaughtException & unhandledRejections
process.on('uncaughtException', (ex) => {
  winston.error(ex.message, ex);
  return process.exit(1);
});
process.on('unhandledRejection', (err) => {
  winston.err(err.message, err);
  return process.exit(1);
});
// middleWares
app.use(cors()); // *** GraphQL NO CORS ERROR solved
app.use(bodyParser.json());
app.use(express.static('../client/dist'));
app.use(
  '/graphql',
  expressGraphQl({
    schema,
    graphiql: true,
  }),
);

app.use('/', (req, res) => {
  res.sendFile(path.resolve('../client', 'dist', 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => winston.info(`Listening on port ${port}`));
