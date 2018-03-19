var express = require('express');
var app = express();

server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

let users = 0
let rooms = []
var socket = require('socket.io');
io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('SEND_MESSAGE', function(data){
        io.sockets.emit('RECEIVE_MESSAGE', data);
    })
    io.sockets.emit('broadcast', {description: `${users += 1} online`})


    socket.on('create', function(room) {
        socket.join(room);
    });

    
    socket.on('disconnect', function(){
        io.sockets.emit('broadcast',{ description: `${users -= 1} online`})
    })    
});