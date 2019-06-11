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

userSchema.methods.comparePassword = function comparePassword(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
