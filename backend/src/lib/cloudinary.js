import {v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadToCloudinary = async (file) => {
    
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto',
        });

        return {secure_url: result.secure_url, public_id:result.public_id};
    } catch (error) {
        console.log('Error in upload file in cloudinary.', error.message);
        throw new error
    }
};


const deleteFileFromCloudinary = async (publicId, type) => {

    try {
        
       await cloudinary.uploader.destroy(publicId, {
        resource_type: type === 'video' ? 'video' : 'image',
      });

      return;
    } catch (error) {
      console.error('Error deleting file:', error);
      return error.message;
    }
  };


export {uploadToCloudinary, deleteFileFromCloudinary};