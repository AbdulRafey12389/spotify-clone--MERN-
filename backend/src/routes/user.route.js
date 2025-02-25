// Importing Nodes modules
import { Router } from "express";

// Importing custom modules...
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getAllUsers, getMessages } from "../controllers/user.controller.js";

// Initializing Router...
const router = Router();

// Define the user route...
router.get('/', protectRoute, getAllUsers);
router.get('/messages/:userId', protectRoute, getMessages);

// Export the router for use in other files..
export default router; 