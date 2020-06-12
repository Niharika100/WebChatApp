// NODE SERVER WHICH WILL HANDLE OUR SOCKET.IO
const io = require('socket.io')(8000);

const users = {};

//any new user joins, let other users connected to the server node
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        //console.log(name, " has joined the chat");
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    //if someone sends a message,broadcast the message to others
    socket.on('send',message => {
        socket.broadcast.emit('receive', {message:message, name : users[socket.id]})
    });

    //if someone left the chat box
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});

