'use strict';

const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

//Archivo de routes aqui
const generoRoute = require('./routes/genero');
const categoriaRoute = require('./routes/categoria');
const usuario_route = require('./routes/usuarios');
const sucursalRoute = require('./routes/sucursal');
const autorRoute = require('./routes/autor');
const librosRoute = require('./routes/libros');//marco aragon
const librosTipoLibroRoute = require('./routes/librosTipoLibro');//marco aragon
const imagenRoute = require('./routes/imagenes');
const ofertasRoute = require('./routes/ofertas');//marco aragon
const clubLecturaRoute = require('./routes/clubLectura')
const tipoLibroRoute = require('./routes/tipoLibro');//marco aragon
const libreria_route = require('./routes/libreria');
const tarjeta_route = require('./routes/tarjeta');


const app = express();
app.use(fileupload({
    useTempFiles: true
}));

cloudinary.config({
    cloud_name: 'barnesnoble',
    api_key: '665566519125998',
    api_secret: 'zMZwhD_BAvSbFVggRtVHSW9mX0k'
});
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

let db;
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    db = database;
    console.log("Se estableció la conexión con la base datos.");

    const server = app.listen(process.env.PORT || 8000, function() {
        let port = server.address().port;
        console.log("El backend está levantado en el puerto: ", port);
    });
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}


// Conexion a todas la rutas.
// Rutas.
app.use('/api/genero', generoRoute);
app.use('/api/categoria', categoriaRoute);
app.use('/api', usuario_route);
app.use('/api/sucursal', sucursalRoute);
app.use('/api/imagen', imagenRoute);
app.use('/api/autor', autorRoute);
app.use('/api/libros', librosRoute);//marco aragon
app.use('/api/libros', librosRoute);
app.use('/api/librosTipoLibro', librosTipoLibroRoute);//marco aragon
app.use('/api/clubLectura', clubLecturaRoute);
app.use('/api/ofertas', ofertasRoute);//marco aragon
app.use('/api/tipoLibro', tipoLibroRoute);//marco aragon
app.use('/api', tarjeta_route);
app.use('/api', libreria_route);
