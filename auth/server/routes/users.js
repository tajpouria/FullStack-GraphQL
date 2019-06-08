const passport = require('passport');
const router = require('express').Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (...args) => {
    if (args[2]) {
      const { message } = args[2];
      return res.json({ email: message });
    }

    const { _id, email } = args[1];
    return res.json({ id: _id, email });
  })(req, res, next);
});

router.get('/', (req, res) => {
  console.log(req.user);
  res.send('sho');
});

module.exports = router;
