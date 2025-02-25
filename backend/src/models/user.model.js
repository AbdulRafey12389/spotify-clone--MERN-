import mongoose, { Schema, model } from "mongoose";



const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true,
        unique: true
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    }

}, {timestamps: true})


const User = model('User', userSchema);

export default User;