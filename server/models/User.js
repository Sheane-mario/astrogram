import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 30,
        },
        lastName: {
            type: String,
            required: true,
            min: 3,
            max: 30,
        },
        email: {
            type: String,
            required: true,
            max: 100,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
        picturePath: {
            type: String,
            default: '',
        },
        followers: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;