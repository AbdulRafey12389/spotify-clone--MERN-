// Importing Nodes modules
import { Router } from "express";

// importing custom modules...
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import {getStats} from "../controllers/stat.controller.js";


// Initializing Router...
const router = Router();

// Define the stats route...
router.get('/', protectRoute, requireAdmin, getStats);

// Export the router for use in other files..
export default router; 