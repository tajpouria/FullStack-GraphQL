const cors = require('cors');
const express = require('express');
const winston = require('winston');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const config = require('config');
const session = require('express-session');
const passport = require('passport');

const schema = require('./gqlSchema/schema');

const app = express();

winston.add(winston.transports.File, { filename: 'logfile.log' });

// DB setup
const db = config.get('database.mongodb.uri');
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true }, (err) => {
  if (err) throw new Error(err.message);

  winston.info(`Successfully connected to ${db}`);
});

// middlewares
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use('/graphql', expressGraphQL({ schema, graphiql: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
