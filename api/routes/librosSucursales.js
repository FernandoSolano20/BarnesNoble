'use strict'
const express = require('express'),
    router = express.Router(),
    librosSucursal = require('../models/librosSucursal.model');

router.param('_id', function (req, res, next, _id) {
    req.body._id = _id;

})

//Definición de la ruta para registrar libros

router.post('/registrarLibroSucursal', function (req, res) {
    let body = req.body;
    let nuevoLibroSucursal = new librosSucursal({
        titulo: body.titulo,
        libro: body.libro,
        sucursales: body.sucursales,
        cantidad: body.cantidad

    });

    nuevoLibroSucursal.save(
        function (err, libroDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No registró el libro correctamente',
                    err
                });

            } else {
                res.json({
                    success: true,
                    msj: 'Se registró correctamente el libro'
                });
            }
        }
    );
});

router.get('/listarLibrosSucursal', function (req, res) {
    librosSucursal.find(function (err, LibrosBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los libros',
                err
            });
        } else {
            return res.json({
                success: true,
                listaLibros: LibrosBD
            });
        }
    })
});



module.exports = router;