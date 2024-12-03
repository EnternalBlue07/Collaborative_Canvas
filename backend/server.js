const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

// Created here HTTP server`
const server = http.createServer(app);

// Isko initilize Socket.IO server so that user can view.
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  },
});

let canvasData = []; // To store current state of canvas

// WebSocket connection have been done here
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // If new user have logged in the previous data should be visible.
  socket.emit("initializeCanvas", canvasData);

  // draw events from clients
  socket.on("draw", (data) => {
    // To add new drawing data to the canvas state
    canvasData.push(data);

    // To show drawing event to all other clients
    socket.broadcast.emit("draw", data);
  });

  // If user request to clear
  socket.on("clearCanvas", () => {
    canvasData = []; // Clear the canvas state
    io.emit("clearCanvas"); // Notify all clients to clear their canvases
    console.log("Canvas cleared by:", socket.id);
  });

  // Listen for disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Handle unexpected errors (Optional)
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
