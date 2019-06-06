const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
userSchema.pre('save', function (next) {
  const user = this;
  return bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) return next(saltErr);
    return bcrypt.hash(user.password, salt, (hashErr, encrypted) => {
      if (hashErr) return next(hashErr);

      user.password = encrypted;
      return next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
