const passport = require('passport')
const GoogleStrategy = require('passport-google-auth').OAuth2Strategy;
const User = require('../models/user.model')


passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "localhost:3000/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
          username: profile.name.givenName,
          password: "googleId"
        }
      }).then((user) => done(null, user));
    }
  ));

/*
 * In order to help keep authentication state across HTTP requests,
 * Sequelize needs to serialize and deserialize the user
 */
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});