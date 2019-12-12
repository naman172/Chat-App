let socket = io();

socket.on("connect", ()=>{
    console.log("Connected to the server");
    var params = JSON.parse('{"' + decodeURI(window.location.search.substring(1)).replace(/&/g,'","').replace(/=/g,'":"').replace(/\+/g," ") + '"}');

    socket.emit("join", params, function(err){
        if(err){
            alert(err);
            window.location.href = "/";
        }
    })
})

function scrollToBottom(){
    var message = document.querySelector("#message-main").lastChild;
    message.scrollIntoView();
};

socket.on("newMessage", function(message){
    console.log("newMessage : ", message);

    var formattedTime = moment(message.createdAt).format("LT");

    var template = document.querySelector("#message-template").innerHTML;
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    }); 

    var div = document.createElement("div");
    div.innerHTML = html;

    document.querySelector("#message-main").appendChild(div);
    scrollToBottom();
});

socket.on("newLocationMessage", function(message){
    console.log("newMessage : ", message);

    var formattedTime = moment(message.createdAt).format("LT");
    var template = document.querySelector("#location-message-template").innerHTML;
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt : formattedTime
    });

    var div = document.createElement("div");
    div.innerHTML = html;
    
    document.querySelector("#message-main").appendChild(div);   
    scrollToBottom();
});

socket.on("updateUserList", function(users){
    
    let ol =document.createElement("ol");

    users.forEach(function(user){
        let li = document.createElement("li");
        li.innerHTML = user;
        
        ol.appendChild(li);
    });

    let userList = document.querySelector("#user-list");
    userList.innerHTML = "";
    userList.appendChild(ol);
})

socket.on("disconnect", ()=>{
    console.log("Disconnected from the server");
})

document.querySelector("#submit-btn").addEventListener("click", function(event){
    event.preventDefault();

    socket.emit("createMessage", {
        from: socket.id,
        text: document.querySelector('input[name = "message"]').value
    });
});

document.querySelector("#sendLocation").addEventListener("click", function(event){
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browser");
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit("createLocationTag", {
            lat:position.coords.latitude,
            long:position.coords.longitude
        });
    },function(){
        alert("Unable to fetch location");
    });
});