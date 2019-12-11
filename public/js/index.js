let socket = io();

socket.on("connect", ()=>{
    console.log("Connected to the server");
})

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

    document.querySelector("body").appendChild(div);

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
    
    document.querySelector("body").appendChild(div);   
});


socket.on("disconnect", ()=>{
    console.log("Disconnected from the server");
})

document.querySelector("#submit-btn").addEventListener("click", function(event){
    event.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: document.querySelector('input[name = "message"]').value
    }, function () {
        
    })
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