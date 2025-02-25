// importing custom modules...
import User from '../models/user.model.js';
import Song from '../models/song.model.js';
import Album from '../models/album.model.js';
import {uploadToCloudinary, deleteFileFromCloudinary } from '../lib/cloudinary.js';



const checkAdmin = async (req, res, next) => {
    return res.status(200).json({ isAdmin: true });
};


const createSong = async (req, res, next) => {
    
    try {
        
        if (!req.files || !req.files.audio || !req.files.image) {
            return res.status(400).json({ message: 'Please upload all files.' });
        }

        const { title, artist, albumId, duration } = req.body;

        const audioFile = req.files.audio;
        const imageFile = req.files.image;

        const audioUrlFiles = await uploadToCloudinary(audioFile);
        const imageUrlFiles = await uploadToCloudinary(imageFile);
        

        const song = new Song({
            title,
            artist,
            audioUrl: audioUrlFiles.secure_url,
            audioPublicId: audioUrlFiles.public_id,
            imageUrl: imageUrlFiles.secure_url,
            imagePublicId: imageUrlFiles.public_id,
            duration: parseInt(duration),
            albumId: albumId || null
        });

        await song.save();



        // if song belongs to an album, update the album's songs array...
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            })
        };

        return res.status(201).json(song)
 
    } catch (error) {
        console.error("Error to creating song.", error.message);
        return next(error);
    }
}


const deleteSong = async (req, res, next) => {
    try {
        
        const { id } = req.params;
        
        const song = await Song.findById(id);


        
        deleteFileFromCloudinary(song.audioPublicId, 'image');
        deleteFileFromCloudinary(song.imagePublicId, 'video');
        

        // if song belongs to an album, update the album's songs array...
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            })
        }

        await Song.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Song deleted sucessfully.' });

    } catch (error) {
        console.error('Error to deleting songs', error.message);
        next(error);
        
    }
};


const createAlbum = async (req, res, next) => {
    try {
    
        const { title, artist, releaseYear } = req.body;

        const { imageFile } = req.files;

        const imageFiles = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            imageUrl: imageFiles.secure_url,
            publicId: imageFiles.public_id,
            releaseYear
        });

        await album.save();

        return res.status(200).json(album);
        
    } catch (error) {
        console.error('Error to creating album', error.message);
        next(error);
    }
};


const deleteAlbum = async (req, res, next) => {
    console.log("Deleting album...");
    
    try {
        
        const { id } = req.params;

        await Song.deleteMany({ albumId: id });

        await Album.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Album Deleted sucessfully.' });

    } catch (error) {
        console.error('Error to deleting album', error.messge);
        return next(error);
    }
};


export {
    checkAdmin,
    createSong,
    deleteSong,
    createAlbum,
    deleteAlbum
}