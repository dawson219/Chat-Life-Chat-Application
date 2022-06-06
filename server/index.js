const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router')
const cors = require('cors')

const {addUser , removeUser , getUser , getUsersInRoom} = require('./users');

const PORT = process.env.PORT || 5000
const app = express();

app.use(cors())
app.use(router);

const server = http.createServer(app);
const io = socketio(server , {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection' , (socket)=>{
    console.log('We have a new Connection!!');

    socket.on('join' , ({name , room} , callback) =>{
        const {error , user} = addUser({id: socket.id , name , room});

        if(error) return callback(error);

        socket.emit('message', {user:"admin" , text:`${user.name}, welcome to the ${user.room} room`});
        socket.broadcast.to(user.room).emit('message' , {user:'admin' , text:`${user.name}, has joined!`})

        socket.join(user.room);

        io.to(user.room).emit('roomData' , {room:user.room , users: getUsersInRoom(user.room)})

        callback();
    });

    socket.on('sendMessage' , (message , callback)=>{
        const user = getUser(socket.id)

        io.to(user.room).emit('message' , {user: user.name, text:message});
        io.to(user.room).emit('roomData' , {room: user.room, users:getUsersInRoom(user.room)});

        callback();
    })

    socket.on('remove' , ()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message' , {user:'admin' , text:`${user.name} has left.`})
        }
    });
});


server.listen(PORT , ()=> {
    console.log(`Server is Running on PORT ${PORT}`);
})
