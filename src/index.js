const express = require('express');
const { Server } = require("socket.io");
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const http = require('http');

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origins: `https://graphql-server-example-5pid.onrender.com/`,
        methods: ["GET", "POST"],
    },
    pingInterval: 2000,
    pingTimeout: 10000,
});



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

io.on("connection", (socket) => {
    const userNumber = Math.floor(Math.random() * 100) + 1;
    io.emit("connStatus", "user n° " + userNumber + " connected !");

    // chat message
    socket.on("chat message", (msg) => {
        io.emit("chat message", "user n° " + userNumber + ": " + msg);
    });

    // disconnect
    socket.on("disconnect", () => {
        io.emit("connStatus", "user n° " + userNumber + " disconnected !");
    });
});




server.listen(port, () => {
    console.log('listening on *:http://localhost:' + port);
});