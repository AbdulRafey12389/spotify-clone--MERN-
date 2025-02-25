import mongoose from "mongoose";

// CLIENT OPTIONS OBJECT CONTAINING SERVER API CONFIGURATION...
const clientOption = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    },
    dbName: 'SpotifyClone'
}


// CONNECTION TO THE MONGODB DATABASE USING PROVIDED CONNECTION STRING...
export const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI, clientOption);
        console.log('connected to mongodb.');
        

    } catch (error) {
        console.error('Error to to connecting mongodb', error.message);
        throw error;
    }
};


// DISCONNET MONGODB FOR DATABASE USING MONGOOSE...
export const disConnectDB = async () => {
    try {

        await mongoose.disconnect();
        console.log('Disconnecting to mongodb.');
        
    } catch (error) {
        
        console.error('Error to disconnecting mongodb.', error.message);
        throw error
        

    }
};