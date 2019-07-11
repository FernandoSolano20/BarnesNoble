const http = require('http');
const port = 3000; 
const serveStatic = require('serve-static');
const connect = require('connect');
const nodemon = require('nodemon');
require('dotenv').config();


connect().use(serveStatic('./public')).listen(port, () => {
    console.log('El front-end esta levantado dentro del puerto ' + port);
    nodemon({
        script: 'api/index.js',
        ext: 'js'
    });
});