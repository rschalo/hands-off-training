import { Schema as _Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = _Schema;

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
    }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(passportLocalMongoose);

const User = model('User', userSchema);

export default User;
