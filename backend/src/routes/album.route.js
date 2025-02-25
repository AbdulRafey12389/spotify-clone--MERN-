// Importing Nodes modules...
import { Router } from "express";

// importing custom modules...
import { getAllAbumById, getAllAbums } from "../controllers/album.controller.js";

// Initializing Router...
const router = Router();

// Define the albums route...
router.get('/', getAllAbums);

router.get('/:albumId', getAllAbumById);

// Export the router for use in other files..
export default router; 