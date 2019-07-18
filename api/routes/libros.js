// ARCHIVO ROUTE PARA LISTAR, REGISTRAR LIBROS, MARCO ARAGON
'use strict'
const express = require('express'),
    router = express.Router(),
    Libros = require('../models/libros.model');

//Definición de la ruta para registrar libros

router.post('/registarLibro', function (req, res) {
    let body = req.body;
    let nuevoLibro = new Libros({
        titulo: body.titulo,
        edicion: body.edicion,
        editorial: body.editorial,
        annoEdicion: body.annoEdicion,
        isbl: body.isbl,
        caratula: body.caratula,
        contraporta: body.caratula,
        precio: body.precio,
        idGenero: body.idGenero,
        idCategoria: body.idCategoria,
        idAutor: body.idAutor

    });

    nuevoLibro.save(
        function (err, libroDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'Se NO registró el libro correctamente',
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

module.exports = router;