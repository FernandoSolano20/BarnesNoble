// ARCHIVO ROUTE PARA LISTAR, REGISTRAR LIBROS, MARCO ARAGON
'use strict'
const express = require('express'),
    router = express.Router(),
    Libros = require('../models/libros.model');

    router.param('_id', function(req, res, next, _id){
    req.body._id= _id;

    })

//Definición de la ruta para registrar libros

router.post('/registrarLibro', function (req, res) {
    let body = req.body;
    let nuevoLibro = new Libros({
        titulo: body.titulo,
        edicion: body.edicion,
        editorial: body.editorial,
        annoEdicion: body.annoEdicion,
        isbl: body.isbl,
        caratula: body.caratula,
        contraportada: body.contraportada,
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

router.get('/listarLibros', function(req, res){
    Libros.find(function(err,LibrosBD){
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los libros',
                err
            });
        }else{
            return res.json({
                success: true,
                listaLibros: LibrosBD
            });
        }
    })
});

router.get('/buscarLibroID/:_id', function(req, res){
    Libros.findById(req.body._id, function(err,LibrosBD){
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro ningún contacto con ese _id',
                err
            });
        }else{
            return res.json({
                success: true,
                Libro: LibrosBD
            });
        }
    })
});




module.exports = router;