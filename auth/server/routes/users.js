const passport = require('passport');
const router = require('express').Router();

router.get('/', (req, res) => {
  const { _id, email } = req.user;
  res.json({ _id, email });
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users',
  })(req, res, next);
});

module.exports = router;
