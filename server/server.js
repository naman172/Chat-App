var path = require("path");
var http = require("http");
var express = require("express");
var app = express();
var socketIO = require("socket.io");
const {generateMessage, generateLocationTag} = require("./utils/message.js");
const isRealString = require("./utils/isRealString.js");
const Users = require("./utils/user.js");

var publicPath = path.join(__dirname,"/../public");
var port = process.env.PORT || 3000;

let server = http.createServer(app); 
let io = socketIO(server);
let users = new Users;

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
    // console.log("A new user just connected");

    socket.on("join", (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room))
        {
            return callback("Name and Room are required feilds");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        //Welcoming a new user
        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", "A new user has joined the chat"));
        
        callback();
    });

    
   
    socket.on("createMessage", (message)=>{

        let user = users.getUser(message.from);

        if(user && isRealString(message.text)){
            io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
        }
    });

    socket.on("createLocationTag", (coordinates)=>{

        let user = users.getUser(socket.id);
        
        if(user){
            io.to(user.room).emit("newLocationMessage", generateLocationTag(user.name, coordinates.lat, coordinates.long));
        }
    });
    
    socket.on("disconnect", ()=>{

        // console.log("A user disconnected");
        
        let user = users.removeUser(socket.id);

        if(user)
        {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the chat`));
        }
    });

})



server.listen(port, () => {
    console.log(`server is up at ${port}`);
});