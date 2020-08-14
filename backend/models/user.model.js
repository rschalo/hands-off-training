const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    workouts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout'
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
