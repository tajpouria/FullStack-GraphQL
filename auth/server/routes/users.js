const passport = require('passport');
const router = require('express').Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (...args) => {
    console.log(args);
    if (args[0]) res.send(args[1]);

    const { _id, email } = args[1];
    return res.json({ id: _id, email });
  })(req, res, next);
});

module.exports = router;
