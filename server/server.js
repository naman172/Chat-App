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

    socket.on("disconnect", ()=>{
        console.log("User was disconnected");
    })
})


server.listen(port, () => {
    console.log(`server is up at ${port}`);
});