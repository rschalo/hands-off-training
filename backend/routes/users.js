const router = require('express').Router();
const passport = require('passport');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/signup').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new User({ username, password });
  newUser.save((err, user) => {
    if (err) return res.json(err);
    return res.json(user);
  });
});

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);

module.exports = router;
