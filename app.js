const http = require('http').createServer(handler);
const io = require('socket.io')(http);
const fs = require('fs');

http.listen(8080, '127.0.0.1');

function handler (req, res) {
    fs.readFile(__dirname + '/views/index.html', 
    (err, data) => {
        if(err) {
            res.writeHead(500);
            console.log('Error loading html file');
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
    io.on('connection', (socket) => {
        console.log('Connection established');
        // The server listens to the event and receive data
        socket.on('messages', (data) => {
            // The server emit the messages to every connected sockets 
            io.sockets.emit('messages', data);
        });

        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', data);
        });
    });
}
