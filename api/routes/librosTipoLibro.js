// ARCHIVO ROUTE PARA REGISTRAR LIBROSTipoLibro, MARCO ARAGON
'use strict'
const express = require('express'),
    router = express.Router(),
    librosTipoLibro = require('../models/librosTipoLibro.model');

    router.param('_id', function(req, res, next, _id){
    req.body._id= _id;

    })

//Definición de la ruta para registrar libros

router.post('/registrarLibrosTipoLibro', function (req, res) {
    let body = req.body;
    let nuevoLibrosTipoLibro = new librosTipoLibro({
        idLibro: body.idLibro,
        idTipoLibro: body.idTipoLibro,
        stock: body.stock

    });

    nuevoLibrosTipoLibro.save(
        function (err, librosTipoLibroDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No se registró el tipo de libro correctamente',
                    err
                });

            } else {
                res.json({
                    success: true,
                    msj: 'Se registró correctamente el tipo de libro'
                });
            }
        }
    );
});

router.get('/listarLibrosTipoLibro', function(req, res){
    LibrosTipoLibro.find(function(err,LibrosTipoLibroBD){
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los tipos de libros',
                err
            });
        }else{
            return res.json({
                success: true,
                listaLibrosTipoLibro: LibrosTipoLibroBD
            });
        }
    })
});
module.exports = router;