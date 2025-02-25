// Importing Nodes modules
import { Router } from "express";

// importing custom modules...
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/song.controller.js";

// Initializing Router...
const router = Router();

// Define the song route...
router.get('/', protectRoute, requireAdmin, getAllSongs);

router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getMadeForYouSongs);
router.get('/trending', getTrendingSongs);

// Export the router for use in other files..
export default router; 