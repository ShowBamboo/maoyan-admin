var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/client'))

io.on('connection', function (socket) {
    // setInterval(function () {
    //   socket.emit('list', 'abc')
    // }, 1000)
    // socket.broadcast.emit('list', 'test');
    // socket.on('backend', (msg) => {
    //   console.log(msg);
    // })

    socket.on('receive', (msg) => {
        socket.broadcast.emit('message', msg);
    })
});

server.listen(8082, '10.9.49.206');