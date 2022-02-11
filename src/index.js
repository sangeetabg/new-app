"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
// import Socket  from 'socket.io'
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUserInRoom } = require('./utils/users');
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;
const publicDirectoryPath = path_1.default.join(__dirname, '../public');
app.use(express_1.default.static(publicDirectoryPath));
io.on('connection', (socket) => {
    console.log('New Websocket connection');
    socket.on('join', (options, callback) => {
        const { error, user } = addUser(Object.assign({ id: socket.id }, options));
        //   if (error) {
        //     //   throw error
        //   return callback(error)
        //   }
        socket.join(user.room);
        socket.emit('message', generateMessage('Admin', 'Welcome!'));
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`));
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUserInRoom(user.room)
        });
        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter();
        // if(filter.isProfane(message)){
        //     return callback('Profanity is not allowed!')
        //     // throw ('Profanity is not allowed!')
        // }
        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });
    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    });
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} A user has left!`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUserInRoom(user.room)
            });
        }
    });
});
server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
