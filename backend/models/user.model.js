const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

userSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======');
    next();
  } else {
    console.log('models/user.js hashPassword in pre save');
    this.password = this.hashPassword(this.password);
    next();
  }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
