const http = require('http').createServer(handler);
const io = require('socket.io')(http);
const fs = require('fs');

http.listen(8080, '127.0.0.1');

function handler (req, res) {
    fs.readFile(__dirname + '/index.html', 
    (err, data) => {
        if(err) {
            res.writeHead(500);
            console.log('Error loading html file');
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end;
    });
   
}