const axios = require('axios');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

function login(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(true, false, {
              message: 'The email is not registered.',
            });
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw new Error(err);

            if (isMatch) return done(null, user);

            return done(true, false, { massage: 'Password incorrect.' });
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
}

function loginPromise(email, password) {
  /* return id and email if email and password is valid
  use passport for validation
  so passport must just return is valid or not??

  solutions 1.
  make a endpoint to manage login
  axios.post to that endpoint
  if is valid send me back id and email

  solution 2.
  TODO: take care of later
  */
  return axios({
    url: 'http://localhost:4000/users',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      email,
      password,
    },
  })
    .then(res => res.data)
    .catch(err => new Error(err));
}

module.exports = { login, loginPromise };
