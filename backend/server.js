const passport = require('passport');
const LocalStrategy = require('passport-local');
const usersRouter = require('./routes/users.js');
const workoutsRouter = require('./routes/workouts.js');
const User = require('./models/user.model.js');
const cors = require('cors');
const mongoose = require('mongoose');
const _connection = mongoose.connection;
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DEV_DB;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = _connection;

connection.once('open', () => {
  console.log('MongoDB database has connected successfully!');
});

const secret = process.env.SECRET;
app.use(
  require('express-session')({
    secret: secret,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`The server is live on ${port}`);
});
