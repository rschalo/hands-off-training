const passport = require('passport');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const workoutsRouter = require('./routes/workouts.js');
const cors = require('cors');
const mongoose = require('mongoose');
const _connection = mongoose.connection;
const express = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

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

// passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/users', usersRouter);
app.use('/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`The server is live on ${port}`);
});
