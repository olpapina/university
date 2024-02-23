import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'
import bcrypt from 'bcrypt';

interface IUser {
    username: string;
    password: string;
    role: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "user"
  }
});
const saltRounds = 8;
userSchema?.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});
const User = mongoose.model<IUser>('User', userSchema);
userSchema.plugin(passportLocalMongoose);

export default User;