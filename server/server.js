var path = require("path");
var http = require("http");
var express = require("express");
var app = express();
var socketIO = require("socket.io");

var publicPath = path.join(__dirname,"/../public");
var port = process.env.PORT || 3000;

let server = http.createServer(app); 
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
    console.log("A new user just connected");

    socket.emit("newMessage", {
        from: "Admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getTime() 
    });

    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "A new user has joined the chat",
        createdAt: new Date().getTime() 
    });

    socket.on("createMessage", (message)=>{
        console.log("createMessage : ", message);
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

    });
    
    socket.on("disconnect", ()=>{
        console.log("User was disconnected");
    })

})



server.listen(port, () => {
    console.log(`server is up at ${port}`);
});