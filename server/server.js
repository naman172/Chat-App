var path = require("path");
var http = require("http");
var express = require("express");
var app = express();
var socketIO = require("socket.io");
const {generateMessage, generateLocationTag} = require("./utils/message.js");

var publicPath = path.join(__dirname,"/../public");
var port = process.env.PORT || 3000;

let server = http.createServer(app); 
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
    console.log("A new user just connected");

    //Welcoming a new user
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
    socket.broadcast.emit("newMessage", generateMessage("Admin", "A new user has joined the chat"));

    socket.on("createMessage", (message, callback)=>{
        console.log("createMessage : ", message);
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback("-server");
    });

    socket.on("createLocationTag", (coordinates)=>{
        io.emit("newLocationMessage", generateLocationTag("Admin", coordinates.lat, coordinates.long));
    });
    
    socket.on("disconnect", ()=>{
        console.log("User was disconnected");
    })

})



server.listen(port, () => {
    console.log(`server is up at ${port}`);
});