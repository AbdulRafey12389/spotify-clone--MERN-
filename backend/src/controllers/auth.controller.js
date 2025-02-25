// Importing Nodes modules
import User from '../models/user.model.js'

const authCallback = async (req, res, next) => {
    
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        // CHECK IF USER ALREADY EXISTS...
        const existingUser = await User.findOne({clerkId: id});

        if (!existingUser) {
            // SIGN UP USER IN DATABSE...
            await User.create({
                clerkId: id,
                fullName: `${firstName || ''} ${lastName || ''}`.trim(),
                imageUrl
            })
        }

        return res.status(200).json({ sucess: true });
        
    } catch (error) {
        console.error('Error in auth callback', error.message);
        return next(error);
        
    }
}

export {
    authCallback
}