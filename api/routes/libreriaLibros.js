'use strict'
const express = require('express'),
    router = express.Router(),
    libreriaLibros = require('../models/libreriaLibros.model');

router.param('_id', function (req, res, next, _id) {
    req.body._id = _id;

})

//Definición de la ruta para registrar libros

router.post('/registrarLibroSucursal', function (req, res) {
    let body = req.body;
    let nuevoLibreriaLibros = new libreriaLibros({
        libro: body.libro,
        librerias: body.librerias,
        cantidad: body.cantidad,
        iva: body.iva
    });

    nuevoLibreriaLibros.save(
        function (err, libroDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'No obtuvo el libro correctamente',
                    err
                });

            } else {
                res.json({
                    success: true,
                    msj: 'Se obtuvo correctamente el libro'
                });
            }
        }
    );
});

router.get('/listarlibreriaLibros', function (req, res) {
    libreriaLibros.find(function (err, LibrosBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los libros de esta libreria',
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