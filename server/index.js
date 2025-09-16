import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import socketHandler from "./socket/socket.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true,               
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB
connectDB();

// Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
socketHandler(io);


app.use((req, res, next) => {
  req.io = io;
  next();
});

// API routes
app.use("/", taskRoutes);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
