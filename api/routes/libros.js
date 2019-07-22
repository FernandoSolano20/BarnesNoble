// ARCHIVO ROUTE PARA LISTAR, REGISTRAR LIBROS, MARCO ARAGON
'use strict'
const express = require('express'),
    router = express.Router(),
    Libros = require('../models/libros.model');

router.param('_id', function (req, res, next, _id) {
    req.body._id = _id;

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
        genero: body.genero,
        categoria: body.categoria,
        autor: body.autor

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

router.get('/listarLibros', function (req, res) {
    Libros.find(function (err, LibrosBD) {
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

router.get('/buscarLibroID/:id', async (req, res) => {
    
    return await Libros.findById(req.params.id, function (err, LibroBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro ningún libro',
                err
            });
        }
        else {
            return res.json({
                success: true,
                listaLibros: LibroBD
            });
        }
    })
        .populate('genero', 'nombre -_id')
        .populate('categoria', 'nombre -_id')
        .populate('autor', 'nombre -_id')
        .select('titulo genero categoria autor');
    
});

router.get('/listarMasVendidos', function (req, res) {
    let criterioOrden = { vendidos: -1 };

    Libros.find().sort(criterioOrden).limit(25).toArray(function(err, masVendidos) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los libros',
                err
            });
        } else {
            return res.json({
                success: true,
                listaMasVendidos: masVendidos
            })
        }
    });
});


module.exports = router;