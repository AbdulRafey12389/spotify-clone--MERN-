// importing custom modules...
import Album from "../models/album.model.js";


const getAllAbums = async (req, res, next) => {
    try {
        
        const albums = await Album.find();

        return res.status(200).json(albums);


    } catch (error) {
        console.error('Error to getting all albums', error.message);
        next(error);
    }
};


const getAllAbumById = async (req, res, next) => {
    try {
        
        const { albumId } = req.params;

        const album = await Album.findById(albumId).populate('songs');

        if(!album) {
            return res.status(404).json({message: 'Album not found'});
        };

        return res.status(200).json(album); 

    } catch (error) {
        console.error('Error to getting album by id', error.message);
        next(error);
    }
};

export {
    getAllAbums,
    getAllAbumById
}

