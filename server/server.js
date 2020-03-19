const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Aufgaben = require('./Aufgaben.json');


const app = express();

const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

var counter = 0;

io.on('connection', (sock) => {
    console.log('Connection!');

    sock.on('message', (text) =>{
        io.emit('message', text);
    });

    sock.on('Timer', () =>{
        io.emit('timer');
        counter = 0;
    }); 

    sock.on('Random', () =>{
        if(counter == 0){
            var x = Math.floor(Math.random() * Aufgaben.Aufgaben.length);
            io.emit('message', Aufgaben.Aufgaben[x]);
            counter++;
        } 
    });
});

server.on('error', (err) =>{
    console.error('[Error]:' + err);
});

server.listen(8080, () => {
    console.log('Game-Server startet on 8080');
});