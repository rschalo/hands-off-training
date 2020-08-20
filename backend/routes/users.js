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

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(`${req.body.username} has logged in!`);
  const user = JSON.parse(JSON.stringify(req.user));
  const cleanUser = Object.assign({}, user);
  if (cleanUser.local) {
    console.log(`Deleting ${cleanUser.local.password}`);
    delete cleanUser.local.password;
  }
  res.json({ user: cleanUser });
  res.locals.username = req.body.username;
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie('connect.sid'); // clean up!
    return res.json({ msg: 'logging you out' });
  } else {
    return res.json({ msg: 'no user to log out!' });
  }
});

module.exports = router;
