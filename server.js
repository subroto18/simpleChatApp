const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("form", (data) => {
    io.emit("send_message", data.message);
  });
});

server.listen(port, () => {
  console.log("server running...");
});
