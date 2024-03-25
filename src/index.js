const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');


app.use(cors());

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.get('/hello', (req, res) => {
    res.send('Hello World');
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




server.listen(3000, () => {
    console.log('listening on *:3000');
});