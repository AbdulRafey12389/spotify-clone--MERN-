import mongoose, { Schema, model } from "mongoose";


const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    artist: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    imagePublicId: {
        type: String,
    },

    audioUrl: {
        type: String,
        required: true
    },

    audioPublicId: {
        type: String,
    },

    duration: {
        type: Number,
        required: true
    },

    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: false
    }
}, {timestamps: true});


const Song = model('Song', songSchema);

export default Song;