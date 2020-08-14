const router = require('express').Router();
const passport = require('passport');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({ username, password });
  User.register(newUser, (err, user) => {
    try {
      passport.authenticate('local')(req, res, () => {
        res.json('User added!');
        console.log(user);
      });
    } catch (err) {
      res.status(400).json('Error: ' + err);
      console.error(err);
    }
  });
});

module.exports = router;
