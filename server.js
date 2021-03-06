const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
app.use(express.json());
dotenv.config();

// ROUTER REQUIRE
const usersRouter = require("./routers/user.router");
const postRouter = require("./routers/post.router");
const friendsRouter = require("./routers/friends.router");
const adminsRouter = require("./routers/admin.router");
const chatRouter = require("./routers/chat.router");

// CONNECTION TO MONGOOSE DB
mongoose.connect(process.env.DB_URL, {});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// SOCKET.IO
const server = http.createServer(app);
const io = new Server(server, {});
io.on("connection", (socket) => {
  // LISTING FOR ANY USER TO JOIN ROOM
  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log("User with ID: ", socket.id, " Room ID:", data);
  });

  // LISTING FOR ANY USER TO SEND MESSAGE
  socket.on("send_message", (data) => {
    socket.join(data);
    socket.to(data.room).emit("receive_message", data);
  });

  // LISTING FOR ANY USER DISCONNECT
  socket.on("disconnect", () => {
    // console.log("USER disconnected", socket.id);
  });
});

// USE ROUTERS WITH PATH
app.use(express.static("frontend/build"));
app.use("/api/admins", adminsRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/chats", chatRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
});

// app.listen(port);
server.listen(port);
