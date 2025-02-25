// Importing Nodes modules
import { Router } from "express";

// Importing custom modules...
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { checkAdmin, createSong, deleteSong, createAlbum, deleteAlbum } from "../controllers/admin.controller.js";

// Initializing Router...
const router = Router();

// Define the admin route...
router.use(protectRoute, requireAdmin)

router.get('/check', checkAdmin);

router.post('/songs', createSong);

router.delete('/songs/:id', deleteSong);

router.post('/albums', createAlbum);

router.delete('/albums/:id', deleteAlbum);

// Export the router for use in other files..
export default router; 