import Message from '../models/messages.model.js';
import User from '../models/user.model.js';


const getAllUsers = async (req, res, next) => {
    try {
        
        const currentUserId = req.auth.userId;
        const user = await User.find({ clerkId: {$ne: currentUserId} });

        return res.status(200).json(user);

    } catch (error) {
        console.error('Error to getting all users', error.message);
        next(error);
        
    }
};

const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { userId } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};


export {
    getAllUsers,
    getMessages
}