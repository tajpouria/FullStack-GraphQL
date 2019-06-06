const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.pre('save', function save(next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, encrypted) => {
      if (err) return next(err);
      user.password = encrypted;
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
