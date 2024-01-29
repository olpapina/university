import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

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
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model<IUser>('User', userSchema);

export default User;