// Importing Nodes modules
import { Router } from "express";

// custom modules...
import { authCallback } from "../controllers/auth.controller.js";


// Initializing Router...
const router = Router();

// Define the auth route...
router.post('/auth-callback', authCallback);

// Export the router for use in other files..
export default router; 