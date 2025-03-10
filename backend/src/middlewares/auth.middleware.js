// Importing Nodes modules...
import { clerkClient } from "@clerk/express";

const protectRoute = async (req, res, next) => {
    if (!req.auth.userId) {
        return res.status(401).json({message: 'Unauthorized - you must be logged in.'})
    }

    next();
};



const requireAdmin = async (req, res, next) => {
    try {
        
        const currentUser = await clerkClient.users.getUser(req.auth.userId);

        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({message: 'Unauthorized - you must be an admin.'});
        };

        next();

    } catch (error) {
        console.error('Error in auth middleware', error.message);
        return next(error);
    }
};


export {
    protectRoute,
    requireAdmin
}