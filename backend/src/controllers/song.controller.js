// importing custom modules...
import Song from '../models/song.model.js';



const getAllSongs = async (req, res, next) => {
    try {
        
        // -1 = Descending => newest one  oldest one...
        // 1 = Ascending => oldest one  newest one...
        const songs = await Song.find().sort({ createdAt: -1 });

        return res.status(200).json(songs);

    } catch (error) {
        console.error('Error to getting all songs', error.message);
        next(error);
    };

};



const getFeaturedSongs = async (req, res, next) => {
    try {
        // fetch 6 random songs using mongodb's aggregation pipeline...
        const song = await Song.aggregate([
            { $sample: { size: 6 } },
            { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1 , audioUrl: 1} }
        ]);

        return res.status(200).json(song);

    } catch (error) {
        console.error('Error to getting featured songs', error.message);
        next(error);
        
    }
}


const getMadeForYouSongs = async (req, res, next) => {
    try {
        // fetch 4 random songs using mongodb's aggregation pipeline...
        const song = await Song.aggregate([
            { $sample: { size: 4 } },
            { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1 , audioUrl: 1} }
        ]);

        return res.status(200).json(song);

    } catch (error) {
        console.error('Error to getting featured songs', error.message);
        next(error);
        
    }
};


const getTrendingSongs = async (req, res, next) => {
    try {
        // fetch 4 random songs using mongodb's aggregation pipeline...
        const song = await Song.aggregate([
            { $sample: { size: 4 } },
            { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1 , audioUrl: 1} }
        ]);

        return res.status(200).json(song);

    } catch (error) {
        console.error('Error to getting featured songs', error.message);
        next(error);
        
    }
};


export {
    getAllSongs,
    getFeaturedSongs,
    getMadeForYouSongs,
    getTrendingSongs
}