import mongoose, { Schema, model } from "mongoose";


const messageSchema = new Schema({
    senderId: {
        type: String,
        required: true
    },

    receiverId: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    }

}, {timestamps: true});


const Message = model('Message', messageSchema);

export default Message;