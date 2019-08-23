const http = require('http');
const port = 3000;
const serveStatic = require('serve-static');
const connect = require('connect');
const nodemon = require('nodemon');
const WebSocket = require('ws');
require('dotenv').config();

const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on('connection', (webSocket) => {
    webSocket.on('message', (message) => {
        broadcast(message);
    });
});

function broadcast(data) {
    webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

connect().use(serveStatic('./public')).listen(port, () => {
    console.log('El front-end esta levantado dentro del puerto ' + port);
    nodemon({
        script: 'api/index.js',
        ext: 'js'
    });
});