import mongoose, { Schema, model } from "mongoose";


const albumSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    artist: {
        type: String,
        required:true
    },

    releaseYear: {
        type: Number,
        required: true,
    },

    imageUrl: {
        type: String,
        required: true
    },

    publicId: {
        type: String,
    },

    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }]

}, {timestamps: true});


const Album = model('Album', albumSchema);

export default Album;