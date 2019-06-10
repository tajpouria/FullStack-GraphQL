const axios = require('axios');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const User = require('../models/User');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, {
            message: 'The email is not registered.',
          });
        }

        return bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw new Error(err);

          if (isMatch) return done(null, user);

          return done(null, false, { message: 'Password incorrect.' });
        });
      })
      .catch(err => new Error(err));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    });
  }),
);

async function loginPromise(email, password, req) {
  /* return id and email if email and password is valid
  use passport for validation
  so passport must just return is valid or not??

  solutions 1.
  make a endpoint to manage login
  axios.post to that endpoint
  if is valid send me back id and email

  solution 2.
  combine passport and graphql
  TODO: take care of it later
  */

  // req.login({ email, password });
  // const { data } = await axios({
  //   url: 'http://localhost:4000/users',
  //   method: 'post',
  //   headers: { 'Content-Type': 'application/json' },
  //   data: {
  //     email,
  //     password,
  //   },
  // });

  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject(new Error('Invalid credentials.'));
      }
      resolve(user);
    })({ body: { email, password } });
  });

  // return new Promise((resolve, reject) => resolve(
  //   axios({
  //     url: 'http://localhost:4000/users',
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/json' },
  //     data: {
  //       email,
  //       password,
  //     },
  //   }),
  // ))
  //   .then(res => res.data)
  //   .catch(err => new Error(err));
}

module.exports = { loginPromise };
