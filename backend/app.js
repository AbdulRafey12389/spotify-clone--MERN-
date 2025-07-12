// Importing Nodes modules
import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { initializeSocket } from "./src/lib/socket.js";

// custom modules...
import { connectDB, disConnectDB } from "./src/lib/db.js";
import userRoute from "./src/routes/user.route.js";
import adminRoute from "./src/routes/admin.route.js";
import authRoute from "./src/routes/auth.route.js";
import songRoute from "./src/routes/song.route.js";
import albumRoute from "./src/routes/album.route.js";
import statRoute from "./src/routes/stat.route.js";
import { createServer } from "http";

// Initializing Express app
const app = express();

// Loading environment variables from .env file
dotenv.config();

// Getting port from environment variables
const port = process.env.PORT;

// Initializing socket.io server...
const httpServer = createServer(app);
initializeSocket(httpServer);

// Parse JSON data from request body
app.use(express.json());

// Parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// create variable __dirname for path...
const __dirname = path.resolve();

// // Initializing file-upload package middleware for uploading files...
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB MAX FILE SIZE...
    },
  })
);

// Initializing cors package middleware for cross-origin resource sharing...
app.use(
  cors({
    origin: "*", // Ensure there's no trailing slash
    credentials: true, // If using cookies or authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// // protect our routes with clerk middleware...
// app.use(clerkMiddleware());

app.use(
  clerkMiddleware({
    enforceAuthOnAllRoutes: false,
    debug: true,
  })
);

// Defining all routes and apis for pages...
app.use("/", (req, res) => {
  res.send("working");
});
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/songs", songRoute);
app.use("/api/albums", albumRoute);
app.use("/api/stats", statRoute);

// error handler route...
app.use((err, req, res, next) => {
  return res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// Starting the server and listening on the specified port
const server = httpServer.listen(port, () => {
  console.log(`App listening on  http://localhost:${port}!`);
  connectDB();
});

server.on("close", async () => await disConnectDB());
