const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
userSchema.pre('save', function (next) {
  return bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) return next(saltErr);
    return bcrypt.hash(this.password, salt, (hashErr, encrypted) => {
      if (hashErr) return next(hashErr);

      this.password = encrypted;
      return next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
